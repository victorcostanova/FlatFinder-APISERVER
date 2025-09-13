const Flat = require('../models/Flat');

// Get all flats
const getAllFlats = async (req, res) => {
  try {
    const flats = await Flat.find().populate('owner', 'firstName lastName email');
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get flat by ID
const getFlatById = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id).populate('owner', 'firstName lastName email');
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    res.json(flat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new flat
const addFlat = async (req, res) => {
  try {
    const {
      city,
      streetName,
      streetNumber,
      areaSize,
      hasAc,
      yearBuilt,
      rentPrice,
      dateAvailable
    } = req.body;

    const flat = new Flat({
      city,
      streetName,
      streetNumber,
      areaSize,
      hasAc,
      yearBuilt,
      rentPrice,
      dateAvailable,
      owner: req.user._id
    });

    const savedFlat = await flat.save();
    const populatedFlat = await Flat.findById(savedFlat._id).populate('owner', 'firstName lastName email');

    res.status(201).json(populatedFlat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update flat
const updateFlat = async (req, res) => {
  try {
    const flatId = req.params.id;
    const flat = await Flat.findById(flatId);

    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    // Check if user is the owner of the flat
    if (flat.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only update your own flats.' });
    }

    const {
      city,
      streetName,
      streetNumber,
      areaSize,
      hasAc,
      yearBuilt,
      rentPrice,
      dateAvailable
    } = req.body;

    const updateData = {};
    if (city !== undefined) updateData.city = city;
    if (streetName !== undefined) updateData.streetName = streetName;
    if (streetNumber !== undefined) updateData.streetNumber = streetNumber;
    if (areaSize !== undefined) updateData.areaSize = areaSize;
    if (hasAc !== undefined) updateData.hasAc = hasAc;
    if (yearBuilt !== undefined) updateData.yearBuilt = yearBuilt;
    if (rentPrice !== undefined) updateData.rentPrice = rentPrice;
    if (dateAvailable !== undefined) updateData.dateAvailable = dateAvailable;

    const updatedFlat = await Flat.findByIdAndUpdate(
      flatId,
      updateData,
      { new: true, runValidators: true }
    ).populate('owner', 'firstName lastName email');

    res.json(updatedFlat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete flat
const deleteFlat = async (req, res) => {
  try {
    const flatId = req.params.id;
    const flat = await Flat.findById(flatId);

    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    // Check if user is the owner of the flat
    if (flat.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only delete your own flats.' });
    }

    await Flat.findByIdAndDelete(flatId);
    res.json({ message: 'Flat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFlats,
  getFlatById,
  addFlat,
  updateFlat,
  deleteFlat
};