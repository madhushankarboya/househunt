const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getUserBookings);
router.put('/:id/status', protect, authorize('owner'), updateBookingStatus);

module.exports = router;