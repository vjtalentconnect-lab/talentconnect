import express from 'express';
import {
    getMyProfile,
    updateProfile,
    getProfileById,
    getProfiles,
    uploadMedia,
    submitForVerification,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProfiles);
router.get('/me', protect, getMyProfile);
router.get('/:id', getProfileById);
router.put('/', protect, updateProfile);
router.post('/upload', protect, upload.single('media'), uploadMedia);
router.post('/submit-verification', protect, submitForVerification);


export default router;
