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
