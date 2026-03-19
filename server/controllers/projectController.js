import Project from '../models/Project.js';
import Application from '../models/Application.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { sendNotification, broadcastAdminEvent, broadcastProjectCreated } from '../socket.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
    try {
        const { category, location, budget } = req.query;
        let query = { status: 'open' };

        if (category) query.category = category;
        if (location) query.location = new RegExp(location, 'i');
        if (budget) query.budget = new RegExp(budget, 'i');

        const projects = await Project.find(query).populate('director', 'email');
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('director', 'email');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Director only)
export const createProject = async (req, res) => {
    req.body.director = req.user.id;

    try {
        const project = await Project.create(req.body);
        const populatedProject = await project.populate('director', 'email role profile');

        // Notify admins about new project
        const admins = await User.find({ role: 'admin' }).select('_id');
        const adminNotifications = admins.map((admin) =>
            Notification.create({
                user: admin._id,
                type: 'project',
                title: 'New Project Created',
                message: `${req.user.email} created "${project.title}"`,
                link: `/admin/projects/${project._id}`
            })
        );
        const createdAdminNotes = await Promise.all(adminNotifications);
        createdAdminNotes.forEach((note) => sendNotification(note.user, note));
        broadcastAdminEvent({
            type: 'project_created',
            projectId: project._id,
            title: project.title,
            director: req.user.email,
            createdAt: new Date().toISOString(),
        });

        // Realtime broadcast for directors/talents/admins to refresh
        broadcastProjectCreated({
            _id: populatedProject._id,
            title: populatedProject.title,
            description: populatedProject.description,
            category: populatedProject.category,
            location: populatedProject.location,
            budget: populatedProject.budget,
            status: populatedProject.status,
            deadline: populatedProject.deadline,
            director: populatedProject.director,
            createdAt: populatedProject.createdAt,
        });

        res.status(201).json({ success: true, data: project });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Apply to project
// @route   POST /api/projects/:id/apply
// @access  Private (Talent only)
export const applyToProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const application = await Application.create({
            project: req.params.id,
            talent: req.user.id,
        });

        // Notify Director
        const notification = await Notification.create({
            user: project.director,
            type: 'application',
            title: 'New Application',
            message: `A talent has applied to your project: ${project.title}`,
            link: `/director/project/${project._id}`
        });

        sendNotification(project.director, notification);

        // Notify admins for audit trail
        const admins = await User.find({ role: 'admin' }).select('_id');
        const adminNotifications = admins.map((admin) =>
            Notification.create({
                user: admin._id,
                type: 'application',
                title: 'New Application Submitted',
                message: `Talent ${req.user.email} applied to "${project.title}"`,
                link: `/admin/projects/${project._id}`
            })
        );
        const adminNotes = await Promise.all(adminNotifications);
        adminNotes.forEach((note) => sendNotification(note.user, note));
        broadcastAdminEvent({
            type: 'application_submitted',
            projectId: project._id,
            talent: req.user.email,
            createdAt: new Date().toISOString(),
        });

        res.status(201).json({ success: true, data: application });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'You have already applied to this project' });
        }
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get project applications (for director)
// @route   GET /api/projects/:id/applications
// @access  Private (Director only)
export const getProjectApplications = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user is director of project
        if (project.director.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view applications for this project' });
        }

        const applications = await Application.find({ project: req.params.id }).populate('talent', 'email profile');
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get my projects (for director)
// @route   GET /api/projects/my-projects
// @access  Private (Director only)
export const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ director: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update application status
// @route   PUT /api/projects/applications/:appId/status
// @access  Private (Director only)
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['applied', 'shortlisted', 'auditioning', 'rejected', 'selected'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const application = await Application.findById(req.params.appId).populate('project');
        
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if user is the director of the project
        if (application.project.director.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this application' });
        }

        application.status = status;
        await application.save();

        // Notify Talent
        const notification = await Notification.create({
            user: application.talent,
            type: 'application_update',
            title: 'Application Update',
            message: `Your application status for ${application.project.title} has been updated to ${status}`,
            link: '/talent/projects'
        });

        sendNotification(application.talent, notification);

        res.status(200).json({ success: true, data: application });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Schedule audition for application
// @route   PUT /api/projects/applications/:appId/schedule-audition
// @access  Private (Director only)
export const scheduleAudition = async (req, res) => {
    try {
        const { auditionDate, auditionLocation, auditionNotes } = req.body;

        const application = await Application.findById(req.params.appId).populate('project talent');
        
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if user is the director of the project
        if (application.project.director.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to schedule auditions for this application' });
        }

        // Update audition details
        application.auditionScheduled = true;
        application.auditionDate = new Date(auditionDate);
        application.auditionLocation = auditionLocation;
        application.auditionNotes = auditionNotes;
        application.status = 'auditioning'; // Update status to auditioning
        await application.save();

        // Notify Talent
        const notification = await Notification.create({
            user: application.talent._id,
            type: 'audition_scheduled',
            title: 'Audition Scheduled',
            message: `Your audition for ${application.project.title} has been scheduled for ${new Date(auditionDate).toLocaleString()}`,
            link: '/talent/audition-invites'
        });

        sendNotification(application.talent._id, notification);

        res.status(200).json({ success: true, data: application });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Submit audition video
// @route   PUT /api/projects/applications/:appId/submit-video
// @access  Private (Talent only)
export const submitAuditionVideo = async (req, res) => {
    try {
        const { videoUrl } = req.body;

        const application = await Application.findById(req.params.appId).populate('project talent');
        
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if user is the talent who owns this application
        if (application.talent._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to submit video for this application' });
        }

        // Update video submission
        application.videoSubmissionUrl = videoUrl;
        await application.save();

        // Notify Director
        const notification = await Notification.create({
            user: application.project.director,
            type: 'audition_submitted',
            title: 'Audition Video Submitted',
            message: `${application.talent.profile?.fullName || 'Talent'} has submitted their audition video for ${application.project.title}`,
            link: '/director/auditions'
        });

        sendNotification(application.project.director, notification);

        res.status(200).json({ success: true, data: application });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all applications for director's projects
// @route   GET /api/projects/my-applications/director
// @access  Private (Director only)
export const getDirectorApplications = async (req, res) => {
    try {
        const { status } = req.query;
        // First find all projects by this director
        const projects = await Project.find({ director: req.user.id }).select('_id title category');
        const projectIds = projects.map(p => p._id);
        
        let query = { project: { $in: projectIds } };
        if (status) {
            // Allows querying for multiple statuses, e.g., ?status=shortlisted,auditioning
            const statusArray = status.split(',');
            query.status = { $in: statusArray };
        }

        const applications = await Application.find(query)
            .populate({
                path: 'talent',
                select: 'email role',
                populate: { path: 'profile' } // Populate talent's profile to get images, stats
            })
            .populate('project', 'title category')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get my applications (for talent)
// @route   GET /api/projects/my-applications
// @access  Private (Talent only)
export const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ talent: req.user.id })
            .populate({
                path: 'project',
                populate: { path: 'director', select: 'email' }
            })
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
