import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';
import { cloudinary } from '../config/cloudinary.js';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo'
]);

const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB for images

const memStorage = multer.memoryStorage();

const upload = multer({
  storage: memStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    const declaredType = file.mimetype.toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(declaredType)) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'File type not allowed'));
    }
    cb(null, true);
  }
});

// Middleware that runs after multer: verify magic bytes, enforce image size, upload to Cloudinary
export const verifyAndUpload = async (req, res, next) => {
  if (!req.file) return next();
  try {
    const detected = await fileTypeFromBuffer(req.file.buffer);
    if (!detected || !ALLOWED_MIME_TYPES.has(detected.mime)) {
      return res.status(400).json({ message: 'File content does not match a permitted type' });
    }
    if (detected.mime.startsWith('image/') && req.file.buffer.length > MAX_IMAGE_SIZE) {
      return res.status(400).json({ message: 'Image files must be under 10MB' });
    }

    // Log what fields we received for debugging
    console.log('[Upload] Received fields:', JSON.stringify(req.body));
    console.log('[Upload] File mimetype:', req.file.mimetype);

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'talentconnect', resource_type: 'auto', transformation: [{ quality: 'auto', fetch_format: 'auto' }] },
        (err, result) => err ? reject(err) : resolve(result)
      );
      stream.end(req.file.buffer);
    });

    req.file.path = uploadResult.secure_url;
    req.file.cloudinaryId = uploadResult.public_id;
    return next();
  } catch (err) {
    console.error('Upload verification error:', err);
    return res.status(500).json({ message: 'Upload failed' });
  }
};

export default upload;
