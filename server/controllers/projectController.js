import Project from '../models/Project.js';
import Application from '../models/Application.js';
import Notification from '../models/Notification.js';
import { sendNotification } from '../socket.js';

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
