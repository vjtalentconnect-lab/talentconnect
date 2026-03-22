import { auth as adminAuth, db } from '../lib/firebaseAdmin.js';
import { auth as clientAuth } from '../lib/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

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

        await db.collection('users').doc(uid).set(userDoc);

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

        const profileRef = await db.collection('profiles').add(profileDoc);
        
        // Update user with profile id
        await db.collection('users').doc(uid).update({ profile: profileRef.id });

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

        res.status(201).json({
            success: true,
            user: { id: uid, email, role: userDoc.role }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: err.message });
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
