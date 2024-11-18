require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const trackRoutes = require('./routes/tracks'); // Import the track routes

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/reactville-jukebox'; // Default to local database if no env variable


mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.use('/api', trackRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});