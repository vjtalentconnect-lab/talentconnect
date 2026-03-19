import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        talent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['applied', 'shortlisted', 'auditioning', 'rejected', 'selected'],
            default: 'applied',
        },
        auditionScheduled: {
            type: Boolean,
            default: false,
        },
        auditionDate: {
            type: Date,
        },
        auditionLocation: {
            type: String, // Could be physical location or virtual meeting link
        },
        auditionNotes: {
            type: String,
            maxlength: [500, 'Audition notes cannot be more than 500 characters'],
        },
        videoSubmissionUrl: {
            type: String, // URL to uploaded audition video
        },
        note: {
            type: String,
            maxlength: [200, 'Note cannot be more than 200 characters'],
        },
    },
    {
        timestamps: true,
    }
);

// Prevent user from applying to the same project twice
applicationSchema.index({ project: 1, talent: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
