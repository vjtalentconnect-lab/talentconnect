import { storage } from '../lib/firebaseAdmin.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads a file buffer to Firebase Storage and returns the public URL.
 * @param {Buffer} buffer - The file buffer to upload.
 * @param {string} originalName - The original name of the file.
 * @param {string} folder - The folder in the storage bucket.
 * @returns {Promise<string>} - The public URL of the uploaded file.
 */
export const uploadToFirebase = async (buffer, originalName, folder = 'uploads') => {
    const bucket = storage.bucket();
    const fileName = `${folder}/${uuidv4()}_${originalName}`;
    const file = bucket.file(fileName);

    await file.save(buffer, {
        metadata: {
            contentType: 'auto', // Multer should provide this, but Firebase can guess
        },
        public: true,
    });

    // Construct the public URL
    // Format: https://storage.googleapis.com/[BUCKET_NAME]/[FILE_NAME]
    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};

/**
 * Deletes a file from Firebase Storage.
 * @param {string} fileUrl - The public URL of the file to delete.
 */
export const deleteFromFirebase = async (fileUrl) => {
    try {
        const bucket = storage.bucket();
        // Extract the file path from the URL
        // Example URL: https://storage.googleapis.com/project-id.appspot.com/uploads/uuid_name.jpg
        const baseUrl = `https://storage.googleapis.com/${bucket.name}/`;
        if (fileUrl.startsWith(baseUrl)) {
            const filePath = fileUrl.replace(baseUrl, '');
            await bucket.file(filePath).delete();
        }
    } catch (error) {
        console.error('Error deleting file from Firebase Storage:', error);
    }
};
