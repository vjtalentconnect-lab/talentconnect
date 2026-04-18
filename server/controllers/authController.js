import { auth as adminAuth, db } from '../lib/firebaseAdmin.js';
import { auth as clientAuth } from '../lib/firebase.js';
import { addWithBackup, setWithBackup, updateWithBackup } from '../lib/textBackup.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../lib/jwtSecret.js';
import axios from 'axios';
import crypto from 'crypto';
import { sendEmail } from '../lib/email.js';

const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

const generateToken = () => crypto.randomBytes(32).toString('hex');
const getCookieOptions = (days = 30) => ({
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
});

const storeToken = async (collection, token, data) => {
    await db.collection(collection).doc(token).set({
        ...data,
        createdAt: new Date().toISOString(),
        expiresAtMs: data.expiresAt ? new Date(data.expiresAt).getTime() : undefined,
    });
};

const fetchUserByEmail = async (email) => {
    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
};

const sendVerificationEmailForUser = async ({ userId, email }) => {
    const token = generateToken();
    await storeToken('emailVerifications', token, {
        userId,
        email,
        type: 'email_verification',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
        used: false,
    });

    const verifyLink = `${FRONTEND_URL}/verify-email?token=${token}`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
            <h2>Confirm your email</h2>
            <p>Thanks for signing up for TalentConnect. Please verify your email to activate your account.</p>
            <p><a href="${verifyLink}" style="background:#111827;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Verify Email</a></p>
            <p>Or copy this link into your browser: <br/>${verifyLink}</p>
            <p>This link expires in 24 hours.</p>
        </div>
    `;

    await sendEmail({
        to: email,
        subject: 'Verify your TalentConnect email',
        html,
    });

    return token;
};

const sendResetPasswordEmail = async ({ userId, email }) => {
    const token = generateToken();
    await storeToken('passwordResets', token, {
        userId,
        email,
        type: 'password_reset',
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1h
        used: false,
    });

    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
            <h2>Reset your password</h2>
            <p>We received a request to reset your TalentConnect password.</p>
            <p><a href="${resetLink}" style="background:#111827;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Reset Password</a></p>
            <p>Or copy this link into your browser: <br/>${resetLink}</p>
            <p>This link expires in 1 hour. If you didn’t request this, you can safely ignore this email.</p>
        </div>
    `;

    await sendEmail({
        to: email,
        subject: 'Reset your TalentConnect password',
        html,
    });

    return token;
};

