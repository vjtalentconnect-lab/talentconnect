import { db } from '../lib/firebaseAdmin.js';
import { sendNotification, broadcastAdminEvent, broadcastProjectCreated } from '../socket.js';
import { addWithBackup, updateWithBackup } from '../lib/textBackup.js';
import { sendApplicationShortlistedEmail, sendSelectedEmail, sendApplicationRejectedEmail, sendAuditionScheduledEmail } from '../lib/emailTemplates.js';

const parseLimit = (value, defaultLimit, maxLimit) => Math.min(Math.max(1, parseInt(value, 10) || defaultLimit), maxLimit);

const buildCursorQuery = async ({ collection, orderField = 'createdAt', direction = 'desc', limitVal, cursor, baseQuery }) => {
    let query = (baseQuery || db.collection(collection)).orderBy(orderField, direction).limit(limitVal);
    if (cursor) {
        const cursorDoc = await db.collection(collection).doc(cursor).get();
        if (!cursorDoc.exists) {
            return { error: 'Invalid cursor' };
        }
        query = query.startAfter(cursorDoc);
    }
    return { query };
};

const sortByCreatedAtDesc = (items) => (
    [...items].sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
);

const paginateInMemory = (items, limitVal, cursor) => {
    const sortedItems = sortByCreatedAtDesc(items);

    let startIndex = 0;
    if (cursor) {
        const cursorIndex = sortedItems.findIndex((item) => (item.id || item._id) === cursor);
        if (cursorIndex === -1) {
            return { error: 'Invalid cursor' };
        }
        startIndex = cursorIndex + 1;
    }

    const data = sortedItems.slice(startIndex, startIndex + limitVal);
    const nextCursor = data.length === limitVal ? (data[data.length - 1]?.id || data[data.length - 1]?._id || null) : null;

    return { data, nextCursor };
};

const filterProjectsInMemory = (projects, { title, director, location, budget }) => {
    let filtered = [...projects];

    if (title) {
        const regex = new RegExp(title, 'i');
        filtered = filtered.filter((project) => regex.test(project.title || ''));
    }
    if (director) {
        filtered = filtered.filter((project) => project.director === director);
    }
    if (location) {
        const regex = new RegExp(location, 'i');
        filtered = filtered.filter((project) => regex.test(project.location || ''));
    }
    if (budget) {
        const regex = new RegExp(budget, 'i');
        filtered = filtered.filter((project) => regex.test(project.budget || ''));
    }

    return filtered;
};

