import { db } from '../lib/firebaseAdmin.js';
import { updateWithBackup, batchUpdateWithBackup } from '../lib/textBackup.js';

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
export const getMyNotifications = async (req, res) => {
    try {
        if (req.user?.role === 'admin' && req.user?.id === 'env-admin') {
            return res.status(200).json({ success: true, data: [] });
        }

        const snapshot = await db.collection('notifications')
            .where('user', '==', req.user.id)
            .get();
        
        const notifications = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
            .slice(0, 20);
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

        await updateWithBackup('notifications', req.params.id, { read: true });

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
        if (req.user?.role === 'admin' && req.user?.id === 'env-admin') {
            return res.status(200).json({ success: true, message: 'All marked as read' });
        }

        const snapshot = await db.collection('notifications')
            .where('user', '==', req.user.id)
            .where('read', '==', false)
            .get();
        
        if (snapshot.empty) {
            return res.status(200).json({ success: true, message: 'All marked as read' });
        }

        const updates = snapshot.docs.map((doc) => ({ id: doc.id, data: { read: true } }));
        await batchUpdateWithBackup('notifications', updates);

        res.status(200).json({ success: true, message: 'All marked as read' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
