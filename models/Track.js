const express = require('express');
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
});

const Track = mongoose.model('Track', trackSchema);

const router = express.Router();

router.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/tracks', async (req, res) => {
  const { title, artist } = req.body;
  const newTrack = new Track({ title, artist });

  try {
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;