import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadConfig } from '../config/upload.js';

// Ensure uploads directory exists
if (!fs.existsSync(uploadConfig.path)) {
  fs.mkdirSync(uploadConfig.path, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadConfig.path);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  if (!uploadConfig.allowedTypes.includes(file.mimetype)) {
    return cb(new Error('File type not allowed'), false);
  }
  cb(null, true);
};

// Create multer upload instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: uploadConfig.maxSize,
    files: uploadConfig.maxFiles
  }
});

// Error handling middleware for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: `File too large. Maximum size is ${uploadConfig.maxSize / (1024 * 1024)}MB` 
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        message: `Too many files. Maximum is ${uploadConfig.maxFiles} files` 
      });
    }
    return res.status(400).json({ message: err.message });
  }
  
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};
