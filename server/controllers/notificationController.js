import { db } from '../lib/firebaseAdmin.js';

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
export const getMyNotifications = async (req, res) => {
    try {
        const snapshot = await db.collection('notifications')
            .where('user', '==', req.user.id)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();
        
        const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json({ success: true, data: notifications });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id
// @access  Private
export const markAsRead = async (req, res) => {
    try {
        const docRef = db.collection('notifications').doc(req.params.id);
        const doc = await docRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        const notification = doc.data();

        if (notification.user !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await docRef.update({ read: true });

        res.status(200).json({ success: true, data: { id: doc.id, ...notification, read: true } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Mark all as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllRead = async (req, res) => {
    try {
        const snapshot = await db.collection('notifications')
            .where('user', '==', req.user.id)
            .where('read', '==', false)
            .get();
        
        if (snapshot.empty) {
            return res.status(200).json({ success: true, message: 'All marked as read' });
        }

        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
            batch.update(doc.ref, { read: true });
        });
        await batch.commit();

        res.status(200).json({ success: true, message: 'All marked as read' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
