const db = require('../db');

// Get all quotes
exports.getAllQuotes = async (req, res) => {
  const query = 'SELECT * FROM motivational_quotes';
  try {
    const [results] = await db.promise().query(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quotes', error: err });
  }
};

// Add a new quote
exports.addQuote = async (req, res) => {
  const { quote, author } = req.body;

  // Validate input
  if (!quote || !author || quote.trim() === '' || author.trim() === '') {
    return res.status(400).json({ message: 'Quote and author are required' });
  }

  const query = 'INSERT INTO motivational_quotes (quote, author) VALUES (?, ?)';
  try {
    const [result] = await db.promise().query(query, [quote, author]);
    res.status(201).json({
      id: result.insertId,
      quote,
      author,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error adding quote', error: err });
  }
};

// Delete a quote
exports.deleteQuote = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM motivational_quotes WHERE id = ?';
  try {
    await db.promise().query(query, [id]);
    res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting quote', error: err });
  }
};