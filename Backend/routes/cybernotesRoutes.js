// routes/cybernotesRoutes.js
const express = require('express');
const router = express.Router();
const { createNote, getNotes, deleteNote } = require('../controllers/cybernotesController');
const multer = require('multer');
const path = require('path');

// Configure Multer storage for file uploads in the "uploads" folder.
// Ensure the "uploads" folder exists in your project root.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Use current timestamp plus original file extension for uniqueness
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.get('/', getNotes); // Fetch entries (cybernotes)
router.post('/', upload.single('noteFile'), createNote); // Save or update an entry (cybernote)
router.delete('/', deleteNote); // Delete an entry (cybernote)

module.exports = router;
