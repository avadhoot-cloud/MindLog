const express = require('express');
const router = express.Router();
const { getEntries, saveEntry, deleteEntry } = require('../controllers/DiaryController');

// Routes
router.get('/', getEntries); // Fetch entries
router.post('/', saveEntry); // Save or update an entry
router.delete('/', deleteEntry); // Delete an entry

module.exports = router;
