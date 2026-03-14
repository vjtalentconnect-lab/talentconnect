import Profile from '../models/Profile.js';

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
export const getMyProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 'email role');
        if (!profile) {
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
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                req.body,
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
            profile.portfolios.push({
                type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
                url: fileUrl,
                title: req.body.title || 'Untitled',
                description: req.body.description || ''
            });
        }

        await profile.save();
        res.status(200).json({ success: true, data: profile });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
