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
    refreshToken,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema, changePasswordSchema, adminLoginSchema } from '../lib/schemas.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh-token', refreshToken);
router.post('/admin-login', validate(adminLoginSchema), adminLogin);
router.post('/login/google', googleLogin);
router.post('/login/linkedin', linkedinLogin);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/change-password', protect, validate(changePasswordSchema), changePassword);

export default router;