// Ensure Firestore user + profile exist; used by social logins
// Ensures that a Firestore user + profile exist. Used by social logins so we can
// hydrate as much metadata (name/photo/contact) as the provider gives us, and
// still leave room for the client to fill missing fields.
const ensureUserAndProfile = async ({
    uid,
    email,
    fullName = '',
    role = 'talent',
    mobile = '',
    location = '',
    provider = 'password',
    talentCategory = '',
    companyName = '',
    industryType = '',
    profilePicture = '',
}) => {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    // If the user does not exist, create both user + profile records
    if (!userDoc.exists) {
        const userData = {
            email,
            role,
            isVerified: false,
            // Start as "none"; they will move to "pending" only after submitting verification
            verificationStatus: 'none',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            plan: 'free',
            subscriptionStatus: 'inactive',
            authProvider: provider,
        };
        await setWithBackup('users', uid, userData);

        const profileData = {
            user: uid,
            fullName,
            location,
            mobile,
            talentCategory: (role === 'talent' || !['director', 'admin'].includes(role)) ? (talentCategory || 'Actor') : null,
            companyName: role === 'director' ? (companyName || '') : null,
            industryType: role === 'director' ? (industryType || '') : null,
            profilePicture: profilePicture || 'no-photo.jpg',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            portfolio: [],
            privacySettings: {
                profileSearchable: true,
                showContactDetails: true,
                showPortfolioPublic: true,
                allowDirectMessages: true,
            }
        };
        const profileRef = await addWithBackup('profiles', profileData);
        await updateWithBackup('users', uid, { profile: profileRef.id });
    } else {
        // If the user exists (e.g., social login returning), patch missing verification fields
        const patch = {};
        const data = userDoc.data() || {};

        if (!data.verificationStatus) patch.verificationStatus = 'none';
        if (data.isVerified === undefined) patch.isVerified = false;
        if (!data.role) patch.role = role || 'talent';
        if (!data.authProvider && provider) patch.authProvider = provider;
        if (!data.createdAt) patch.createdAt = new Date().toISOString();
        patch.updatedAt = new Date().toISOString();

        // Ensure a profile exists
        if (!data.profile) {
            const profileRef = await addWithBackup('profiles', {
                user: uid,
                fullName,
                location,
                mobile,
                talentCategory: ((role || data.role) === 'talent' || !['director', 'admin'].includes(role || data.role)) ? (talentCategory || 'Actor') : null,
                companyName: (role || data.role) === 'director' ? (companyName || '') : null,
                industryType: (role || data.role) === 'director' ? (industryType || '') : null,
                profilePicture: profilePicture || 'no-photo.jpg',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                portfolio: [],
                privacySettings: {
                    profileSearchable: true,
                    showContactDetails: true,
                    showPortfolioPublic: true,
                    allowDirectMessages: true,
                }
            });
            patch.profile = profileRef.id;
        }

        // Backfill missing profile fields without overwriting user-provided values
        if (data.profile) {
            const profileRef = db.collection('profiles').doc(data.profile);
            const profileDoc = await profileRef.get();
            const profile = profileDoc.exists ? profileDoc.data() : {};
            const profilePatch = {};

            if (!profile.fullName && fullName) profilePatch.fullName = fullName;
            if (!profile.location && location) profilePatch.location = location;
            if (!profile.mobile && mobile) profilePatch.mobile = mobile;
            if ((role || data.role) === 'talent' && !profile.talentCategory && talentCategory) {
                profilePatch.talentCategory = talentCategory;
            }
            if ((role || data.role) === 'director') {
                if (!profile.companyName && companyName) profilePatch.companyName = companyName;
                if (!profile.industryType && industryType) profilePatch.industryType = industryType;
            }
            const hasPlaceholderPhoto = !profile.profilePicture || profile.profilePicture === 'no-photo.jpg';
            if (hasPlaceholderPhoto && profilePicture) profilePatch.profilePicture = profilePicture;

            if (Object.keys(profilePatch).length > 0) {
                await updateWithBackup('profiles', data.profile, profilePatch);
            }
        }

        if (Object.keys(patch).length > 0) {
            await updateWithBackup('users', uid, patch);
        }
    }

    // Return updated user doc
    const updatedDoc = await userRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    const { email, password, role, fullName, talentCategory, location, mobile, companyName, industryType } = req.body;

    try {
        // Create user in Firebase Auth
        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName: fullName,
        });

        const uid = userRecord.uid;

        // Create user metadata in Firestore
        const userDoc = {
            email,
            role: role || 'talent',
            isVerified: false,
            verificationStatus: 'none', // mark pending only after user submits verification
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            plan: 'free',
            subscriptionStatus: 'inactive',
        };

        if (role === 'director') {
            const trialEndsAt = new Date();
            trialEndsAt.setDate(trialEndsAt.getDate() + 30);
            userDoc.trialEndsAt = trialEndsAt.toISOString();
        }

        await setWithBackup('users', uid, userDoc);

        // Create associated profile document in Firestore
        const profileDoc = {
            user: uid,
            fullName,
            location: location || '',
            mobile: mobile || '',
            talentCategory: (role === 'talent' || !['director', 'admin'].includes(role)) ? (talentCategory || 'Actor') : null,
            companyName: role === 'director' ? (companyName || '') : null,
            industryType: role === 'director' ? (industryType || '') : null,
            profilePicture: 'no-photo.jpg',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            portfolio: [],
            privacySettings: {
                profileSearchable: true,
                showContactDetails: true,
                showPortfolioPublic: true,
                allowDirectMessages: true,
            }
        };

        const profileRef = await addWithBackup('profiles', profileDoc);
        
        // Update user with profile id
        await updateWithBackup('users', uid, { profile: profileRef.id });

        // Notify admins of new user registration
        try {
            const { broadcastAdminEvent } = await import('../socket.js');
            broadcastAdminEvent({
                type: 'newUser',
                user: {
                    id: uid,
                    email: userDoc.email,
                    role: userDoc.role,
                    verificationStatus: userDoc.verificationStatus,
                    createdAt: userDoc.createdAt
                }
            });
        } catch (socketErr) {
            console.error('Socket notification error:', socketErr);
        }

        // Fire off verification email (best-effort)
        try {
            const verificationToken = await sendVerificationEmailForUser({ userId: uid, email });
            if (process.env.NODE_ENV !== 'production') {
                console.log(`[DEV] Verification token for ${email}: ${verificationToken}`);
            }
        } catch (emailErr) {
            console.error('Verification email send failed:', emailErr?.message || emailErr);
        }

        // Sign the user in immediately so the frontend receives a valid Firebase ID token
        // This avoids an extra /login call and ensures protected routes (e.g. profile upload) work right after signup
        let idToken;
        try {
            const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
            idToken = await userCredential.user.getIdToken();
        } catch (signinErr) {
            console.warn('Post-registration sign-in failed; user will need to login manually:', signinErr);
        }

        res.status(201).json({
            success: true,
            token: idToken, // may be undefined if sign-in failed; frontend should handle accordingly
            user: { id: uid, email, role: userDoc.role }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: err.message });
    }
};

