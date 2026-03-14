import Message from '../models/Message.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { sendNotification } from '../socket.js';
import Profile from '../models/Profile.js';

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;

    try {
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        const message = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content,
        });

        // Get sender profile for name
        const senderProfile = await Profile.findOne({ user: req.user.id });
        const senderName = senderProfile?.fullName || 'Someone';

        // Notify Receiver
        const notification = await Notification.create({
            user: receiverId,
            type: 'message',
            title: 'New Message',
            message: `You have a new message from ${senderName}`,
            link: req.user.role === 'talent' ? '/director/messages' : '/talent/messages'
        });

        sendNotification(receiverId, notification);

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
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user.id },
            ],
        }).sort('createdAt');

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
        // Find all unique users who have sent/received messages to/from the current user
        const messages = await Message.find({
            $or: [{ sender: req.user.id }, { receiver: req.user.id }],
        }).populate('sender receiver', 'email profile');

        // Extract unique users (other than current user)
        const conversations = [];
        const userIds = new Set();

        messages.forEach((msg) => {
            const otherUser = msg.sender._id.toString() === req.user.id ? msg.receiver : msg.sender;
            if (!userIds.has(otherUser._id.toString())) {
                userIds.add(otherUser._id.toString());
                conversations.push(otherUser);
            }
        });

        res.status(200).json({ success: true, data: conversations });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
