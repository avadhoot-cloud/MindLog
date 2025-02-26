const db = require('../db');

// Get all fantasies
exports.getAllFantasies = async (req, res) => {
  const query = 'SELECT * FROM fantasies';
  try {
    const [results] = await db.promise().query(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching fantasies', error: err });
  }
};

// Add a new fantasy
exports.addFantasy = async (req, res) => {
  const { text } = req.body;

  // Validate input
  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Fantasy text is required' });
  }

  const query = 'INSERT INTO fantasies (fantasy) VALUES (?)';
  try {
    const [result] = await db.promise().query(query, [text]);
    res.status(201).json({
      id: result.insertId,
      fantasy: text,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error adding fantasy', error: err });
  }
};

// Delete a fantasy
exports.deleteFantasy = async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting fantasy with ID: ${id}`); // Debugging
  const query = 'DELETE FROM fantasies WHERE id = ?';
  try {
    await db.promise().query(query, [id]);
    console.log('Fantasy deleted successfully'); // Debugging
    res.status(200).json({ message: 'Fantasy deleted successfully' });
  } catch (err) {
    console.error('Error deleting fantasy:', err); // Debugging
    res.status(500).json({ message: 'Error deleting fantasy', error: err });
  }
};