import { db } from '../lib/firebaseAdmin.js';
import { addWithBackup, updateWithBackup } from '../lib/textBackup.js';
import { broadcastAdminEvent, sendNotification } from '../socket.js';

const SAFE_URL_PROTOCOLS = new Set(['http:', 'https:']);

const isSafeUrl = (value) => {
    if (typeof value !== 'string' || value.trim().length === 0) return false;
    try {
        const url = new URL(value);
        return SAFE_URL_PROTOCOLS.has(url.protocol) && url.hostname.length > 0;
    } catch {
        return false;
    }
};

const isSafeUrlOrEmpty = (value) => value === '' || isSafeUrl(value);

const sanitizeSocialLinks = (socialLinks) => {
    if (!socialLinks || typeof socialLinks !== 'object') return null;
    const allowedKeys = ['instagram', 'twitter', 'linkedin', 'website', 'imdb', 'wikipedia'];
    const sanitized = {};

    for (const key of allowedKeys) {
        const value = socialLinks[key];
        if (typeof value !== 'string' || value.trim() === '') continue;

        if (value.startsWith('http://') || value.startsWith('https://')) {
            if (!isSafeUrl(value)) continue;
        }

        sanitized[key] = value.trim();
    }

    return Object.keys(sanitized).length > 0 ? sanitized : null;
};

const sanitizePortfolioItems = (portfolio) => {
    if (!Array.isArray(portfolio)) return null;
    return portfolio
        .filter((item) => item && typeof item === 'object')
        .map((item) => {
            const sanitized = {};
            if (typeof item.type === 'string' && ['image', 'video'].includes(item.type)) {
                sanitized.type = item.type;
            }
            if (isSafeUrl(item.url)) {
                sanitized.url = item.url;
            }
            if (typeof item.title === 'string') {
                sanitized.title = item.title.trim();
            }
            if (typeof item.description === 'string') {
                sanitized.description = item.description.trim();
            }
            return sanitized.url ? sanitized : null;
        })
        .filter(Boolean);
};

const PROFILE_ALLOWED_FIELDS = new Set([
    'fullName', 'bio', 'location', 'mobile', 'skills', 'experienceYears',
    'talentCategory', 'physicalMetrics', 'showreelUrl', 'socialLinks',
    'privacySettings', 'companyName', 'industryType', 'previousProjects',
    'portfolio'
]);

