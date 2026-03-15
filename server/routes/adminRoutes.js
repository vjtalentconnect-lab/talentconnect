import express from 'express';
import {
    getStats,
    getUsers,
    getPendingVerifications,
    verifyUser,
    getAdminProjects,
    getAdminProjectDetails,
    updateProjectStatus,
    deleteProject,
    updateUserRole,
    deleteUser
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected and admin-only
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/verifications', getPendingVerifications);
router.put('/verify/:id', verifyUser);
router.get('/projects', getAdminProjects);
router.get('/projects/:id', getAdminProjectDetails);
router.put('/projects/:id/status', updateProjectStatus);
router.delete('/projects/:id', deleteProject);

export default router;
