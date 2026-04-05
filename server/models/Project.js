/* SCHEMA REFERENCE ONLY — Not used for production queries.
   Production data lives in Firestore. See server/ARCHITECTURE.md.
   These models exist as documentation and for potential future use. */
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        director: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please provide a project title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a project description'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            enum: ['Film', 'Advertisement', 'Music Video', 'Web Series', 'Short Film', 'Theatre', 'Other'],
        },
        requirements: [String],
        budget: {
            type: String,
            default: 'Negotiable',
        },
        location: {
            type: String,
            required: [true, 'Please provide a location'],
        },
        deadline: {
            type: Date,
            required: [true, 'Please provide a deadline'],
        },
        status: {
            type: String,
            enum: ['open', 'closed', 'draft'],
            default: 'open',
        },
        projectImage: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
