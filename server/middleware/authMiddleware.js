import { auth, db } from '../lib/firebaseAdmin.js';
import addDays from '../utils/addDays.js';

// Protect routes
export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        // Set token from cookie
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    try {
        // Verify Firebase ID token
        const decodedToken = await auth.verifyIdToken(token);
        
        // Get user from Firestore
        const userDoc = await db.collection('users').doc(decodedToken.uid).get();
        if (!userDoc.exists) {
            return res.status(401).json({ message: 'Not authorized to access this route' });
        }

        req.user = { id: userDoc.id, ...userDoc.data() };
        next();
    } catch (err) {
        console.error('Auth verification error:', err);
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }
};

// Grant access to specific roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role ${req.user.role} is not authorized to access this route`,
            });
        }
        next();
    };
};

// Enforce director free-trial / subscription window
export const enforceDirectorBilling = (req, res, next) => {
    const user = req.user;
    if (!user || (user.role !== 'director' && user.role !== 'admin')) return next();
    if (user.role === 'admin') return next();

    const hasActivePlan = user.subscriptionStatus === 'active' || user.plan === 'studio_pro';
    if (hasActivePlan) return next();

    const trialEnd = user.trialEndsAt || addDays(user.createdAt || new Date(), 30);
    if (new Date() <= new Date(trialEnd)) return next();

    return res.status(402).json({
        message: 'Your 30-day director trial has ended. Please upgrade to continue using these services.',
        trialEnded: true,
        trialEnd,
    });
};
