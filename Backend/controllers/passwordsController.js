const db = require('../db');
const crypto = require('crypto');
require('dotenv').config();

// 1. Generate a consistent 32-byte key
const ENCRYPTION_KEY = crypto.createHash('sha256')
  .update(process.env.ENCRYPTION_KEY || 'default-secret-key-at-least-32-chars')
  .digest(); // Always produces 32-byte buffer

const IV_LENGTH = 16; // AES block size

// Encrypt function (updated)
function encrypt(text) {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (err) {
    console.error('Encryption error:', err);
    throw new Error('Encryption failed');
  }
}

// Decrypt function (updated)
function decrypt(text) {
  try {
    const [ivHex, encryptedText] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Decryption error:', err);
    throw new Error('Decryption failed');
  }
}

// Get all passwords
exports.getAllPasswords = async (req, res) => {
  const query = 'SELECT * FROM passwords';
  try {
    const [results] = await db.promise().query(query);
    const decryptedResults = results.map((row) => ({
      ...row,
      password: decrypt(row.password),
    }));
    res.status(200).json(decryptedResults);
  } catch (err) {
    console.error('Error fetching passwords:', err);
    res.status(500).json({ message: 'Error fetching passwords', error: err.message });
  }
};

// Add a new password
exports.addPassword = async (req, res) => {
  const { passName, username, password } = req.body;
  if (!passName || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const encryptedPassword = encrypt(password);
  const query = 'INSERT INTO passwords (passName, username, password) VALUES (?, ?, ?)';
  try {
    const [result] = await db.promise().query(query, [passName, username, encryptedPassword]);
    res.status(201).json({
      id: result.insertId,
      passName,
      username,
      password: password, // Return the original password (not encrypted)
    });
  } catch (err) {
    console.error('Error adding password:', err);
    res.status(500).json({ message: 'Error adding password', error: err.message });
  }
};

// Delete a password
exports.deletePassword = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM passwords WHERE id = ?';
  try {
    await db.promise().query(query, [id]);
    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (err) {
    console.error('Error deleting password:', err);
    res.status(500).json({ message: 'Error deleting password', error: err.message });
  }
};