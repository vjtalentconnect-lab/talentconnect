import Profile from '../models/Profile.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { broadcastAdminEvent, sendNotification } from '../socket.js';

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
export const getMyProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 'email role isVerified verificationStatus');
        if (!profile) {
            // Check if user is an admin and auto-generated without a profile
            const user = await User.findById(req.user.id);
            if (user && user.role === 'admin') {
                 return res.status(200).json({ 
                     success: true, 
                     data: { fullName: 'Super Admin', _id: 'admin_profile', role: 'admin' } 
                 });
            }
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            profile = await Profile.create({ ...req.body, user: req.user.id });
        } else {
            // Prepare update data to handle nested objects correctly
            const updateData = { ...req.body };
            
            // Handle nested objects by using dots to avoid overwriting
            ['verificationState', 'socialLinks', 'physicalMetrics', 'privacySettings'].forEach(key => {
                if (updateData[key]) {
                    Object.keys(updateData[key]).forEach(subKey => {
                        updateData[`${key}.${subKey}`] = updateData[key][subKey];
                    });
                    delete updateData[key];
                }
            });

            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: updateData },
                { new: true, runValidators: true }
            );
        }

        res.status(200).json({ success: true, data: profile });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get profile by id
// @route   GET /api/profile/:id
// @access  Public
export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('user', 'email role');
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all profiles (with filtering)
// @route   GET /api/profile
// @access  Public
export const getProfiles = async (req, res) => {
    try {
        const { talentCategory, location, skills, eyeColor, hairColor, minHeight, maxHeight, gender } = req.query;
        let query = {};

        if (talentCategory) query.talentCategory = talentCategory;
        if (location) query.location = new RegExp(location, 'i');
        if (skills) query.skills = { $in: skills.split(',') };
        if (eyeColor) query['physicalMetrics.eyeColor'] = eyeColor;
        if (hairColor) query['physicalMetrics.hairColor'] = hairColor;
        
        // Height range filter
        if (minHeight || maxHeight) {
            query['physicalMetrics.height'] = {};
            if (minHeight) query['physicalMetrics.height'].$gte = minHeight;
            if (maxHeight) query['physicalMetrics.height'].$lte = maxHeight;
        }

        const profiles = await Profile.find(query).populate('user', 'email role');
        res.status(200).json({ success: true, count: profiles.length, data: profiles });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Upload profile media (picture or portfolio)
// @route   POST /api/profile/upload
// @access  Private
export const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const fileUrl = req.file.path; // Cloudinary URL
        const { type } = req.body; // 'profilePicture' or 'portfolio'

        if (type === 'profilePicture') {
            profile.profilePicture = fileUrl;
        } else if (type === 'portfolio') {
            profile.portfolio.push({
                type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
                url: fileUrl,
                title: req.body.title || 'Untitled',
                description: req.body.description || ''
            });
        } else if (['idFile', 'membershipCard', 'videoSelfie'].includes(type)) {
            if (!profile.verificationState) profile.verificationState = {};
            
            if (type === 'idFile') {
                profile.verificationState.idFileUrl = fileUrl;
                profile.verificationState.idType = req.body.idType;
            } else if (type === 'membershipCard') {
                profile.verificationState.membershipCardUrl = fileUrl;
                profile.verificationState.membershipId = req.body.membershipId;
                profile.verificationState.associationName = req.body.associationName;
            } else if (type === 'videoSelfie') {
                profile.verificationState.videoSelfieUrl = fileUrl;
            }
        }

        await profile.save();
        res.status(200).json({ success: true, data: profile });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Submit profile for verification (sets status to 'pending')
// @route   POST /api/profile/submit-verification
// @access  Private
export const submitForVerification = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.verificationStatus = 'pending';
        user.isVerified = false;
        await user.save();

        // Notify admins and emit realtime event
        const admins = await User.find({ role: 'admin' }).select('_id');
        const adminNotifications = admins.map((admin) =>
            Notification.create({
                user: admin._id,
                type: 'verification',
                title: 'Verification Requested',
                message: `${user.email} submitted verification`,
                link: '/admin/verifications'
            })
        );
        const adminNotes = await Promise.all(adminNotifications);
        adminNotes.forEach((note) => sendNotification(note.user, note));
        broadcastAdminEvent({
            type: 'verification_requested',
            user: user.email,
            userId: user._id,
            createdAt: new Date().toISOString(),
        });

        res.status(200).json({ success: true, message: 'Profile submitted for verification.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
