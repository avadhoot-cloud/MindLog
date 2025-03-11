require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Added this line
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const bucketRoute = require('./routes/bucketRoute');
const todoRoutes = require('./routes/todoRoutes');
const friendRoutes = require('./routes/friendRoutes');
const fantasiesRoutes = require('./routes/fantasiesRoutes.js');
const diaryRoutes = require('./routes/DiaryRoutes');
const quotesRoutes = require('./routes/quotesRoutes');
const moviesRoute = require('./routes/moviesRoute');
const passwordsRoutes = require('./routes/passwordsRoutes');
const cybernotesRoutes = require('./routes/cybernotesRoutes');

const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

// Middleware
app.use(cors(corsOptions)); // Use the custom CORS configuration
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bucketlist', bucketRoute);
app.use('/api/todo', todoRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/fantasies', fantasiesRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/movies', moviesRoute);
app.use('/api/passwords', passwordsRoutes);
app.use('/api/cybernotes', cybernotesRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
