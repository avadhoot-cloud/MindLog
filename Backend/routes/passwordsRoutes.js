const express = require('express');
const {
  getAllPasswords,
  addPassword,
  deletePassword,
} = require('../controllers/passwordsController.js');

const router = express.Router();

// Get all passwords
router.get('/', getAllPasswords);

// Add a new password
router.post('/', addPassword);

// Delete a password
router.delete('/:id', deletePassword);

module.exports = router;