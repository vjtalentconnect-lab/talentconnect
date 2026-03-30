import express from 'express';
import {
    getWorkshops,
    getFeaturedWorkshops,
    getOnDemandClasses,
    getWorkshop,
    bookWorkshop,
} from '../controllers/workshopController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getWorkshops);
router.get('/featured', getFeaturedWorkshops);
router.get('/on-demand', getOnDemandClasses);
router.get('/:id', getWorkshop);
router.post('/:id/book', protect, bookWorkshop);

export default router;
