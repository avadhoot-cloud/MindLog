const express = require('express');
const {
  getAllMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/moviesController.js');

const router = express.Router();

// Get all movies
router.get('/', getAllMovies);

// Add a new movie
router.post('/', addMovie);

// Delete a movie
router.delete('/:id', deleteMovie);

module.exports = router;