// @desc    Login with Google OAuth (Firebase ID token from client)
// @route   POST /api/auth/login/google
// @access  Public
export const googleLogin = async (req, res) => {
    const { idToken, role } = req.body;
    if (!idToken) return res.status(400).json({ message: 'idToken is required' });

    try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        const uid = decoded.uid;
        const email = decoded.email;
        const fullName = decoded.name || '';
        const profilePicture = decoded.picture || '';

        const userData = await ensureUserAndProfile({
            uid,
            email,
            fullName,
            role: role || 'talent',
            profilePicture,
            provider: 'google',
        });

        res.status(200).cookie('token', idToken, getCookieOptions(30)).json({
            success: true,
            token: idToken,
            user: { id: uid, email, role: userData.role, verificationStatus: userData.verificationStatus },
        });
    } catch (err) {
        console.error('Google login error:', err);
        res.status(401).json({ message: 'Invalid Google token' });
    }
};

// @desc    Login with LinkedIn OAuth code
// @route   POST /api/auth/login/linkedin
// @access  Public
export const linkedinLogin = async (req, res) => {
    const { code, redirectUri, role } = req.body;
    if (!code || !redirectUri) {
        return res.status(400).json({ message: 'code and redirectUri are required' });
    }
    if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
        return res.status(500).json({ message: 'LinkedIn OAuth not configured' });
    }

    try {
        console.log('[LinkedIn] Authorization code received');
        console.log('[LinkedIn] Redirect URI:', redirectUri);
        console.log('[LinkedIn] Client ID configured:', Boolean(process.env.LINKEDIN_CLIENT_ID));

        const tokenResp = await axios.post(
            'https://www.linkedin.com/oauth/v2/accessToken',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            }).toString(),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );
        const accessToken = tokenResp.data.access_token;
        console.log('[LinkedIn] OAuth token exchange successful');

        let linkedinId;
        let fullName;
        let email;
        let profilePicture;

        try {
            const userinfoResp = await axios.get('https://api.linkedin.com/v2/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const data = userinfoResp.data;
            linkedinId = data.sub;
            fullName = data.name || `${data.given_name || ''} ${data.family_name || ''}`.trim();
            email = data.email;

            if (data.picture && typeof data.picture === 'object' && data.picture.url) {
                profilePicture = data.picture.url;
            } else {
                profilePicture = data.picture || '';
            }

            console.log('[LinkedIn] User info fetched from OIDC endpoint');
        } catch (userinfoErr) {
            console.log('[LinkedIn] User info endpoint failed, falling back to legacy API path', userinfoErr?.response?.data || userinfoErr?.message);

            const profileResp = await axios.get(
                'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))',
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            const emailResp = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            linkedinId = profileResp.data.id;
            fullName = `${profileResp.data.localizedFirstName || ''} ${profileResp.data.localizedLastName || ''}`.trim();
            email = emailResp.data.elements?.[0]?.['handle~']?.emailAddress;
            const photoCandidates = profileResp.data?.profilePicture?.['displayImage~']?.elements || [];
            const bestPhoto = photoCandidates[photoCandidates.length - 1];
            profilePicture = bestPhoto?.identifiers?.[0]?.identifier || '';
        }

        if (!email) {
            return res.status(400).json({ message: 'Unable to fetch LinkedIn email' });
        }

        const uid = `linkedin_${linkedinId}`;
        const userData = await ensureUserAndProfile({
            uid,
            email,
            fullName,
            role: role || 'talent',
            profilePicture,
            provider: 'linkedin',
        });

        const token = jwt.sign(
            {
                id: uid,
                email,
                role: userData.role,
                provider: 'linkedin',
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).cookie('token', token, getCookieOptions(7)).json({
            success: true,
            token,
            user: { id: uid, email, role: userData.role, verificationStatus: userData.verificationStatus },
        });
    } catch (err) {
        const status = err?.response?.status || 500;
        const errorData = err?.response?.data || {};

        console.error('[LinkedIn] OAuth error details:');
        console.error('  URL:', err?.config?.url);
        console.error('  Status:', status);
        console.error('  Error:', errorData.error || 'N/A');
        console.error('  Description:', errorData.error_description || err.message);

        if (status === 401) {
            console.warn('[LinkedIn] Hint: Check LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in .env.');
        }

        const isProduction = process.env.NODE_ENV === 'production';

        res.status(status).json({
            message: errorData.error_description || errorData.error || err?.message || 'LinkedIn login failed',
            ...(isProduction ? {} : { details: { status, error: errorData.error, error_description: errorData.error_description } })
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide an email and password' });
    }

    try {
        // Use Firebase Client SDK for login on server-side if needed to maintain REST structure
        const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();

        // Get user roles/data from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User data not found' });
        }

        const userData = userDoc.data();

        // Set cookie
        res.status(200).cookie('token', idToken, getCookieOptions(30)).json({
            success: true,
            token: idToken,
            user: {
                id: user.uid,
                email: user.email,
                role: userData.role,
                verificationStatus: userData.verificationStatus,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// @desc    Send / resend verification email
// @route   POST /api/auth/resend-verification
// @access  Public (email required)
export const resendVerification = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
        const user = await fetchUserByEmail(email);
        if (!user) {
            return res.status(200).json({
                success: true,
                message: 'If your account exists and is unverified, we sent a new verification email.',
            });
        }
        if (user.isVerified) {
            return res.status(200).json({ success: true, message: 'Email already verified' });
        }

        await sendVerificationEmailForUser({ userId: user.id, email });
        res.status(200).json({ success: true, message: 'Verification email sent' });
    } catch (err) {
        console.error('Resend verification error:', err);
        res.status(500).json({ message: 'Unable to send verification email' });
    }
};

// @desc    Verify email with token
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Token is required' });

    try {
        const tokenDoc = await db.collection('emailVerifications').doc(token).get();
        if (!tokenDoc.exists) return res.status(400).json({ message: 'Invalid or expired token' });

        const tokenData = tokenDoc.data();
        if (tokenData.used) return res.status(400).json({ message: 'Token already used' });
        if (new Date(tokenData.expiresAt) < new Date()) {
            return res.status(400).json({ message: 'Token expired' });
        }

        await updateWithBackup('users', tokenData.userId, {
            isVerified: true,
            verificationStatus: 'verified',
            emailVerifiedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        await db.collection('emailVerifications').doc(token).update({
            used: true,
            usedAt: new Date().toISOString(),
        });
        await db.collection('emailVerifications').doc(token).delete();

        res.status(200).json({ success: true, message: 'Email verified successfully' });
    } catch (err) {
        console.error('Verify email error:', err);
        res.status(500).json({ message: 'Unable to verify email' });
    }
};

// @desc    Trigger password reset email
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
        const user = await fetchUserByEmail(email);
        if (!user) {
            return res.status(200).json({
                success: true,
                message: 'If an account exists with this email, a reset link has been sent.',
            });
        }

        await sendResetPasswordEmail({ userId: user.id, email });
        res.status(200).json({ success: true, message: 'Password reset email sent' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Unable to send password reset email' });
    }
};

// @desc    Reset password with token
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and newPassword are required' });
    }

    try {
        const tokenDoc = await db.collection('passwordResets').doc(token).get();
        if (!tokenDoc.exists) return res.status(400).json({ message: 'Invalid or expired token' });

        const tokenData = tokenDoc.data();
        if (tokenData.used) return res.status(400).json({ message: 'Token already used' });
        if (new Date(tokenData.expiresAt) < new Date()) {
            return res.status(400).json({ message: 'Token expired' });
        }

        await adminAuth.updateUser(tokenData.userId, { password: newPassword });
        await updateWithBackup('users', tokenData.userId, { updatedAt: new Date().toISOString() });

        await db.collection('passwordResets').doc(token).update({
            used: true,
            usedAt: new Date().toISOString(),
        });
        await db.collection('passwordResets').doc(token).delete();

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ message: 'Unable to reset password' });
    }
};

// @desc    Admin login using env credentials only
// @route   POST /api/auth/admin-login
// @access  Public (credentials gated)
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return res.status(500).json({ message: 'Admin credentials not configured' });
    }

    const hashedEmail = crypto.createHash('sha256').update(email || '').digest();
    const envEmailHash = crypto.createHash('sha256').update(process.env.ADMIN_EMAIL).digest();
    const hashedPassword = crypto.createHash('sha256').update(password || '').digest();
    const envPasswordHash = crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD).digest();

    let emailMatch = false;
    let passwordMatch = false;
    try {
        emailMatch = crypto.timingSafeEqual(hashedEmail, envEmailHash);
        passwordMatch = crypto.timingSafeEqual(hashedPassword, envPasswordHash);
    } catch (e) {
        emailMatch = false;
        passwordMatch = false;
    }

    if (!emailMatch || !passwordMatch) {
        console.warn('[SECURITY] Failed admin login attempt from IP:', req.ip, 'at', new Date().toISOString());
        await new Promise((resolve) => setTimeout(resolve, 200));
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.info('[SECURITY] Successful admin login from IP:', req.ip);

    const token = jwt.sign(
        {
            id: 'env-admin',
            email,
            role: 'admin',
            isEnvAdmin: true,
        },
        JWT_SECRET,
        { expiresIn: '8h' }
    );

    await new Promise((resolve) => setTimeout(resolve, 200));
    res.status(200).json({ success: true, token });
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: 'New password is required' });
    }

    try {
        await adminAuth.updateUser(req.user.id, {
            password: newPassword
        });

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (err) {
        console.error('Change password error:', err);
        res.status(400).json({ message: err.message });
    }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    res.status(200).json({ success: true, data: {} });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const userDoc = await db.collection('users').doc(req.user.id).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        
        // Populate profile if requested
        if (userData.profile) {
            const profileDoc = await db.collection('profiles').doc(userData.profile).get();
            userData.profile = profileDoc.exists ? { id: profileDoc.id, ...profileDoc.data() } : null;
        }

        res.status(200).json({ success: true, data: { id: userDoc.id, ...userData } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
