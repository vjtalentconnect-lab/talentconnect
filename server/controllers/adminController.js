import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Application from '../models/Application.js';

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getStats = async (req, res) => {
    try {
        const totalTalent = await User.countDocuments({ role: 'talent' });
        const totalDirectors = await User.countDocuments({ role: 'director' });
        const pendingVerifications = await User.countDocuments({ isVerified: false });
        const totalProjects = await Project.countDocuments();
        const totalApplications = await Application.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                totalTalent,
                totalDirectors,
                pendingVerifications,
                totalProjects,
                totalApplications,
                revenue: "₹14.2L", // Placeholder for now
                growth: "+12%"
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all users with their profiles
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('profile');
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get pending verification requests
// @route   GET /api/admin/verifications
// @access  Private (Admin)
export const getPendingVerifications = async (req, res) => {
    try {
        const users = await User.find({ isVerified: false }).populate('profile');
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Verify/Unverify user
// @route   PUT /api/admin/verify/:id
// @access  Private (Admin)
export const verifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isVerified = req.body.status !== undefined ? req.body.status : true;
        await user.save();

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all projects with director info
// @route   GET /api/admin/projects
// @access  Private (Admin)
export const getAdminProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('director', 'email');
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