const parseLimitAndCursor = (req, defaultLimit = 20, maxLimit = 100) => {
    const limitVal = Math.min(Math.max(1, parseInt(req.query.limit, 10) || defaultLimit), maxLimit);
    const cursor = typeof req.query.cursor === 'string' && req.query.cursor.length > 0 ? req.query.cursor : null;
    return { limitVal, cursor };
};

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
export const getMyProfile = async (req, res) => {
    try {
        const profileSnapshot = await db.collection('profiles').where('user', '==', req.user.id).limit(1).get();
        if (profileSnapshot.empty) {
            // Check if user is an admin and auto-generated without a profile
            const userDoc = await db.collection('users').doc(req.user.id).get();
            if (userDoc.exists && userDoc.data().role === 'admin') {
                 return res.status(200).json({ 
                     success: true, 
                     data: { fullName: 'Super Admin', _id: 'admin_profile', role: 'admin' } 
                 });
            }
            return res.status(404).json({ message: 'Profile not found' });
        }
        
        const profileData = profileSnapshot.docs[0].data();
        const profileId = profileSnapshot.docs[0].id;

        // Populate user data
        const userDoc = await db.collection('users').doc(profileData.user).get();
        const userData = userDoc.exists ? userDoc.data() : {};
        
        const profile = { 
            id: profileId, 
            ...profileData, 
            user: { 
                id: userDoc.id, 
                email: userData.email, 
                role: userData.role, 
                isVerified: userData.isVerified, 
                verificationStatus: userData.verificationStatus 
            } 
        };

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
        const profileSnapshot = await db.collection('profiles')
            .where('user', '==', req.user.id)
            .limit(1)
            .get();

        const updateData = { updatedAt: new Date().toISOString() };
        for (const [key, value] of Object.entries(req.body)) {
            if (!PROFILE_ALLOWED_FIELDS.has(key)) {
                console.warn('[SECURITY] Rejected unknown profile field:', key, 'from user:', req.user.id);
                continue;
            }

            if (key === 'showreelUrl') {
                if (!isSafeUrlOrEmpty(value)) {
                    console.warn('[SECURITY] Rejected unsafe showreelUrl for user:', req.user.id);
                    continue;
                }
                updateData.showreelUrl = value;
                continue;
            }

            if (key === 'socialLinks') {
                if (value && typeof value === 'object' && Object.keys(value).length === 0) {
                    updateData.socialLinks = {};
                    continue;
                }
                const sanitizedLinks = sanitizeSocialLinks(value);
                if (sanitizedLinks) {
                    updateData.socialLinks = sanitizedLinks;
                } else {
                    console.warn('[SECURITY] Rejected unsafe socialLinks for user:', req.user.id);
                }
                continue;
            }

            if (key === 'portfolio') {
                if (Array.isArray(value) && value.length === 0) {
                    updateData.portfolio = [];
                    continue;
                }
                const sanitizedPortfolio = sanitizePortfolioItems(value);
                if (sanitizedPortfolio) {
                    updateData.portfolio = sanitizedPortfolio;
                } else {
                    console.warn('[SECURITY] Rejected unsafe portfolio items for user:', req.user.id);
                }
                continue;
            }

            updateData[key] = value;
        }

        let profileData = { ...updateData };
        let profileId;

        if (profileSnapshot.empty) {
            profileData = {
                ...updateData,
                user: req.user.id,
                createdAt: new Date().toISOString(),
            };
            const docRef = await addWithBackup('profiles', profileData);
            profileId = docRef.id;
        } else {
            profileId = profileSnapshot.docs[0].id;
            await updateWithBackup('profiles', profileId, updateData);
            const updatedDoc = await db.collection('profiles').doc(profileId).get();
            profileData = updatedDoc.data();
        }

        res.status(200).json({ success: true, data: { id: profileId, ...profileData } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get profile by id
// @route   GET /api/profile/:id
// @access  Public
export const getProfileById = async (req, res) => {
    try {
        const profileDoc = await db.collection('profiles').doc(req.params.id).get();
        if (!profileDoc.exists) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        const profileData = profileDoc.data();

        // Populate user data
        const userDoc = await db.collection('users').doc(profileData.user).get();
        const userData = userDoc.exists ? userDoc.data() : {};

        res.status(200).json({ 
            success: true, 
            data: { 
                id: profileDoc.id, 
                ...profileData, 
                user: { id: userDoc.id, role: userData.role } 
            } 
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get profile by user id (first match)
// @route   GET /api/profile/by-user/:userId
// @access  Public
export const getProfileByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        let profileSnap = await db.collection('profiles').where('user', '==', userId).limit(1).get();
        let profileDoc;

        if (profileSnap.empty) {
            // Fallback: Check user document for profile link
            const userDoc = await db.collection('users').doc(userId).get();
            if (userDoc.exists && userDoc.data().profile) {
                profileDoc = await db.collection('profiles').doc(userDoc.data().profile).get();
            }
        } else {
            profileDoc = profileSnap.docs[0];
        }

        if (!profileDoc || !profileDoc.exists) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const profileData = profileDoc.data();
        const userDoc = await db.collection('users').doc(profileData.user || userId).get();
        const userData = userDoc.exists ? userDoc.data() : {};

        res.status(200).json({
            success: true,
            data: {
                id: profileDoc.id,
                ...profileData,
                user: { id: userDoc.id || userId, role: userData.role }
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all profiles (with filtering)
// @route   GET /api/profile
// @access  Public
export const getProfiles = async (req, res) => {
    try {
        const { talentCategory, location, skills, eyeColor, hairColor, minHeight, maxHeight } = req.query;
        const { limitVal, cursor } = parseLimitAndCursor(req);
        let query = db.collection('profiles').orderBy('createdAt', 'desc').limit(limitVal);

        if (talentCategory) {
            query = query.where('talentCategory', '==', talentCategory);
        }

        if (cursor) {
            const cursorDoc = await db.collection('profiles').doc(cursor).get();
            if (!cursorDoc.exists) {
                return res.status(400).json({ message: 'Invalid cursor' });
            }
            query = query.startAfter(cursorDoc);
        }
        
        // Note: Firestore doesn't support native RegEx or $in efficiently like Mongoose.
        // For simplicity and matching the old logic, we'll fetch then filter if needed, 
        // but for primary filters we use where.
        
        const snapshot = await query.get();
        let profiles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Manual filtering for fields Firestore where can't handle easily (like case-insensitive Regex)
        if (location) {
            const regex = new RegExp(location, 'i');
            profiles = profiles.filter(p => regex.test(p.location));
        }
        if (skills) {
            const skillList = skills.split(',');
            profiles = profiles.filter(p => p.skills && p.skills.some(s => skillList.includes(s)));
        }
        if (eyeColor) {
            profiles = profiles.filter(p => p.physicalMetrics?.eyeColor === eyeColor);
        }
        if (hairColor) {
            profiles = profiles.filter(p => p.physicalMetrics?.hairColor === hairColor);
        }
        if (minHeight) {
            profiles = profiles.filter(p => p.physicalMetrics?.height >= minHeight);
        }
        if (maxHeight) {
            profiles = profiles.filter(p => p.physicalMetrics?.height <= maxHeight);
        }

        // Populate user info for each profile
        const userRefs = [...new Set(profiles.map((profile) => profile.user).filter(Boolean))]
            .map((userId) => db.collection('users').doc(userId));
        const userDocs = userRefs.length > 0 ? await db.getAll(...userRefs) : [];
        const userMap = new Map(userDocs.map((doc) => [doc.id, doc.exists ? doc.data() : null]));

        const populatedProfiles = profiles.map((profile) => {
            const userData = userMap.get(profile.user) || {};
            return {
                ...profile,
                user: { id: profile.user, role: userData?.role }
            };
        });

        const nextCursor = snapshot.docs.length === limitVal ? snapshot.docs[snapshot.docs.length - 1].id : null;
        res.status(200).json({ success: true, count: populatedProfiles.length, nextCursor, data: populatedProfiles });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Export the current user's personal data
// @route   GET /api/profile/export-data
// @access  Private
export const exportMyData = async (req, res) => {
    try {
        const userId = req.user.id;
        const [
            userDoc,
            profileSnap,
            applicationsSnap,
            sentMessagesSnap,
            receivedMessagesSnap,
            notificationsSnap,
        ] = await Promise.all([
            db.collection('users').doc(userId).get(),
            db.collection('profiles').where('user', '==', userId).limit(1).get(),
            db.collection('applications').where('talent', '==', userId).get(),
            db.collection('messages').where('sender', '==', userId).get(),
            db.collection('messages').where('receiver', '==', userId).get(),
            db.collection('notifications').where('user', '==', userId).limit(100).get(),
        ]);

        const profileData = profileSnap.empty ? null : profileSnap.docs[0].data();
        const exportData = {
            exportedAt: new Date().toISOString(),
            requestedBy: userId,
            note: 'This is all personal data TalentConnect currently holds about you, provided for GDPR and DPDP compliance.',
            account: userDoc.exists ? {
                email: userDoc.data().email,
                role: userDoc.data().role,
                plan: userDoc.data().plan,
                verificationStatus: userDoc.data().verificationStatus,
                createdAt: userDoc.data().createdAt,
                authProvider: userDoc.data().authProvider,
            } : null,
            profile: profileData ? {
                fullName: profileData.fullName,
                bio: profileData.bio,
                location: profileData.location,
                skills: profileData.skills,
                talentCategory: profileData.talentCategory,
                portfolio: (profileData.portfolio || []).map((item) => ({
                    title: item.title,
                    type: item.type,
                    url: item.url,
                })),
                socialLinks: profileData.socialLinks,
                createdAt: profileData.createdAt,
            } : null,
            applications: applicationsSnap.docs.map((doc) => ({
                id: doc.id,
                projectId: doc.data().project,
                status: doc.data().status,
                createdAt: doc.data().createdAt,
            })),
            messagesSent: sentMessagesSnap.docs.map((doc) => ({
                id: doc.id,
                to: doc.data().receiver,
                content: doc.data().content,
                createdAt: doc.data().createdAt,
            })),
            messagesReceived: receivedMessagesSnap.docs.map((doc) => ({
                id: doc.id,
                from: doc.data().sender,
                content: doc.data().content,
                createdAt: doc.data().createdAt,
                read: doc.data().read,
            })),
            notifications: notificationsSnap.docs.map((doc) => ({
                id: doc.id,
                type: doc.data().type,
                title: doc.data().title,
                createdAt: doc.data().createdAt,
                read: doc.data().read,
            })),
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="my-talentconnect-data-${new Date().toISOString().split('T')[0]}.json"`);
        res.status(200).json(exportData);
        console.info('[GDPR] Data exported for user:', userId);
    } catch (err) {
        console.error('[GDPR] Export error:', err);
        res.status(500).json({ message: 'Data export failed. Please try again.' });
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

        const profileSnapshot = await db.collection('profiles').where('user', '==', req.user.id).limit(1).get();
        if (profileSnapshot.empty) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const profileId = profileSnapshot.docs[0].id;
        const profileData = profileSnapshot.docs[0].data();

        // File is uploaded to Cloudinary via multer storage middleware
        const fileUrl = req.file.path;
        const { type, title, description, idType, membershipId, associationName } = req.body; // explicit allowlist

        const updateData = {};

        if (type === 'profilePicture') {
            updateData.profilePicture = fileUrl;
        } else if (type === 'portfolio') {
            const currentPortfolio = profileData.portfolio || [];
            const MAX_PORTFOLIO_ITEMS = 20;

            if (currentPortfolio.length >= MAX_PORTFOLIO_ITEMS) {
                return res.status(400).json({
                    message: `Portfolio limit reached. Maximum ${MAX_PORTFOLIO_ITEMS} items allowed. Remove an existing item to add a new one.`,
                });
            }

            const portfolio = profileData.portfolio || [];
            portfolio.push({
                type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
                url: fileUrl,
                title: title || 'Untitled',
                description: description || ''
            });
            updateData.portfolio = portfolio;
        } else if (['idFile', 'membershipCard', 'videoSelfie'].includes(type)) {
            const vs = profileData.verificationState || {};
            
            if (type === 'idFile') {
                vs.idFileUrl = fileUrl;
                vs.idType = idType;
            } else if (type === 'membershipCard') {
                vs.membershipCardUrl = fileUrl;
                vs.membershipId = membershipId;
                vs.associationName = associationName;
            } else if (type === 'videoSelfie') {
                vs.videoSelfieUrl = fileUrl;
            }
            updateData.verificationState = vs;
        }

        await updateWithBackup('profiles', profileId, updateData);
        res.status(200).json({ success: true, data: { ...profileData, ...updateData } });
    } catch (err) {
        console.error('Upload Error:', {
            message: err?.message,
            stack: err?.stack,
            code: err?.code,
            cloudinary: err?.error?.message || err?.error,
        });
        const status = err instanceof Error && err.name === 'MulterError' ? 400 : 500;
        res.status(status).json({ message: 'Upload failed', detail: err.message || 'Unknown error' });
    }
};

// @desc    Submit profile for verification (sets status to 'pending')
// @route   POST /api/profile/submit-verification
// @access  Private
export const submitForVerification = async (req, res) => {
    try {
        const userDoc = await db.collection('users').doc(req.user.id).get();
        if (!userDoc.exists) return res.status(404).json({ message: 'User not found' });

        // verificationStatus is always forced to 'pending' here, never from req.body
        await updateWithBackup('users', req.user.id, {
            verificationStatus: 'pending',
            isVerified: false
        });

        // Notify admins and emit realtime event
        const adminsSnapshot = await db.collection('users').where('role', '==', 'admin').get();
        
        const adminNotifications = adminsSnapshot.docs.map(async (adminDoc) => {
            const notificationDoc = {
                user: adminDoc.id,
                type: 'verification',
                title: 'Verification Requested',
                message: `${userDoc.data().email} submitted verification`,
                link: '/admin/verifications',
                createdAt: new Date().toISOString()
            };
            const noteRef = await addWithBackup('notifications', notificationDoc);
            return { id: noteRef.id, ...notificationDoc };
        });

        const adminNotes = await Promise.all(adminNotifications);
        adminNotes.forEach((note) => sendNotification(note.user, note));
        
        broadcastAdminEvent({
            type: 'verification_requested',
            user: userDoc.data().email,
            userId: userDoc.id,
            createdAt: new Date().toISOString(),
        });

        res.status(200).json({ success: true, message: 'Profile submitted for verification.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
