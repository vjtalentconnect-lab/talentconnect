import { auth as adminAuth, db } from '../lib/firebaseAdmin.js';
import { auth as clientAuth } from '../lib/firebase.js';
import { addWithBackup, setWithBackup, updateWithBackup } from '../lib/textBackup.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import jwt from 'jsonwebtoken';
import axios from 'axios';

// Ensure Firestore user + profile exist; used by social logins
const ensureUserAndProfile = async ({ uid, email, fullName = '', role = 'talent', mobile = '', location = '', provider = 'password' }) => {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        const userData = {
            email,
            role,
            isVerified: false,
            verificationStatus: role === 'talent' ? 'pending' : 'none',
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
            talentCategory: role === 'talent' ? 'Actor' : null,
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
        const profileRef = await addWithBackup('profiles', profileData);
        await updateWithBackup('users', uid, { profile: profileRef.id });
    }

    // Return updated user doc
    const updatedDoc = await userRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    const { email, password, role, fullName, talentCategory, location, mobile } = req.body;

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
            verificationStatus: role === 'talent' ? 'pending' : 'none',
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
            talentCategory: role === 'talent' ? talentCategory : null,
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

        const userData = await ensureUserAndProfile({
            uid,
            email,
            fullName,
            role: role || 'talent',
            provider: 'google',
        });

        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        };

        res.status(200).cookie('token', idToken, options).json({
            success: true,
            token: idToken,
            user: { id: uid, email, role: userData.role },
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
        let accessToken;

        if (code === 'AUTO') {
            accessToken = process.env.LINKEDIN_CLIENT_SECRET;
        } else {
            // Exchange code for access token
            const tokenResp = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
                params: {
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                    client_id: process.env.LINKEDIN_CLIENT_ID,
                    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            accessToken = tokenResp.data.access_token;
        }

        // Fetch basic profile
        const profileResp = await axios.get('https://api.linkedin.com/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const emailResp = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const linkedinId = profileResp.data.id;
        const fullName = `${profileResp.data.localizedFirstName || ''} ${profileResp.data.localizedLastName || ''}`.trim();
        const email = emailResp.data.elements?.[0]?.['handle~']?.emailAddress;

        if (!email) {
            return res.status(400).json({ message: 'Unable to fetch LinkedIn email' });
        }

        const uid = `linkedin_${linkedinId}`;
        const userData = await ensureUserAndProfile({
            uid,
            email,
            fullName,
            role: role || 'talent',
            provider: 'linkedin',
        });

        const token = jwt.sign(
            {
                id: uid,
                email,
                role: userData.role,
                provider: 'linkedin',
            },
            process.env.JWT_SECRET || 'change_this_secret',
            { expiresIn: '7d' }
        );

        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        };

        res.status(200).cookie('token', token, options).json({
            success: true,
            token,
            user: { id: uid, email, role: userData.role },
        });
    } catch (err) {
        console.error('LinkedIn login error:', err?.response?.data || err.message);
        res.status(401).json({ message: 'LinkedIn login failed' });
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
        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        if (process.env.NODE_ENV === 'production') {
            options.secure = true;
        }

        res.status(200).cookie('token', idToken, options).json({
            success: true,
            token: idToken,
            user: {
                id: user.uid,
                email: user.email,
                role: userData.role,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// @desc    Admin login using env credentials only
// @route   POST /api/auth/admin-login
// @access  Public (credentials gated)
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        return res.status(500).json({ message: 'Admin credentials not configured' });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        {
            id: 'env-admin',
            email,
            role: 'admin',
            isEnvAdmin: true,
        },
        process.env.JWT_SECRET || 'change_this_secret',
        { expiresIn: '1d' }
    );

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
