require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const bookingRoutes = require('./routes/bookingRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');

// Better route debugging
console.log('Registered Routes:');
console.log('- /api/auth');
authRoutes.stack.forEach(layer => {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).map(method => method.toUpperCase());
    console.log(`  ${methods.join(', ')} ${layer.route.path}`);
  }
});

console.log('- /api/properties');
propertyRoutes.stack.forEach(layer => {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).map(method => method.toUpperCase());
    console.log(`  ${methods.join(', ')} ${layer.route.path}`);
  }
});

console.log('- /api/bookings');
bookingRoutes.stack.forEach(layer => {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).map(method => method.toUpperCase());
    console.log(`  ${methods.join(', ')} ${layer.route.path}`);
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling (must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));