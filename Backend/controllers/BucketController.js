const db = require('../db'); // Importing the database connection

// Controller for handling bucket list operations

// Get all items
const getAllItems = (req, res) => {
  db.query('SELECT * FROM bucketlist', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving items', error: err });
    }
    res.json(results); // Respond with the list of items
  });
};

// Add a new item
const addItem = (req, res) => {
  const { item, status } = req.body;

  if (!item) {
    return res.status(400).json({ message: 'Item is required' });
  }

  db.query(
    'INSERT INTO bucketlist (item, status) VALUES (?, ?)',
    [item, status || 'Pending'],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error adding item', error: err });
      }
      res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
    }
  );
};

// Update the status of an item
const updateItemStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  db.query(
    'UPDATE bucketlist SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating item', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item status updated successfully' });
    }
  );
};

// Update the status of an item and the item name
const updateItem = (req, res) => {
    const { id } = req.params;
    const { item, status } = req.body;
  
    if (!item || !status) {
      return res.status(400).json({ message: 'Item and status are required' });
    }
  
    db.query(
      'UPDATE bucketlist SET item = ?, status = ? WHERE id = ?',
      [item, status, id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating item', error: err });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item updated successfully' });
      }
    );
  };
  

// Delete an item
const deleteItem = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM bucketlist WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting item', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  });
};

module.exports = { getAllItems, addItem, updateItemStatus, deleteItem , updateItem};
