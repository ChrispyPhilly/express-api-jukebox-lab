// server.js
require('dotenv').config();  // Add this line at the top of your file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const trackRoutes = require('./routes/tracks');

// Create the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/reactville-jukebox';  // Fallback to default URI if not found in .env

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Use routes
app.use('/api', trackRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});