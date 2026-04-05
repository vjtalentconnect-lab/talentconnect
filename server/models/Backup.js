/* SCHEMA REFERENCE ONLY — Not used for production queries.
   Production data lives in Firestore. See server/ARCHITECTURE.md.
   These models exist as documentation and for potential future use. */
import mongoose from 'mongoose';

const backupSchema = new mongoose.Schema(
    {
        collectionName: { type: String, required: true, index: true },
        docId: { type: String, required: true, index: true },
        data: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    {
        timestamps: true,
    }
);

backupSchema.index({ collectionName: 1, docId: 1 }, { unique: true });

const Backup = mongoose.model('Backup', backupSchema);

export default Backup;
