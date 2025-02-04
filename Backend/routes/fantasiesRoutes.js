const express = require('express');
const {
  getAllFantasies,
  addFantasy,
} = require('../controllers/fantasiesController.js');

const router = express.Router();

// Get all fantasies
router.get('/', getAllFantasies);

// Add a new fantasy
router.post('/', addFantasy);

module.exports = router;
