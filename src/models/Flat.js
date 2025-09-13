const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  streetName: {
    type: String,
    required: true,
    trim: true
  },
  streetNumber: {
    type: String,
    required: true,
    trim: true
  },
  areaSize: {
    type: Number,
    required: true,
    min: 1
  },
  hasAc: {
    type: Boolean,
    default: false
  },
  yearBuilt: {
    type: Number,
    required: true,
    min: 1800,
    max: new Date().getFullYear()
  },
  rentPrice: {
    type: Number,
    required: true,
    min: 0
  },
  dateAvailable: {
    type: Date,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flat', flatSchema);