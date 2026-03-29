import { db } from '../lib/firebaseAdmin.js';
import { addWithBackup, updateWithBackup } from '../lib/textBackup.js';
import { broadcastAdminEvent, sendNotification } from '../socket.js';

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

        let profileData = { ...req.body, updatedAt: new Date().toISOString() };
        let profileId;

        if (profileSnapshot.empty) {
            profileData.user = req.user.id;
            profileData.createdAt = new Date().toISOString();
            const docRef = await addWithBackup('profiles', profileData);
            profileId = docRef.id;
        } else {
            profileId = profileSnapshot.docs[0].id;
            const existingData = profileSnapshot.docs[0].data();
            
            // Prepare update data to handle nested objects correctly
            // Firestore merged update handles nested fields if you provide paths or just merge manually
            const updateData = { ...req.body, updatedAt: new Date().toISOString() };

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
                user: { id: userDoc.id, email: userData.email, role: userData.role } 
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
        let query = db.collection('profiles');

        if (talentCategory) {
            query = query.where('talentCategory', '==', talentCategory);
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
        const populatedProfiles = await Promise.all(profiles.map(async (p) => {
            const userDoc = await db.collection('users').doc(p.user).get();
            const userData = userDoc.exists ? userDoc.data() : {};
            return {
                ...p,
                user: { id: userDoc.id, email: userData.email, role: userData.role }
            };
        }));

        res.status(200).json({ success: true, count: populatedProfiles.length, data: populatedProfiles });
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

        const profileSnapshot = await db.collection('profiles').where('user', '==', req.user.id).limit(1).get();
        if (profileSnapshot.empty) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const profileId = profileSnapshot.docs[0].id;
        const profileData = profileSnapshot.docs[0].data();

        // File is uploaded to Cloudinary via multer storage middleware
        const fileUrl = req.file.path;
        const { type } = req.body; // 'profilePicture' or 'portfolio'

        const updateData = {};

        if (type === 'profilePicture') {
            updateData.profilePicture = fileUrl;
        } else if (type === 'portfolio') {
            const portfolio = profileData.portfolio || [];
            portfolio.push({
                type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
                url: fileUrl,
                title: req.body.title || 'Untitled',
                description: req.body.description || ''
            });
            updateData.portfolio = portfolio;
        } else if (['idFile', 'membershipCard', 'videoSelfie'].includes(type)) {
            const vs = profileData.verificationState || {};
            
            if (type === 'idFile') {
                vs.idFileUrl = fileUrl;
                vs.idType = req.body.idType;
            } else if (type === 'membershipCard') {
                vs.membershipCardUrl = fileUrl;
                vs.membershipId = req.body.membershipId;
                vs.associationName = req.body.associationName;
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
