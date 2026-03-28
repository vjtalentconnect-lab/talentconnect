import multer from 'multer';
import { storage } from '../config/cloudinary.js';

// Allow images & video up to ~150MB; Cloudinary handles resource_type:auto
const upload = multer({
  storage,
  limits: { fileSize: 150 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image or video files are allowed'));
    }
  },
});

export default upload;
