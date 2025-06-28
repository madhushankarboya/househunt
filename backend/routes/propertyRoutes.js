// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Verify controller functions exist before using them
if (typeof getAllProperties !== 'function') {
  throw new Error('getAllProperties is not a function!');
}

router.route('/')
  .get(getAllProperties)
  .post(
    protect,
    authorize('owner', 'admin'),
    upload.array('images'),
    createProperty
  );

router.route('/:id')
  .get(getPropertyById)
  .put(protect, authorize('owner', 'admin'), updateProperty)
  .delete(protect, authorize('owner', 'admin'), deleteProperty);

module.exports = router;