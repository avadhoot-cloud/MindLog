const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup Controller
const signup = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, password) VALUES (?, ?)';
    db.query(query, [name, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating user', error: err });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login Controller
const login = (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  const query = 'SELECT * FROM users WHERE name = ?';
  db.query(query, [name], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, name: user.name }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};

module.exports = { signup, login };
