const express = require('express');
const Track = require('../models/track'); 
const router = express.Router();

router.post('/tracks', async (req, res) => {
  try {
    const { title, artist } = req.body;

    if (!title || !artist) {
      return res.status(400).json({ message: 'Title and artist are required' });
    }

    const newTrack = new Track({ title, artist });
    
    await newTrack.save();
    
    res.status(201).json(newTrack);
  } catch (err) {
    console.error('Error creating track:', err);
    res.status(500).json({
      message: 'Internal server error, could not create track',
      error: err.message,
    });
  }
});

router.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (err) {
    console.error('Error fetching tracks:', err);
    res.status(500).json({
      message: 'Internal server error, could not retrieve tracks',
      error: err.message,
    });
  }
});

router.get('/tracks/:id', async (req, res) => {
  try {
    const trackId = req.params.id;
    const track = await Track.findById(trackId);

    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    res.status(200).json(track);
  } catch (err) {
    console.error('Error fetching track:', err);
    res.status(500).json({
      message: 'Internal server error, could not retrieve track',
      error: err.message,
    });
  }
});

router.put('/tracks/:id', async (req, res) => {
  try {
    const trackId = req.params.id;
    const { title, artist } = req.body;

    if (!title || !artist) {
      return res.status(400).json({ message: 'Title and artist are required' });
    }

    const updatedTrack = await Track.findByIdAndUpdate(
      trackId,
      { title, artist },
      { new: true } 
    );

    if (!updatedTrack) {
      return res.status(404).json({ message: 'Track not found' });
    }

    res.status(200).json(updatedTrack);
  } catch (err) {
    console.error('Error updating track:', err);
    res.status(500).json({
      message: 'Internal server error, could not update track',
      error: err.message,
    });
  }
});


router.delete('/tracks/:id', async (req, res) => {
  try {
    const trackId = req.params.id;
    const deletedTrack = await Track.findByIdAndDelete(trackId);

    if (!deletedTrack) {
      return res.status(404).json({ message: 'Track not found' });
    }

    res.status(200).json(deletedTrack);
  } catch (err) {
    console.error('Error deleting track:', err);
    res.status(500).json({
      message: 'Internal server error, could not delete track',
      error: err.message,
    });
  }
});

module.exports = router; 