const express = require('express');
const {
  getAllFantasies,
  addFantasy,
  deleteFantasy,
} = require('../controllers/fantasiesController.js');

const router = express.Router();

// Get all fantasies
router.get('/', getAllFantasies);

// Add a new fantasy
router.post('/', addFantasy);

// Delete a fantasy
router.delete('/:id', deleteFantasy);

module.exports = router;