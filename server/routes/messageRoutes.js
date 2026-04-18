import express from 'express';
import {
    sendMessage,
    getMessages,
    getConversations,
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { sendMessageSchema } from '../lib/schemas.js';

const router = express.Router();

router.post('/', protect, validate(sendMessageSchema), sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/:userId', protect, getMessages);

export default router;
