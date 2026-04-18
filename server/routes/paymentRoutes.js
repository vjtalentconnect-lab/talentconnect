import express from 'express';
import { createSubscription, createPortalSession, getPaymentHistory, 
         confirmPayment, handleWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Webhook endpoint (no auth needed)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.post('/create-subscription', protect, createSubscription);
router.post('/portal', protect, createPortalSession);
router.get('/history', protect, getPaymentHistory);
router.post('/confirm-payment', protect, confirmPayment);

export default router;