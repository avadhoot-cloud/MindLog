const db = require('../db');

// Get all friends and crushes
exports.getAllFriends = async (req, res) => {
  const query = 'SELECT * FROM friends_and_crushes';
  try {
    const [results] = await db.promise().query(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving friends and crushes', error: err });
  }
};

// Get a friend or crush by ID
exports.getFriendById = async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM friends_and_crushes WHERE id = ?';
  try {
    const [results] = await db.promise().query(query, [id]);
    if (results.length === 0) {
      res.status(404).json({ message: 'Friend or crush not found' });
    } else {
      res.status(200).json(results[0]);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving friend/crush', error: err });
  }
};

// Create a new friend or crush
exports.createFriend = async (req, res) => {
  const { name, type, description } = req.body;
  const query = 'INSERT INTO friends_and_crushes (name, type, description) VALUES (?, ?, ?)';
  try {
    const [result] = await db.promise().query(query, [name, type, description]);
    res.status(201).json({
      id: result.insertId,
      name,
      type,
      description,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating friend/crush', error: err });
  }
};

// Update a friend or crush
exports.updateFriend = async (req, res) => {
  const { id } = req.params;
  const { name, type, description } = req.body;
  const query = 'UPDATE friends_and_crushes SET name = ?, type = ?, description = ? WHERE id = ?';
  try {
    const [result] = await db.promise().query(query, [name, type, description, id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Friend or crush not found' });
    } else {
      res.status(200).json({ id, name, type, description });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating friend/crush', error: err });
  }
};

// Delete a friend or crush
exports.deleteFriend = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM friends_and_crushes WHERE id = ?';
  try {
    const [result] = await db.promise().query(query, [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Friend or crush not found' });
    } else {
      res.status(204).json({ message: 'Friend or crush deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting friend/crush', error: err });
  }
};
