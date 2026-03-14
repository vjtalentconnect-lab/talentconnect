import express from 'express';
import {
    getProjects,
    getProject,
    createProject,
    applyToProject,
    getProjectApplications,
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject);

// Director only routes
router.post('/', protect, authorize('director', 'admin'), createProject);
router.get('/:id/applications', protect, authorize('director', 'admin'), getProjectApplications);

// Talent only routes
router.post('/:id/apply', protect, authorize('talent'), applyToProject);

export default router;
