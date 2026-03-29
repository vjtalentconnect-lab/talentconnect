import express from 'express';
import {
    register,
    login,
    logout,
    getMe,
    changePassword,
    adminLogin,
    googleLogin,
    linkedinLogin,
    resendVerification,
    verifyEmail,
    forgotPassword,
    resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.post('/login/google', googleLogin);
router.post('/login/linkedin', linkedinLogin);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

export default router;
