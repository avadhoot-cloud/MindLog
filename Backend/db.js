const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your MySQL username
  password: 'omg oh my god', // Update with your MySQL password
  database: 'mindlog', // Update with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
