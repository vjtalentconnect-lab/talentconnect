import express from 'express';
import {
    getStats,
    getUsers,
    getPendingVerifications,
    verifyUser,
    getAdminProjects
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected and admin-only
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/verifications', getPendingVerifications);
router.put('/verify/:id', verifyUser);
router.get('/projects', getAdminProjects);

export default router;
