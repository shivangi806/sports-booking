const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Get bookings for a specific centre, sport, and date
router.get('/', async (req, res) => {
  const { centre, sport, date } = req.query;
  try {
    const bookings = await Booking.find({ centre, sport, date });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this query.' });
    }
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const { centre, sport, court, timeSlot, user, status, date } = req.body;
  try {
    const newBooking = new Booking({ centre, sport, court, timeSlot, user, status, date });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking removed and slot is now available.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
