const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const userRoutes = require('./routes/users');
const flatRoutes = require('./routes/flats');
const messageRoutes = require('./routes/messages');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/flats', flatRoutes);
app.use('/flats/:id/messages', messageRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'FlatFinder API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});