import { db } from '../lib/firebaseAdmin.js';
import { addWithBackup } from '../lib/textBackup.js';
import { sendNotification } from '../socket.js';

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;

    try {
        const receiverDoc = await db.collection('users').doc(receiverId).get();
        if (!receiverDoc.exists) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        const messageData = {
            sender: req.user.id,
            receiver: receiverId,
            content,
            createdAt: new Date().toISOString()
        };

        const msgRef = await addWithBackup('messages', messageData);
        const message = { id: msgRef.id, ...messageData };

        // Get sender profile for name
        const senderProfileSnapshot = await db.collection('profiles').where('user', '==', req.user.id).limit(1).get();
        const senderProfile = !senderProfileSnapshot.empty ? senderProfileSnapshot.docs[0].data() : null;
        const senderName = senderProfile?.fullName || 'Someone';

        // Notify Receiver
        const notificationDoc = {
            user: receiverId,
            type: 'message',
            title: 'New Message',
            message: `You have a new message from ${senderName}`,
            link: req.user.role === 'talent' ? '/director/messages' : '/talent/messages',
            createdAt: new Date().toISOString()
        };
        const noteRef = await addWithBackup('notifications', notificationDoc);
        sendNotification(receiverId, { id: noteRef.id, ...notificationDoc });

        res.status(201).json({ success: true, data: message });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get messages between current user and another user
// @route   GET /api/messages/:userId
// @access  Private
export const getMessages = async (req, res) => {
    try {
        // Firestore doesn't support $or across different fields easily without complex indexing or manual merging.
        // We'll fetch sent and received messages separately and merge.
        const sentSnapshot = await db.collection('messages')
            .where('sender', '==', req.user.id)
            .where('receiver', '==', req.params.userId)
            .get();
        
        const receivedSnapshot = await db.collection('messages')
            .where('sender', '==', req.params.userId)
            .where('receiver', '==', req.user.id)
            .get();
        
        const messages = [
            ...sentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            ...receivedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        ];

        messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        res.status(200).json({ success: true, data: messages });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all conversations for current user
// @route   GET /api/messages/conversations
// @access  Private
export const getConversations = async (req, res) => {
    try {
        const sentSnapshot = await db.collection('messages').where('sender', '==', req.user.id).get();
        const receivedSnapshot = await db.collection('messages').where('receiver', '==', req.user.id).get();

        const messages = [
            ...sentSnapshot.docs.map(doc => doc.data()),
            ...receivedSnapshot.docs.map(doc => doc.data())
        ];

        const otherUserIds = new Set();
        messages.forEach((msg) => {
            const otherId = msg.sender === req.user.id ? msg.receiver : msg.sender;
            otherUserIds.add(otherId);
        });

        const conversations = await Promise.all(Array.from(otherUserIds).map(async (uid) => {
            const uDoc = await db.collection('users').doc(uid).get();
            if (!uDoc.exists) return null;
            const uData = uDoc.data();
            let profileData = null;
            if (uData.profile) {
                const pDoc = await db.collection('profiles').doc(uData.profile).get();
                profileData = pDoc.exists ? { id: pDoc.id, ...pDoc.data() } : null;
            }
            return { id: uDoc.id, email: uData.email, profile: profileData };
        }));

        res.status(200).json({ success: true, data: conversations.filter(c => c !== null) });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
