import multer from 'multer';

// Use memory storage for Firebase uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
