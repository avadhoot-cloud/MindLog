const db = require('../db');

// Get all movies
exports.getAllMovies = async (req, res) => {
  const query = 'SELECT * FROM movies_list';
  try {
    const [results] = await db.promise().query(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies', error: err });
  }
};

// Add a new movie
exports.addMovie = async (req, res) => {
  const { title, genre, rating, release_year } = req.body;

  // Validate input
  if (!title || !genre || !rating || !release_year) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO movies_list (title, genre, rating, release_year) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await db.promise().query(query, [title, genre, rating, release_year]);
    res.status(201).json({
      id: result.insertId,
      title,
      genre,
      rating,
      release_year,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error adding movie', error: err });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM movies_list WHERE id = ?';
  try {
    await db.promise().query(query, [id]);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting movie', error: err });
  }
};