const express = require('express');
const {
  getAllQuotes,
  addQuote,
  deleteQuote,
} = require('../controllers/quotesController.js');

const router = express.Router();

// Get all quotes
router.get('/', getAllQuotes);

// Add a new quote
router.post('/', addQuote);

// Delete a quote
router.delete('/:id', deleteQuote);

module.exports = router;