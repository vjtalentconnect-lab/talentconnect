import express from 'express';
import {
    getProjects,
    getProject,
    createProject,
    applyToProject,
    getProjectApplications,
    getMyApplications,
    getMyProjects,
    updateProject,
    updateApplicationStatus,
    getDirectorApplications,
    scheduleAudition,
    submitAuditionVideo,
} from '../controllers/projectController.js';
import { protect, authorize, enforceDirectorBilling } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createProjectSchema, updateApplicationStatusSchema, submitVideoSchema } from '../lib/schemas.js';

const router = express.Router();

router.get('/', getProjects);
// Must be before /:id to avoid being treated as a param
router.get('/my-applications', protect, authorize('talent'), getMyApplications);
router.get('/my-applications/director', protect, authorize('director', 'admin'), enforceDirectorBilling, getDirectorApplications);
router.get('/my-projects', protect, authorize('director', 'admin'), enforceDirectorBilling, getMyProjects);
router.get('/:id', getProject);

// Director only routes
router.post('/', protect, authorize('director', 'admin'), enforceDirectorBilling, validate(createProjectSchema), createProject);
router.put('/:id', protect, authorize('director', 'admin'), enforceDirectorBilling, updateProject);
router.get('/:id/applications', protect, authorize('director', 'admin'), enforceDirectorBilling, getProjectApplications);
router.put('/applications/:appId/status', protect, authorize('director', 'admin'), enforceDirectorBilling, validate(updateApplicationStatusSchema), updateApplicationStatus);
router.put('/applications/:appId/schedule-audition', protect, authorize('director', 'admin'), enforceDirectorBilling, scheduleAudition);

// Talent only routes
router.post('/:id/apply', protect, authorize('talent'), applyToProject);
router.put('/applications/:appId/submit-video', protect, authorize('talent'), validate(submitVideoSchema), submitAuditionVideo);

export default router;
