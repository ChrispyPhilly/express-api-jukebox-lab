const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
const trackRoutes = require('./routes/tracks');

// Create the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/reactville-jukebox', {
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