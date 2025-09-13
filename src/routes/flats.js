const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getAllFlats,
  getFlatById,
  addFlat,
  updateFlat,
  deleteFlat
} = require('../controllers/flatController');

// All routes require authentication
router.use(auth);

// Flat routes
router.get('/', getAllFlats);
router.get('/:id', getFlatById);
router.post('/', addFlat);
router.patch('/:id', updateFlat);
router.delete('/:id', deleteFlat);

module.exports = router;