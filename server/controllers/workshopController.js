import { db } from '../lib/firebaseAdmin.js';

const parseLimit = (value, defaultLimit = 20, maxLimit = 100) =>
    Math.min(Math.max(1, parseInt(value, 10) || defaultLimit), maxLimit);

const sortByCreatedAtDesc = (items) =>
    [...items].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

const isIndexError = (err) => err?.code === 9 || /index/i.test(err?.message || '');

// @desc    Get all workshops
// @route   GET /api/workshops
// @access  Public
export const getWorkshops = async (req, res) => {
    try {
        const { type } = req.query;
        const limit = parseLimit(req.query.limit);

        let query = db.collection('workshops');
        if (type) {
            query = query.where('type', '==', type);
        }

        let snapshot;
        try {
            snapshot = await query.orderBy('createdAt', 'desc').limit(limit).get();
        } catch (err) {
            if (!isIndexError(err)) throw err;

            const fallbackSnapshot = await db.collection('workshops').limit(Math.max(limit * 5, 50)).get();
            let workshops = fallbackSnapshot.docs.map(doc => ({ id: doc.id, _id: doc.id, ...doc.data() }));
            if (type) {
                workshops = workshops.filter((workshop) => workshop.type === type);
            }
            workshops = sortByCreatedAtDesc(workshops).slice(0, limit);
            return res.status(200).json({ success: true, count: workshops.length, data: workshops });
        }

        const workshops = snapshot.docs.map(doc => ({ id: doc.id, _id: doc.id, ...doc.data() }));

        res.status(200).json({ success: true, count: workshops.length, data: workshops });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get featured workshops
// @route   GET /api/workshops/featured
// @access  Public
export const getFeaturedWorkshops = async (req, res) => {
    try {
        const limit = parseLimit(req.query.limit, 6);

        let snapshot;
        try {
            snapshot = await db.collection('workshops')
                .where('featured', '==', true)
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();
        } catch (err) {
            if (!isIndexError(err)) throw err;

            const fallbackSnapshot = await db.collection('workshops').limit(Math.max(limit * 5, 50)).get();
            const workshops = sortByCreatedAtDesc(
                fallbackSnapshot.docs
                    .map(doc => ({ id: doc.id, _id: doc.id, ...doc.data() }))
                    .filter((workshop) => workshop.featured === true)
            ).slice(0, limit);

            return res.status(200).json({ success: true, count: workshops.length, data: workshops });
        }

        const workshops = snapshot.docs.map(doc => ({ id: doc.id, _id: doc.id, ...doc.data() }));

        res.status(200).json({ success: true, count: workshops.length, data: workshops });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get on-demand classes
// @route   GET /api/workshops/on-demand
// @access  Public
export const getOnDemandClasses = async (req, res) => {
    try {
        const limit = parseLimit(req.query.limit);

        let snapshot;
        try {
            snapshot = await db.collection('workshops')
                .where('type', '==', 'on-demand')
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();
        } catch (err) {
            if (!isIndexError(err)) throw err;

            const fallbackSnapshot = await db.collection('workshops').limit(Math.max(limit * 5, 50)).get();
            const classes = sortByCreatedAtDesc(
                fallbackSnapshot.docs
                    .map(doc => ({ id: doc.id, _id: doc.id, ...doc.data() }))
                    .filter((workshop) => workshop.type === 'on-demand')
            ).slice(0, limit);

            return res.status(200).json({ success: true, count: classes.length, data: classes });
        }

        const classes = snapshot.docs.map(doc => ({ id: doc.id, _id: doc.id, ...doc.data() }));

        res.status(200).json({ success: true, count: classes.length, data: classes });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get single workshop
// @route   GET /api/workshops/:id
// @access  Public
export const getWorkshop = async (req, res) => {
    try {
        const doc = await db.collection('workshops').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Workshop not found' });
        }
        res.status(200).json({ success: true, data: { id: doc.id, _id: doc.id, ...doc.data() } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Book a workshop
// @route   POST /api/workshops/:id/book
// @access  Private
export const bookWorkshop = async (req, res) => {
    try {
        const workshopDoc = await db.collection('workshops').doc(req.params.id).get();
        if (!workshopDoc.exists) {
            return res.status(404).json({ message: 'Workshop not found' });
        }

        const bookingData = {
            workshop: req.params.id,
            user: req.user.id,
            createdAt: new Date().toISOString(),
            ...req.body,
        };

        const bookingRef = await db.collection('workshopBookings').add(bookingData);

        res.status(201).json({ success: true, data: { id: bookingRef.id, ...bookingData } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
