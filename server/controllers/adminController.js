import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Application from '../models/Application.js';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getStats = async (req, res) => {
    try {
        const totalTalent = await User.countDocuments({ role: 'talent' });
        const totalDirectors = await User.countDocuments({ role: 'director' });
        const pendingVerifications = await User.countDocuments({ verificationStatus: 'pending' });
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
                revenue: 'INR 14.2L', // Placeholder for now
                growth: '+12%',
            },
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
        console.log(`[AdminController] Fetched ${users.length} users`);
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        console.error(`[AdminController] Error fetching users: ${err.message}`);
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get pending verification requests
// @route   GET /api/admin/verifications
// @access  Private (Admin)
export const getPendingVerifications = async (req, res) => {
    try {
        const users = await User.find({ 
            role: { $ne: 'admin' },
            verificationStatus: { $in: ['pending', 'none'] } 
        })
        .populate('profile')
        .sort({ updatedAt: -1 });

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

        const oldStatus = user.verificationStatus;
        
        // Handle different payload formats gracefully
        const incomingStatus = typeof req.body === 'boolean' ? req.body : req.body.status;
        const incomingVerifStatus = req.body.verificationStatus;

        if (incomingVerifStatus) {
            user.verificationStatus = incomingVerifStatus;
            user.isVerified = incomingVerifStatus === 'verified';
        } else if (incomingStatus !== undefined) {
            user.isVerified = incomingStatus;
            user.verificationStatus = incomingStatus ? 'verified' : 'none';
        } else {
            // Default to verifying if no clear instruction sent
            user.isVerified = true;
            user.verificationStatus = 'verified';
        }
        await user.save();

        // Real-time update via Socket.io
        if (oldStatus !== user.verificationStatus) {
            try {
                const { getIO, sendNotification } = await import('../socket.js');
                const io = getIO();
                
                // Emit specific verification update event
                io.to(user._id.toString()).emit('verificationUpdate', {
                    status: user.verificationStatus,
                    isVerified: user.isVerified
                });

                // Send standard notification
                const notification = {
                    type: 'verification',
                    title: user.isVerified ? 'Profile Verified!' : 'Verification Update',
                    message: user.isVerified 
                        ? 'Congratulations! Your profile has been verified. You now have full access to the platform.' 
                        : `Your verification status has been updated to ${user.verificationStatus}.`,
                    link: '/talent/verify'
                };
                
                sendNotification(user._id, notification);
                
                // Also create an in-app notification record
                await Notification.create({
                    user: user._id,
                    ...notification
                });

                // Notify all admins of verification change
                const { broadcastAdminEvent } = await import('../socket.js');
                broadcastAdminEvent({
                    type: 'verificationUpdate',
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                        verificationStatus: user.verificationStatus,
                        isVerified: user.isVerified
                    }
                });
            } catch (socketErr) {
                console.error('Socket notification failed:', socketErr);
            }
        }

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
        const projects = await Project.find().populate('director', 'email profile');
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get detailed project info
// @route   GET /api/admin/projects/:id
// @access  Private (Admin)
export const getAdminProjectDetails = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('director', 'email profile')
            .lean();

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const applications = await Application.find({ project: req.params.id })
            .populate({
                path: 'talent',
                select: 'email role',
                populate: { path: 'profile' },
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: { ...project, applications } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update project status
// @route   PUT /api/admin/projects/:id/status
// @access  Private (Admin)
export const updateProjectStatus = async (req, res) => {
    const { status } = req.body;
    const validStatuses = ['open', 'closed', 'draft'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.status = status;
        await project.save();

        res.status(200).json({ success: true, data: project });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete project (and related applications)
// @route   DELETE /api/admin/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await Application.deleteMany({ project: req.params.id });
        await project.deleteOne();

        res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update a user's role
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin)
export const updateUserRole = async (req, res) => {
    const { role } = req.body;
    const validRoles = ['talent', 'director', 'admin'];

    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete user and related data
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove associated records to avoid orphaned data
        await Profile.deleteMany({ user: user._id });
        await Application.deleteMany({ talent: user._id });

        // Remove projects created by this user and any applications tied to them
        const ownedProjects = await Project.find({ director: user._id }).select('_id');
        const ownedProjectIds = ownedProjects.map(p => p._id);
        if (ownedProjectIds.length) {
            await Application.deleteMany({ project: { $in: ownedProjectIds } });
        }
        await Project.deleteMany({ director: user._id });
        await Message.deleteMany({ $or: [{ sender: user._id }, { receiver: user._id }] });
        await Notification.deleteMany({ user: user._id });

        await user.deleteOne();

        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
