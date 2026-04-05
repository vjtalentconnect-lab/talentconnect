/* SCHEMA REFERENCE ONLY — Not used for production queries.
   Production data lives in Firestore. See server/ARCHITECTURE.md.
   These models exist as documentation and for potential future use. */
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fullName: {
            type: String,
            required: [true, 'Please provide your full name'],
        },
        bio: {
            type: String,
            maxlength: [500, 'Bio cannot be more than 500 characters'],
        },
        profilePicture: {
            type: String,
            default: 'no-photo.jpg',
        },
        location: {
            type: String,
        },
        mobile: {
            type: String,
        },
        socialLinks: {
            instagram: String,
            twitter: String,
            linkedin: String,
            website: String,
            imdb: String,
            wikipedia: String,
        },
        // Verification Data
        verificationState: {
            idType: String,
            idFileUrl: String,
            membershipCardUrl: String,
            videoSelfieUrl: String,
            imdbUrl: String,
            wikipediaUrl: String,
            showreelUrl: String,
            membershipId: String,
            associationName: String,
            websiteUrl: String,
        },
        // Talent specific fields
        skills: [String],
        experienceYears: Number,
        talentCategory: {
            type: String,
            enum: ['actor', 'artist', 'model', 'musician', 'video_editor', 'dancer', 'content_creator', 'cinematographer', 'voice_over', 'other'],
        },
        physicalMetrics: {
            height: String,
            weight: String,
            eyeColor: String,
            hairColor: String,
        },
        portfolio: [
            {
                type: {
                    type: String,
                    enum: ['image', 'video'],
                },
                url: String,
                title: String,
                description: String,
            },
        ],
        showreelUrl: String,
        // Director specific fields
        companyName: String,
        previousProjects: [String],
        // Privacy controls
        privacySettings: {
            profileSearchable: { type: Boolean, default: true },
            showContactDetails: { type: Boolean, default: true },
            showPortfolioPublic: { type: Boolean, default: true },
            allowDirectMessages: { type: Boolean, default: true },
        },
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
