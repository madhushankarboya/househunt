const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');
const ErrorResponse = require('../utils/error-handler');
const asyncHandler = require('../middleware/async');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res, next) => {
  const { propertyId, message } = req.body;
  const userId = req.user.id;

  const property = await Property.findById(propertyId);
  if (!property) {
    return next(new ErrorResponse('Property not found', 404));
  }

  const booking = await Booking.create({
    propertyId,
    userId,
    ownerId: property.userID,
    message,
    status: 'pending'
  });

  res.status(201).json({
    success: true,
    data: booking
  });
});

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getUserBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ userId: req.user.id })
    .populate('propertyId')
    .populate('ownerId');

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Owner
exports.updateBookingStatus = asyncHandler(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse('Booking not found', 404));
  }

  if (booking.ownerId.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized', 403));
  }

  booking.status = req.body.status;
  await booking.save();

  res.status(200).json({
    success: true,
    data: booking
  });
});