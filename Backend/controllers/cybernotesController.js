// cybernotesController.js
const db = require('../db'); // Import your DB connection

// Create a new note
const createNote = (req, res) => {
  const { section, noteText } = req.body;
  const noteFile = req.file ? req.file.filename : null;

  db.query(
    'INSERT INTO cybernotes (section, noteText, file) VALUES (?, ?, ?)',
    [section, noteText, noteFile],
    (error, result) => {
      if (error) {
        console.error('Error saving note:', error);
        return res.status(500).json({ error: 'Error saving note' });
      }
      res.status(201).json({
        message: 'Note saved successfully!',
        data: {
          id: result.insertId,
          section,
          noteText,
          file: noteFile,
        },
      });
    }
  );
};

// Retrieve all notes
const getNotes = (req, res) => {
  db.query('SELECT * FROM cybernotes ORDER BY created_at DESC', (error, rows) => {
    if (error) {
      console.error('Error fetching notes:', error);
      return res.status(500).json({ error: 'Error fetching notes' });
    }
    res.json({ notes: rows });
  });
};

// Delete a note (using the note's id)
const deleteNote = (req, res) => {
  const { id } = req.body;

  db.query('DELETE FROM cybernotes WHERE id = ?', [id], (error) => {
    if (error) {
      console.error('Error deleting note:', error);
      return res.status(500).json({ error: 'Error deleting note' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  });
};

module.exports = {
  createNote,
  getNotes,
  deleteNote,
};
