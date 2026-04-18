import { db } from '../lib/firebaseAdmin.js';
import { addWithBackup, updateWithBackup } from '../lib/textBackup.js';
import { cloudinary } from '../config/cloudinary.js';
import { sendVerificationApprovedEmail } from '../lib/emailTemplates.js';

const parseLimit = (value, defaultLimit, maxLimit) => Math.min(Math.max(1, parseInt(value, 10) || defaultLimit), maxLimit);

const MAX_GLOBAL_SEARCH_RESULTS = 50;

const buildRangeSearch = (collection, field, searchTerm) => {
    return db.collection(collection)
        .orderBy(field)
        .startAt(searchTerm)
        .endAt(`${searchTerm}\uf8ff`)
        .limit(MAX_GLOBAL_SEARCH_RESULTS);
};

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getStats = async (req, res) => {
    try {
        const talentSnapshot = await db.collection('users').where('role', '==', 'talent').get();
        const directorSnapshot = await db.collection('users').where('role', '==', 'director').get();
        const pendingSnapshot = await db.collection('users').where('verificationStatus', '==', 'pending').get();
        const projectsSnapshot = await db.collection('projects').get();
        const applicationsSnapshot = await db.collection('applications').get();

        // Calculate total production value (sum of budgets)
        let totalProductionValue = 0;
        projectsSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.budget) {
                // Try to parse values like "₹50 Cr", "INR 75L", "1000000"
                const budgetStr = String(data.budget).toUpperCase();
                let value = parseFloat(budgetStr.replace(/[^0-9.]/g, '')) || 0;
                
                if (budgetStr.includes('CR')) value *= 100; // Normalize to Lakhs for easier math if needed, or just stay consistent
                else if (budgetStr.includes('L')) value *= 1;
                // If it's just a large number, assume it's in INR and divide by 1L to get Lakhs
                else if (value > 10000) value /= 100000;

                totalProductionValue += value;
            }
        });

        // Calculate dynamic revenue based on paid plans
        const proUsers = await db.collection('users').where('plan', '==', 'studio_pro').get();
        const estimatedRevenue = proUsers.size * 99; // $99 per user

        // Health metrics
        const messagesSnapshot = await db.collection('messages').get();

        res.status(200).json({
            success: true,
            data: {
                totalTalent: talentSnapshot.size,
                totalDirectors: directorSnapshot.size,
                pendingVerifications: pendingSnapshot.size,
                totalProjects: projectsSnapshot.size,
                totalApplications: applicationsSnapshot.size,
                totalProductionValue: totalProductionValue || 0,
                revenue: `₹${(estimatedRevenue / 10).toFixed(1)}L`, // Showing in Lakhs for effect
                growth: '+14%',
                revenueGrowth: '+22%',
                activeAuditions: applicationsSnapshot.size, // Using apps as a proxy for auditions
                messageThroughput: messagesSnapshot.size,
                serverLoad: 24, // Mocked health metric
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
        const limitVal = parseLimit(req.query.limit, 50, 100);
        const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : null;

        let query = db.collection('users').orderBy('createdAt', 'desc').limit(limitVal);
        if (cursor) {
            const cursorDoc = await db.collection('users').doc(cursor).get();
            if (!cursorDoc.exists) {
                return res.status(400).json({ message: 'Invalid cursor' });
            }
            query = query.startAfter(cursorDoc);
        }

        const snapshot = await query.get();
        const users = snapshot.docs.map((doc) => ({ id: doc.id, _id: doc.id, ...doc.data() }));
        const profileRefs = [...new Set(users.map((user) => user.profile).filter(Boolean))]
            .map((profileId) => db.collection('profiles').doc(profileId));
        const profileDocs = profileRefs.length > 0 ? await db.getAll(...profileRefs) : [];
        const profileMap = new Map(profileDocs.map((doc) => [doc.id, doc.exists ? { id: doc.id, ...doc.data() } : null]));
        const populatedUsers = users.map((user) => ({
            ...user,
            profile: user.profile ? profileMap.get(user.profile) || null : null,
        }));

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        console.info('[Admin] getUsers fetched', populatedUsers.length, 'users');
        res.status(200).json({
            success: true,
            count: populatedUsers.length,
            nextCursor: lastDoc ? lastDoc.id : null,
            data: populatedUsers
        });
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
        // Fetch only users who are awaiting human review.
        // We keep the logic strict to avoid flooding the queue with brand‑new users
        // who haven't actually requested verification yet.
        const snapshot = await db.collection('users')
            .where('verificationStatus', '==', 'pending')
            .get();

        const pendingUsers = snapshot.docs
            .filter(doc => (doc.data().role || 'talent') !== 'admin')
            .map(doc => ({ id: doc.id, ...doc.data() }));

        const populatedUsers = await Promise.all(pendingUsers.map(async (u) => {
            let profileData = null;
            if (u.profile) {
                const pDoc = await db.collection('profiles').doc(u.profile).get();
                profileData = pDoc.exists ? { id: pDoc.id, ...pDoc.data() } : null;
            }
            // Provide both id and _id to satisfy older frontend expectations
            return { _id: u.id, ...u, profile: profileData };
        }));

        populatedUsers.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        res.status(200).json({ success: true, count: populatedUsers.length, data: populatedUsers });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Verify/Unverify user
// @route   PUT /api/admin/verify/:id
// @access  Private (Admin)
export const verifyUser = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = userDoc.data();
        const oldStatus = user.verificationStatus;
        
        let verificationStatus = user.verificationStatus;
        let isVerified = user.isVerified;

        const incomingStatus = typeof req.body === 'boolean' ? req.body : req.body.status;
        const incomingVerifStatus = req.body.verificationStatus;

        if (incomingVerifStatus) {
            verificationStatus = incomingVerifStatus;
            isVerified = incomingVerifStatus === 'verified';
        } else if (incomingStatus !== undefined) {
            isVerified = incomingStatus;
            verificationStatus = incomingStatus ? 'verified' : 'none';
        } else {
            isVerified = true;
            verificationStatus = 'verified';
        }

        await updateWithBackup('users', req.params.id, { 
            verificationStatus, 
            isVerified,
            updatedAt: new Date().toISOString()
        });

        if (verificationStatus === 'verified') {
          const profileSnap = await db.collection('profiles').where('user','==',req.params.id).limit(1).get()
          const userName = profileSnap.empty ? '' : profileSnap.docs[0].data().fullName
          await sendVerificationApprovedEmail({ userEmail: user.email, userName })
        }

        // Real-time update via Socket.io
        if (oldStatus !== verificationStatus) {
            try {
                const { getIO, sendNotification } = await import('../socket.js');
                const io = getIO();
                
                io.to(req.params.id).emit('verificationUpdate', {
                    status: verificationStatus,
                    isVerified: isVerified
                });

                const notification = {
                    type: 'verification',
                    title: isVerified ? 'Profile Verified!' : 'Verification Update',
                    message: isVerified 
                        ? 'Congratulations! Your profile has been verified. You now have full access to the platform.' 
                        : `Your verification status has been updated to ${verificationStatus}.`,
                    link: '/talent/verify',
                    createdAt: new Date().toISOString()
                };
                
                sendNotification(req.params.id, notification);
                
                await addWithBackup('notifications', {
                    user: req.params.id,
                    ...notification
                });

                const { broadcastAdminEvent } = await import('../socket.js');
                broadcastAdminEvent({
                    type: 'verificationUpdate',
                    user: {
                        id: req.params.id,
                        email: user.email,
                        role: user.role,
                        verificationStatus: verificationStatus,
                        isVerified: isVerified
                    }
                });
            } catch (socketErr) {
                console.error('Socket notification failed:', socketErr);
            }
        }

        res.status(200).json({ success: true, data: { id: req.params.id, ...user, verificationStatus, isVerified } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all projects with director info
// @route   GET /api/admin/projects
// @access  Private (Admin)
export const getAdminProjects = async (req, res) => {
    try {
        const limitVal = parseLimit(req.query.limit, 50, 100);
        const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : null;

        let query = db.collection('projects').orderBy('createdAt', 'desc').limit(limitVal);
        if (cursor) {
            const cursorDoc = await db.collection('projects').doc(cursor).get();
            if (!cursorDoc.exists) {
                return res.status(400).json({ message: 'Invalid cursor' });
            }
            query = query.startAfter(cursorDoc);
        }

        const snapshot = await query.get();
        const projects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const directorRefs = [...new Set(projects.map((project) => project.director).filter(Boolean))]
            .map((directorId) => db.collection('users').doc(directorId));
        const directorDocs = directorRefs.length > 0 ? await db.getAll(...directorRefs) : [];
        const directorMap = new Map(directorDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));
        const populatedProjects = projects.map((project) => {
            const directorData = directorMap.get(project.director);
            return {
                ...project,
                director: directorData ? { id: project.director, email: directorData.email, profile: directorData.profile } : null,
            };
        });

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        res.status(200).json({
            success: true,
            count: populatedProjects.length,
            nextCursor: lastDoc ? lastDoc.id : null,
            data: populatedProjects
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get detailed project info
// @route   GET /api/admin/projects/:id
// @access  Private (Admin)
export const getAdminProjectDetails = async (req, res) => {
    try {
        const projectDoc = await db.collection('projects').doc(req.params.id).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const project = { id: projectDoc.id, ...projectDoc.data() };

        // Populate director
        const directorDoc = await db.collection('users').doc(project.director).get();
        if (directorDoc.exists) {
            const dData = directorDoc.data();
            project.director = { id: directorDoc.id, email: dData.email, profile: dData.profile };
        }

        const appsSnapshot = await db.collection('applications').where('project', '==', req.params.id).get();
        const applications = await Promise.all(appsSnapshot.docs.map(async (doc) => {
            const app = { id: doc.id, ...doc.data() };
            const talentDoc = await db.collection('users').doc(app.talent).get();
            const talentData = talentDoc.data();
            let profileData = null;
            if (talentData.profile) {
                const pDoc = await db.collection('profiles').doc(talentData.profile).get();
                profileData = pDoc.exists ? { id: pDoc.id, ...pDoc.data() } : null;
            }
            return {
                ...app,
                talent: { id: talentDoc.id, email: talentData.email, role: talentData.role, profile: profileData }
            };
        }));

        applications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
        const projectRef = db.collection('projects').doc(req.params.id);
        const projectDoc = await projectRef.get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await updateWithBackup('projects', req.params.id, { status, updatedAt: new Date().toISOString() });
        res.status(200).json({ success: true, data: { id: projectDoc.id, ...projectDoc.data(), status } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete project (and related applications)
// @route   DELETE /api/admin/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res) => {
    try {
        const projectRef = db.collection('projects').doc(req.params.id);
        const projectDoc = await projectRef.get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const appsSnapshot = await db.collection('applications').where('project', '==', req.params.id).get();
        const batch = db.batch();
        appsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
        batch.delete(projectRef);
        await batch.commit();

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
        const userRef = db.collection('users').doc(req.params.id);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        await updateWithBackup('users', req.params.id, { role, updatedAt: new Date().toISOString() });
        res.status(200).json({ success: true, data: { id: userDoc.id, ...userDoc.data(), role } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete user and related data
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
export const deleteUser = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const batch = db.batch();

        // 1. Delete Profile(s)
        const profilesSnapshot = await db.collection('profiles').where('user', '==', req.params.id).get();
        profilesSnapshot.forEach(doc => batch.delete(doc.ref));

        // 2. Delete Applications (as talent)
        const appsSnapshot = await db.collection('applications').where('talent', '==', req.params.id).get();
        appsSnapshot.forEach(doc => batch.delete(doc.ref));

        // 3. Delete Projects (as director) and their Applications
        const projectsSnapshot = await db.collection('projects').where('director', '==', req.params.id).get();
        for (const pDoc of projectsSnapshot.docs) {
            const pAppsSnapshot = await db.collection('applications').where('project', '==', pDoc.id).get();
            pAppsSnapshot.forEach(doc => batch.delete(doc.ref));
            batch.delete(pDoc.ref);
        }

        // 4. Delete Messages (sent/received)
        const sentMessages = await db.collection('messages').where('sender', '==', req.params.id).get();
        sentMessages.forEach(doc => batch.delete(doc.ref));
        const receivedMessages = await db.collection('messages').where('receiver', '==', req.params.id).get();
        receivedMessages.forEach(doc => batch.delete(doc.ref));

        // 5. Delete Notifications
        const notesSnapshot = await db.collection('notifications').where('user', '==', req.params.id).get();
        notesSnapshot.forEach(doc => batch.delete(doc.ref));

        // 6. Delete User
        batch.delete(userRef);

        await batch.commit();

        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Global search across users and projects
// @route   GET /api/admin/search
// @access  Private (Admin)
export const searchGlobal = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return res.status(200).json({
                success: true,
                data: { users: [], projects: [] },
                meta: { truncated: { users: false, projects: false } }
            });
        }

        const searchTerm = query.trim();
        const normalizedTerm = searchTerm.toLowerCase();

        const exactUserDoc = await db.collection('users').doc(searchTerm).get();
        const exactProjectDoc = await db.collection('projects').doc(searchTerm).get();

        const usersSnapshot = await buildRangeSearch('users', 'email', searchTerm).get();
        const userDocs = [...usersSnapshot.docs];
        if (exactUserDoc.exists && !userDocs.some((doc) => doc.id === exactUserDoc.id)) {
            userDocs.unshift(exactUserDoc);
        }

        const profileIds = [...new Set(userDocs.map(doc => doc.data()?.profile).filter(Boolean))];
        const profileRefs = profileIds.map(id => db.collection('profiles').doc(id));
        const profileSnapshots = profileRefs.length > 0 ? await db.getAll(...profileRefs) : [];
        const profilesMap = new Map();
        profileSnapshots.forEach(doc => {
            if (doc.exists) profilesMap.set(doc.id, { id: doc.id, ...doc.data() });
        });

        const allUsers = userDocs.map(doc => {
            const userData = doc.data();
            const profileData = userData.profile ? profilesMap.get(userData.profile) : null;
            return { id: doc.id, _id: doc.id, ...userData, profile: profileData };
        });

        const matchedUsers = allUsers.filter(u => 
            (u.profile?.fullName || '').toLowerCase().includes(normalizedTerm) ||
            (u.email || '').toLowerCase().includes(normalizedTerm) ||
            u.id.toLowerCase().includes(normalizedTerm)
        ).slice(0, 10);

        const projectsSnapshot = await buildRangeSearch('projects', 'title', searchTerm).get();
        const projectDocs = [...projectsSnapshot.docs];
        if (exactProjectDoc.exists && !projectDocs.some((doc) => doc.id === exactProjectDoc.id)) {
            projectDocs.unshift(exactProjectDoc);
        }

        const matchedProjects = projectDocs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(p => (p.title || '').toLowerCase().includes(normalizedTerm))
            .slice(0, 10);

        res.status(200).json({
            success: true,
            data: {
                users: matchedUsers,
                projects: matchedProjects
            },
            meta: {
                truncated: {
                    users: usersSnapshot.size === MAX_GLOBAL_SEARCH_RESULTS,
                    projects: projectsSnapshot.size === MAX_GLOBAL_SEARCH_RESULTS,
                }
            }
        });
    } catch (err) {
        console.error('Global search error:', err);
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all media assets from Cloudinary
// @route   GET /api/admin/media
// @access  Private (Admin)
export const getMediaAssets = async (req, res) => {
    try {
        const { resource_type = 'auto', max_results = 50, next_cursor } = req.query;
        
        // Use Cloudinary search API or direct listing
        const result = await cloudinary.api.resources({
            resource_type: resource_type === 'auto' ? 'image' : resource_type, // Cloudinary API requires specific type or separate calls
            max_results,
            next_cursor,
            prefix: 'talentconnect/', // Match the folder in config
            type: 'upload'
        });

        // Also fetch videos if resource_type was auto
        let videos = [];
        if (resource_type === 'auto') {
            const videoResult = await cloudinary.api.resources({
                resource_type: 'video',
                max_results,
                prefix: 'talentconnect/',
                type: 'upload'
            });
            videos = videoResult.resources;
        }

        const allResources = [...result.resources, ...videos].sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
        );

        res.status(200).json({
            success: true,
            count: allResources.length,
            next_cursor: result.next_cursor,
            data: allResources
        });
    } catch (err) {
        console.error('Fetch media error:', err);
        res.status(400).json({ message: 'Failed to access media store: ' + err.message });
    }
};
