import express from 'express';
import {
    getMyProfile,
    updateProfile,
    getProfileById,
    getProfileByUser,
    getProfiles,
    uploadMedia,
    submitForVerification,
    exportMyData,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload, { verifyAndUpload } from '../middleware/uploadMiddleware.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema } from '../lib/schemas.js';

const router = express.Router();

router.get('/', getProfiles);
router.get('/me', protect, getMyProfile);
router.get('/export-data', protect, exportMyData);
router.get('/by-user/:userId', getProfileByUser);
router.get('/:id', getProfileById);
router.put('/', protect, validate(updateProfileSchema), updateProfile);
router.post('/upload', protect, upload.single('media'), verifyAndUpload, uploadMedia);
router.post('/submit-verification', protect, submitForVerification);


export default router;
