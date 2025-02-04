const db = require('../db'); // Import your DB connection

const getEntries = (req, res) => {
  const { month, year } = req.query;

  db.query(
    'SELECT * FROM diary WHERE MONTH(entry_date) = ? AND YEAR(entry_date) = ?',
    [month, year],
    (error, rows) => {
      if (error) {
        console.error('Error fetching entries:', error);
        return res.status(500).json({ error: 'Error fetching entries' });
      }

      const entries = rows.reduce((acc, row) => {
        acc[new Date(row.entry_date).getDate()] = row.content;
        return acc;
      }, {});

      db.query(
        `SELECT MAX(streak) AS streak FROM (
          SELECT COUNT(*) AS streak FROM (
            SELECT entry_date, 
                   @row := IF(@prev + INTERVAL 1 DAY = entry_date, @row, 0) + 1 streak, 
                   @prev := entry_date 
            FROM (SELECT entry_date FROM diary ORDER BY entry_date) AS t, (SELECT @row := 0, @prev := NULL) AS vars
          ) AS streaks
        ) AS result;`,
        (error, streakResult) => {
          if (error) {
            console.error('Error calculating streak:', error);
            return res.status(500).json({ error: 'Error calculating streak' });
          }

          const streak = (streakResult[0] && streakResult[0].streak) || 0;
          res.json({ entries, streak });
        }
      );
    }
  );
};

const saveEntry = (req, res) => {
  const { date, content } = req.body;

  db.query(
    'INSERT INTO diary (entry_date, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = ?',
    [date, content, content],
    (error) => {
      if (error) {
        console.error('Error saving entry:', error);
        return res.status(500).json({ error: 'Error saving entry' });
      }
      res.status(200).json({ message: 'Entry saved successfully' });
    }
  );
};

const deleteEntry = (req, res) => {
  const { date } = req.body;

  db.query('DELETE FROM diary WHERE entry_date = ?', [date], (error) => {
    if (error) {
      console.error('Error deleting entry:', error);
      return res.status(500).json({ error: 'Error deleting entry' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
};

module.exports = {
  getEntries,
  saveEntry,
  deleteEntry,
};