const hydrateProjectsWithDirector = async (projects) => {
    const directorIds = [...new Set(projects.map((project) => project.director).filter(Boolean))];
    const directorRefs = directorIds.map((directorId) => db.collection('users').doc(directorId));
    const directorDocs = directorRefs.length > 0 ? await db.getAll(...directorRefs) : [];
    const directorMap = new Map(directorDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));

    const profileIds = [...new Set(directorDocs.map((doc) => (doc.exists ? doc.data()?.profile : null)).filter(Boolean))];
    const profileRefs = profileIds.map((profileId) => db.collection('profiles').doc(profileId));
    const profileDocs = profileRefs.length > 0 ? await db.getAll(...profileRefs) : [];
    const profileMap = new Map(profileDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));

    return projects.map((project) => {
        const directorData = directorMap.get(project.director);
        const directorProfileId = directorData?.profile || null;
        const directorProfile = directorProfileId ? profileMap.get(directorProfileId) : null;

        return {
            ...project,
            _id: project._id || project.id,
            director: directorData ? {
                id: project.director,
                email: directorData.email,
                role: directorData.role,
                profileId: directorProfileId,
                profile: directorProfile ? {
                    id: directorProfileId,
                    fullName: directorProfile.fullName || '',
                    companyName: directorProfile.companyName || '',
                    profilePicture: directorProfile.profilePicture || 'no-photo.jpg',
                    location: directorProfile.location || '',
                } : null,
            } : project.director,
        };
    });
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
    try {
        const { category, location, budget, title, director } = req.query;
        const limitVal = parseLimit(req.query.limit, 20, 100);
        const cursor = typeof req.query.cursor === 'string' && req.query.cursor.length > 0 ? req.query.cursor : null;
        const snapshot = await db.collection('projects').get();
        let projects = snapshot.docs
            .map((doc) => ({ id: doc.id, _id: doc.id, ...doc.data() }))
            .filter((project) => project.status === 'open' || project.status === undefined || project.status === null || project.status === '');

        projects = filterProjectsInMemory(projects, { title, director, location, budget });
        if (category) {
            projects = projects.filter((project) => project.category === category);
        }
        const { data: pagedProjects, nextCursor, error } = paginateInMemory(projects, limitVal, cursor);
        if (error) {
            return res.status(400).json({ message: error });
        }
        const populatedProjects = await hydrateProjectsWithDirector(pagedProjects);
        res.status(200).json({ success: true, count: populatedProjects.length, nextCursor, data: populatedProjects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res) => {
    try {
        const projectDoc = await db.collection('projects').doc(req.params.id).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const projectData = projectDoc.data();

        // Populate director and attach profile id for deep links
        const directorDoc = await db.collection('users').doc(projectData.director).get();
        let director = projectData.director;
        if (directorDoc.exists) {
            const directorData = directorDoc.data();
            let directorProfileId = directorData.profile || null;
            let directorProfile = null;
            if (!directorProfileId) {
                const profileSnap = await db.collection('profiles').where('user', '==', directorDoc.id).limit(1).get();
                if (!profileSnap.empty) {
                    directorProfileId = profileSnap.docs[0].id;
                    directorProfile = profileSnap.docs[0].data();
                }
            }
            if (!directorProfile && directorProfileId) {
                const profileDoc = await db.collection('profiles').doc(directorProfileId).get();
                if (profileDoc.exists) directorProfile = profileDoc.data();
            }
            director = {
                id: directorDoc.id,
                email: directorData.email,
                profileId: directorProfileId,
                profile: directorProfile ? {
                    id: directorProfileId,
                    fullName: directorProfile.fullName || '',
                    companyName: directorProfile.companyName || '',
                    profilePicture: directorProfile.profilePicture || 'no-photo.jpg',
                    location: directorProfile.location || '',
                } : null,
            };
        }

        res.status(200).json({ success: true, data: { id: projectDoc.id, ...projectData, director } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Director only)
export const createProject = async (req, res) => {
    const projectData = {
        ...req.body,
        director: req.user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: req.body.status || 'open'
    };

    try {
        const projectRef = await addWithBackup('projects', projectData);
        const project = { id: projectRef.id, _id: projectRef.id, ...projectData };

        // Fetch director for population
        const directorDoc = await db.collection('users').doc(req.user.id).get();
        const directorData = directorDoc.data();
        project.director = { id: req.user.id, _id: req.user.id, email: directorData.email, role: directorData.role, profile: directorData.profile };

        // Notify admins about new project
        const adminsSnapshot = await db.collection('users').where('role', '==', 'admin').get();
        const adminNotifications = adminsSnapshot.docs.map(async (adminDoc) => {
            const notificationDoc = {
                user: adminDoc.id,
                type: 'project',
                title: 'New Project Created',
                message: `${req.user.email} created "${project.title}"`,
                link: `/admin/projects/${project.id}`,
                createdAt: new Date().toISOString()
            };
            const noteRef = await addWithBackup('notifications', notificationDoc);
            return { id: noteRef.id, ...notificationDoc };
        });
        
        const createdAdminNotes = await Promise.all(adminNotifications);
        createdAdminNotes.forEach((note) => sendNotification(note.user, note));
        
        broadcastAdminEvent({
            type: 'project_created',
            projectId: project.id,
            title: project.title,
            director: req.user.email,
            createdAt: new Date().toISOString(),
        });

        // Realtime broadcast
        broadcastProjectCreated(project);

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
        const projectDoc = await db.collection('projects').doc(req.params.id).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const project = projectDoc.data();

        // Check for existing application (Firestore doesn't have unique constraints like Mongoose)
        const existingApp = await db.collection('applications')
            .where('project', '==', req.params.id)
            .where('talent', '==', req.user.id)
            .limit(1)
            .get();
        
        if (!existingApp.empty) {
            return res.status(400).json({ message: 'You have already applied to this project' });
        }

        const applicationData = {
            project: req.params.id,
            talent: req.user.id,
            status: 'applied',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const appRef = await addWithBackup('applications', applicationData);
        const application = { id: appRef.id, ...applicationData };

        // Notify Director
        const notificationDoc = {
            user: project.director,
            type: 'application',
            title: 'New Application',
            message: `A talent has applied to your project: ${project.title}`,
            link: `/director/project/${req.params.id}`,
            createdAt: new Date().toISOString()
        };
        const noteRef = await addWithBackup('notifications', notificationDoc);
        sendNotification(project.director, { id: noteRef.id, ...notificationDoc });

        // Notify admins
        const adminsSnapshot = await db.collection('users').where('role', '==', 'admin').get();
        const adminNotifications = adminsSnapshot.docs.map(async (adminDoc) => {
            const n = {
                user: adminDoc.id,
                type: 'application',
                title: 'New Application Submitted',
                message: `Talent ${req.user.email} applied to "${project.title}"`,
                link: `/admin/projects/${req.params.id}`,
                createdAt: new Date().toISOString()
            };
            const nr = await addWithBackup('notifications', n);
            return { id: nr.id, ...n };
        });
        const adminNotes = await Promise.all(adminNotifications);
        adminNotes.forEach((note) => sendNotification(note.user, note));

        broadcastAdminEvent({
            type: 'application_submitted',
            projectId: req.params.id,
            talent: req.user.email,
            createdAt: new Date().toISOString(),
        });

        res.status(201).json({ success: true, data: application });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get project applications (for director)
// @route   GET /api/projects/:id/applications
// @access  Private (Director only)
export const getProjectApplications = async (req, res) => {
    try {
        const projectDoc = await db.collection('projects').doc(req.params.id).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const project = projectDoc.data();

        // Check if user is director of project
        if (project.director !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view applications for this project' });
        }

        const appsSnapshot = await db.collection('applications').where('project', '==', req.params.id).get();
        const applications = appsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const talentRefs = [...new Set(applications.map((app) => app.talent).filter(Boolean))]
            .map((talentId) => db.collection('users').doc(talentId));
        const talentDocs = talentRefs.length > 0 ? await db.getAll(...talentRefs) : [];
        const talentMap = new Map(talentDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));
        const profileRefs = [...new Set(talentDocs.map((doc) => (doc.exists ? doc.data()?.profile : null)).filter(Boolean))]
            .map((profileId) => db.collection('profiles').doc(profileId));
        const profileDocs = profileRefs.length > 0 ? await db.getAll(...profileRefs) : [];
        const profileMap = new Map(profileDocs.map((doc) => [doc.id, doc.exists ? { id: doc.id, ...doc.data() } : null]));

        const populatedApplications = applications.map((app) => {
            const talentData = talentMap.get(app.talent) || {};
            const profileData = talentData?.profile ? profileMap.get(talentData.profile) || null : null;
            return {
                ...app,
                talent: { id: app.talent, email: talentData?.email, profile: profileData }
            };
        });

        res.status(200).json({ success: true, count: populatedApplications.length, data: populatedApplications });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get my projects (for director)
// @route   GET /api/projects/my-projects
// @access  Private (Director only)
export const getMyProjects = async (req, res) => {
    try {
        const limitVal = parseLimit(req.query.limit, 20, 100);
        const cursor = typeof req.query.cursor === 'string' && req.query.cursor.length > 0 ? req.query.cursor : null;
        const snapshot = await db.collection('projects').where('director', '==', req.user.id).get();
        const projects = snapshot.docs.map(doc => ({ id: doc.id, _id: doc.id, ...doc.data() }));
        const { data, nextCursor, error } = paginateInMemory(projects, limitVal, cursor);
        if (error) {
            return res.status(400).json({ message: error });
        }
        res.status(200).json({ success: true, count: data.length, nextCursor, data });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update project (for director)
// @route   PUT /api/projects/:id
// @access  Private (Director only)
export const updateProject = async (req, res) => {
    try {
        const projectDoc = await db.collection('projects').doc(req.params.id).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const project = projectDoc.data();

        // Check if user is director of project
        if (project.director !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this project' });
        }

        const { title, description, category, requirements, budget, location, deadline, status, projectImage } = req.body;

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (requirements !== undefined) updateData.requirements = requirements;
        if (budget !== undefined) updateData.budget = budget;
        if (location !== undefined) updateData.location = location;
        if (deadline !== undefined) updateData.deadline = deadline;
        if (status !== undefined) updateData.status = status;
        if (projectImage !== undefined) updateData.projectImage = projectImage;
        updateData.updatedAt = new Date().toISOString();

        await updateWithBackup('projects', req.params.id, updateData);

        const updatedProjectDoc = await db.collection('projects').doc(req.params.id).get();
        const updatedProject = { id: updatedProjectDoc.id, ...updatedProjectDoc.data() };

        res.status(200).json({ success: true, data: updatedProject });
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

        const appDoc = await db.collection('applications').doc(req.params.appId).get();
        if (!appDoc.exists) {
            return res.status(404).json({ message: 'Application not found' });
        }
        const application = { id: appDoc.id, ...appDoc.data() };

        // Get project to check director
        const projectDoc = await db.collection('projects').doc(application.project).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const project = projectDoc.data();

        if (project.director !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this application' });
        }

        await updateWithBackup('applications', req.params.appId, { status, updatedAt: new Date().toISOString() });

        // Send email notifications
        const talentUserDoc = await db.collection('users').doc(application.talent).get()
        const talentEmail = talentUserDoc.data()?.email
        const talentProfileSnap = await db.collection('profiles').where('user','==',application.talent).limit(1).get()
        const talentName = talentProfileSnap.empty ? 'Artist' : (talentProfileSnap.docs[0].data().fullName || 'Artist')

        if (status === 'shortlisted') {
          const directorProfileSnap = await db.collection('profiles').where('user','==',req.user.id).limit(1).get()
          const directorName = directorProfileSnap.empty ? 'Director' : (directorProfileSnap.docs[0].data().fullName || 'Director')
          await sendApplicationShortlistedEmail({ talentEmail, talentName, projectTitle: project.title, directorName })
        } else if (status === 'selected') {
          const directorProfileSnap = await db.collection('profiles').where('user','==',req.user.id).limit(1).get()
          const directorName = directorProfileSnap.empty ? 'Director' : (directorProfileSnap.docs[0].data().fullName || 'Director')
          await sendSelectedEmail({ talentEmail, talentName, projectTitle: project.title, directorName })
        } else if (status === 'rejected') {
          await sendApplicationRejectedEmail({ talentEmail, talentName, projectTitle: project.title })
        }

        // If talent is selected, send a default congratulatory message
        if (status === 'selected') {
            const defaultMessage = `Congratulations! You have been selected for the project "${project.title}". Welcome to the team! Let's discuss the next steps.`;

            const messageData = {
                sender: req.user.id,
                receiver: application.talent,
                content: defaultMessage,
                createdAt: new Date().toISOString()
            };

            const msgRef = await addWithBackup('messages', messageData);
            const message = { id: msgRef.id, ...messageData };

            // Get director profile for name
            const senderProfileSnapshot = await db.collection('profiles').where('user', '==', req.user.id).limit(1).get();
            const senderProfile = !senderProfileSnapshot.empty ? senderProfileSnapshot.docs[0].data() : null;
            const senderName = senderProfile?.fullName || 'Director';

            // Notify talent about the message
            const messageNotificationDoc = {
                user: application.talent,
                type: 'message',
                title: 'New Message',
                message: `You have a new message from ${senderName}`,
                link: '/talent/messages',
                createdAt: new Date().toISOString()
            };
            const messageNoteRef = await addWithBackup('notifications', messageNotificationDoc);
            sendNotification(application.talent, { id: messageNoteRef.id, ...messageNotificationDoc });
        }

        // Notify Talent about status update
        const notificationDoc = {
            user: application.talent,
            type: 'application_update',
            title: 'Application Update',
            message: `Your application status for ${project.title} has been updated to ${status}`,
            link: '/talent/projects',
            createdAt: new Date().toISOString()
        };
        const noteRef = await addWithBackup('notifications', notificationDoc);
        sendNotification(application.talent, { id: noteRef.id, ...notificationDoc });

        res.status(200).json({ success: true, data: { ...application, status } });
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

        const appDoc = await db.collection('applications').doc(req.params.appId).get();
        if (!appDoc.exists) {
            return res.status(404).json({ message: 'Application not found' });
        }
        const application = { id: appDoc.id, ...appDoc.data() };

        const projectDoc = await db.collection('projects').doc(application.project).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const project = projectDoc.data();

        if (project.director !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to schedule auditions for this application' });
        }

        const auditionDateObj = new Date(auditionDate);
        if (Number.isNaN(auditionDateObj.getTime())) {
            return res.status(400).json({ message: 'Invalid audition date' });
        }

        const updateData = {
            auditionScheduled: true,
            auditionDate: auditionDateObj.toISOString(),
            auditionLocation,
            auditionNotes,
            status: 'auditioning',
            updatedAt: new Date().toISOString()
        };

        await updateWithBackup('applications', req.params.appId, updateData);

        // Send audition scheduled email
        const talentUserDoc = await db.collection('users').doc(application.talent).get()
        const talentEmail = talentUserDoc.data()?.email
        const talentProfileSnap = await db.collection('profiles').where('user','==',application.talent).limit(1).get()
        const talentName = talentProfileSnap.empty ? 'Artist' : (talentProfileSnap.docs[0].data().fullName || 'Artist')
        await sendAuditionScheduledEmail({ talentEmail, talentName, projectTitle: project.title, auditionDate, auditionLocation, auditionNotes })

        // Notify Talent
        const notificationDoc = {
            user: application.talent,
            type: 'audition_scheduled',
            title: 'Audition Scheduled',
            message: `Your audition for ${project.title} has been scheduled for ${new Date(auditionDate).toLocaleString()}`,
            link: '/talent/audition-invites',
            createdAt: new Date().toISOString()
        };
        const noteRef = await addWithBackup('notifications', notificationDoc);
        sendNotification(application.talent, { id: noteRef.id, ...notificationDoc });

        res.status(200).json({ success: true, data: { ...application, ...updateData } });
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

        const appDoc = await db.collection('applications').doc(req.params.appId).get();
        if (!appDoc.exists) {
            return res.status(404).json({ message: 'Application not found' });
        }
        const application = { id: appDoc.id, ...appDoc.data() };

        if (application.talent !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to submit video for this application' });
        }

        await updateWithBackup('applications', req.params.appId, {
            videoSubmissionUrl: videoUrl,
            updatedAt: new Date().toISOString()
        });

        // Notify Director
        const projectDoc = await db.collection('projects').doc(application.project).get();
        const project = projectDoc.data();

        const talentDoc = await db.collection('users').doc(application.talent).get();
        const talentData = talentDoc.data();
        let fullName = 'Talent';
        if (talentData.profile) {
            const profileDoc = await db.collection('profiles').doc(talentData.profile).get();
            if (profileDoc.exists) fullName = profileDoc.data().fullName;
        }

        const notificationDoc = {
            user: project.director,
            type: 'audition_submitted',
            title: 'Audition Video Submitted',
            message: `${fullName} has submitted their audition video for ${project.title}`,
            link: '/director/auditions',
            createdAt: new Date().toISOString()
        };
        const noteRef = await addWithBackup('notifications', notificationDoc);
        sendNotification(project.director, { id: noteRef.id, ...notificationDoc });

        res.status(200).json({ success: true });
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
        const page = Math.max(0, parseInt(req.query.page, 10) || 0);
        const limitVal = parseLimit(req.query.limit, 20, 100);
        const projectsSnapshot = await db.collection('projects').where('director', '==', req.user.id).get();
        const projectIds = projectsSnapshot.docs.map(doc => doc.id);
        
        if (projectIds.length === 0) {
            return res.status(200).json({ success: true, total: 0, page, hasMore: false, count: 0, data: [] });
        }

        let query = db.collection('applications').where('project', 'in', projectIds);
        
        // Firestore 'in' query supports up to 10 items. If more, we might need a different approach.
        // But for this project's scale, it should be fine for now.
        
        const appsSnapshot = await query.get();
        let applications = appsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (status) {
            const statusArray = status.split(',');
            applications = applications.filter(app => statusArray.includes(app.status));
        }

        applications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const total = applications.length;
        const pagedApplications = applications.slice(page * limitVal, (page + 1) * limitVal);

        const talentRefs = [...new Set(pagedApplications.map((app) => app.talent).filter(Boolean))]
            .map((talentId) => db.collection('users').doc(talentId));
        const projectRefs = [...new Set(pagedApplications.map((app) => app.project).filter(Boolean))]
            .map((projectId) => db.collection('projects').doc(projectId));
        const talentDocs = talentRefs.length > 0 ? await db.getAll(...talentRefs) : [];
        const projectDocs = projectRefs.length > 0 ? await db.getAll(...projectRefs) : [];
        const talentMap = new Map(talentDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));
        const projectMap = new Map(projectDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));
        const profileRefs = [...new Set(talentDocs.map((doc) => (doc.exists ? doc.data()?.profile : null)).filter(Boolean))]
            .map((profileId) => db.collection('profiles').doc(profileId));
        const profileDocs = profileRefs.length > 0 ? await db.getAll(...profileRefs) : [];
        const profileMap = new Map(profileDocs.map((doc) => [doc.id, doc.exists ? { id: doc.id, ...doc.data() } : null]));

        const populatedApps = pagedApplications.map((app) => {
            const talentData = talentMap.get(app.talent) || {};
            const projectData = projectMap.get(app.project) || {};
            const profileData = talentData?.profile ? profileMap.get(talentData.profile) || null : null;
            return {
                ...app,
                talent: { id: app.talent, email: talentData?.email, profile: profileData },
                project: { id: app.project, title: projectData?.title, category: projectData?.category }
            };
        });

        res.status(200).json({ success: true, total, page, hasMore: (page + 1) * limitVal < total, count: populatedApps.length, data: populatedApps });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get my applications (for talent)
// @route   GET /api/projects/my-applications
// @access  Private (Talent only)
export const getMyApplications = async (req, res) => {
    try {
        const limitVal = parseLimit(req.query.limit, 20, 100);
        const cursor = typeof req.query.cursor === 'string' && req.query.cursor.length > 0 ? req.query.cursor : null;
        const snapshot = await db.collection('applications').where('talent', '==', req.user.id).get();
        const applications = snapshot.docs.map((doc) => ({ id: doc.id, _id: doc.id, ...doc.data() }));
        const projectRefs = [...new Set(applications.map((app) => app.project).filter(Boolean))]
            .map((projectId) => db.collection('projects').doc(projectId));
        const projectDocs = projectRefs.length > 0 ? await db.getAll(...projectRefs) : [];
        const projectMap = new Map(projectDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));
        const directorRefs = [...new Set(projectDocs.map((doc) => (doc.exists ? doc.data()?.director : null)).filter(Boolean))]
            .map((directorId) => db.collection('users').doc(directorId));
        const directorDocs = directorRefs.length > 0 ? await db.getAll(...directorRefs) : [];
        const directorMap = new Map(directorDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));

        const populatedApplications = applications.map((app) => {
            const projectData = projectMap.get(app.project) || {};
            const directorData = directorMap.get(projectData?.director) || {};
            return {
                ...app,
                project: {
                    id: app.project,
                    ...projectData,
                    director: projectData?.director ? { id: projectData.director, email: directorData?.email } : null
                }
            };
        });

        const { data, nextCursor, error } = paginateInMemory(populatedApplications, limitVal, cursor);
        if (error) {
            return res.status(400).json({ message: error });
        }

        res.status(200).json({ success: true, count: data.length, nextCursor, data });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
