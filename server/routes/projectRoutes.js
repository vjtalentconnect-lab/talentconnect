import express from 'express';
import {
    getProjects,
    getProject,
    createProject,
    applyToProject,
    getProjectApplications,
    getMyApplications,
    getMyProjects,
    updateApplicationStatus,
    getDirectorApplications,
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProjects);
// Must be before /:id to avoid being treated as a param
router.get('/my-applications', protect, authorize('talent'), getMyApplications);
router.get('/my-applications/director', protect, authorize('director', 'admin'), getDirectorApplications);
router.get('/my-projects', protect, authorize('director', 'admin'), getMyProjects);
router.get('/:id', getProject);

// Director only routes
router.post('/', protect, authorize('director', 'admin'), createProject);
router.get('/:id/applications', protect, authorize('director', 'admin'), getProjectApplications);
router.put('/applications/:appId/status', protect, authorize('director', 'admin'), updateApplicationStatus);

// Talent only routes
router.post('/:id/apply', protect, authorize('talent'), applyToProject);

export default router;
