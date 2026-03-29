import mongoose from 'mongoose';
import { db } from './firebaseAdmin.js';
import Backup from '../models/Backup.js';

// Persist a Firestore write into MongoDB as a lightweight backup.
const backupToMongo = async (collection, docId, data) => {
    if (mongoose.connection.readyState !== 1) return; // only run when Mongo is connected
    try {
        await Backup.findOneAndUpdate(
            { collectionName: collection, docId },
            { collectionName: collection, data, updatedAt: new Date() },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    } catch (err) {
        console.error(`Backup failure for ${collection}/${docId}:`, err.message);
    }
};

export const addWithBackup = async (collection, data) => {
    const docRef = await db.collection(collection).add(data);
    backupToMongo(collection, docRef.id, data);
    return docRef;
};

export const setWithBackup = async (collection, docId, data, options = { merge: true }) => {
    await db.collection(collection).doc(docId).set(data, options);
    backupToMongo(collection, docId, data);
};

export const updateWithBackup = async (collection, docId, data) => {
    await db.collection(collection).doc(docId).update(data);
    backupToMongo(collection, docId, data);
};

export const batchUpdateWithBackup = async (collection, docs) => {
    const batch = db.batch();
    docs.forEach(({ id, data }) => {
        batch.update(db.collection(collection).doc(id), data);
    });
    await batch.commit();
    docs.forEach(({ id, data }) => backupToMongo(collection, id, data));
};
