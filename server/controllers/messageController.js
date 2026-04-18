import { db } from '../lib/firebaseAdmin.js';
import { addWithBackup } from '../lib/textBackup.js';
import { sendNotification } from '../socket.js';

const parseLimit = (value, defaultLimit, maxLimit) => Math.min(Math.max(1, parseInt(value, 10) || defaultLimit), maxLimit);

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
        const limitVal = parseLimit(req.query.limit, 50, 50);
        const before = typeof req.query.before === 'string' && req.query.before.length > 0 ? new Date(req.query.before) : null;
        if (before && Number.isNaN(before.getTime())) {
            return res.status(400).json({ message: 'Invalid before timestamp' });
        }

        // Firestore doesn't support $or across different fields easily without complex indexing or manual merging.
        // We'll fetch sent and received messages separately and merge.
        let sentQuery = db.collection('messages')
            .where('sender', '==', req.user.id)
            .where('receiver', '==', req.params.userId);
        let receivedQuery = db.collection('messages')
            .where('sender', '==', req.params.userId)
            .where('receiver', '==', req.user.id);

        if (before) {
            const beforeIso = before.toISOString();
            sentQuery = sentQuery.where('createdAt', '<', beforeIso);
            receivedQuery = receivedQuery.where('createdAt', '<', beforeIso);
        }

        const [sentSnapshot, receivedSnapshot] = await Promise.all([
            sentQuery.get(),
            receivedQuery.get(),
        ]);
        
        const messages = [
            ...sentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            ...receivedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        ];

        messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const limitedMessages = messages.slice(-limitVal);
        const nextBefore = limitedMessages.length === limitVal ? limitedMessages[0].createdAt : null;

        res.status(200).json({ success: true, count: limitedMessages.length, nextBefore, data: limitedMessages });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all conversations for current user
// @route   GET /api/messages/conversations
// @access  Private
export const getConversations = async (req, res) => {
    try {
        const hardCap = parseLimit(req.query.limit, 50, 50);
        const sentSnapshot = await db.collection('messages').where('sender', '==', req.user.id).get();
        const receivedSnapshot = await db.collection('messages').where('receiver', '==', req.user.id).get();

        const messages = [
            ...sentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            ...receivedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        ];

        messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const latestByUser = new Map();
        messages.forEach((msg) => {
            const otherId = msg.sender === req.user.id ? msg.receiver : msg.sender;
            if (!latestByUser.has(otherId)) {
                latestByUser.set(otherId, msg);
            }
        });

        const userIds = Array.from(latestByUser.keys()).slice(0, hardCap);
        const userRefs = userIds.map((uid) => db.collection('users').doc(uid));
        const userDocs = userRefs.length > 0 ? await db.getAll(...userRefs) : [];
        const userMap = new Map(userDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));
        const profileRefs = [...new Set(userDocs.map((doc) => (doc.exists ? doc.data()?.profile : null)).filter(Boolean))]
            .map((profileId) => db.collection('profiles').doc(profileId));
        const profileDocs = profileRefs.length > 0 ? await db.getAll(...profileRefs) : [];
        const profileMap = new Map(profileDocs.map((doc) => [doc.id, doc.exists ? { id: doc.id, ...doc.data() } : null]));

        const conversations = userIds.map((uid) => {
            const userData = userMap.get(uid);
            if (!userData) return null;
            const profileData = userData.profile ? profileMap.get(userData.profile) || null : null;
            return {
                id: uid,
                email: userData.email,
                profile: profileData,
                lastMessage: latestByUser.get(uid),
            };
        }).filter(Boolean);

        res.status(200).json({ success: true, count: conversations.length, data: conversations });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
