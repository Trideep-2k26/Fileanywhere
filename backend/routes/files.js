const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/File');
const authMiddleware = require('../middleware/authMiddleware');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
    cb(null, `${Date.now()}-${sanitizedName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|jpg|jpeg|png|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('File type not supported'));
  },
});

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      size: req.file.size,
      userId: req.user.userId,
    });
    await file.save();
    res.json({ message: 'File uploaded', file });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    console.error('Fetch files error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    console.log('=== DELETE REQUEST START ===');
    console.log('Delete request received for file ID:', req.params.id);
    console.log('User ID from token:', req.user.userId);
    console.log('Request headers:', req.headers);
    

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('Invalid file ID format');
      return res.status(400).json({ message: 'Invalid file ID format' });
    }
    
  
    console.log('Searching for file in database...');
    const file = await File.findOne({ _id: req.params.id, userId: req.user.userId });
    
    if (!file) {
      console.warn('File not found or user mismatch');
      console.log('Searching without userId filter...');
      const fileAnyUser = await File.findById(req.params.id);
      if (fileAnyUser) {
        console.log('File exists but belongs to different user:', fileAnyUser.userId);
      } else {
        console.log('File does not exist in database at all');
      }
      return res.status(404).json({ message: 'File not found or you do not have permission to delete this file' });
    }

    console.log('File found:', {
      id: file._id,
      filename: file.filename,
      path: file.path,
      userId: file.userId
    });

   
    const filePath = path.join(__dirname, '..', 'uploads', path.basename(file.path));
    console.log('Constructed file path:', filePath);
    console.log('File exists on disk:', fs.existsSync(filePath));


    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log('File deleted from disk successfully');
      } catch (fsError) {
        console.error('Error deleting file from disk:', fsError);
     
      }
    } else {
      console.warn('File not found on disk, continuing with database deletion');
    }

    console.log('Deleting from database...');
    const deleteResult = await File.findByIdAndDelete(req.params.id);
    console.log('Database deletion result:', deleteResult ? 'Success' : 'Failed');

    console.log('=== DELETE REQUEST SUCCESS ===');
    res.json({ message: 'File deleted successfully' });
    
  } catch (err) {
    console.error('=== DELETE REQUEST ERROR ===');
    console.error('Delete error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;