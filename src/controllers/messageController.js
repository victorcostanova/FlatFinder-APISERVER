const Message = require("../models/Message");
const Flat = require("../models/Flat");

// Get all messages for a flat (flat owner only)
const getAllMessages = async (req, res) => {
  try {
    const flatId = req.params.id;

    // Check if flat exists and user is the owner
    const flat = await Flat.findById(flatId);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    if (flat.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message:
          "Access denied. You can only view messages for your own flats.",
      });
    }

    const messages = await Message.find({ flat: flatId })
      .populate("sender", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's messages for a specific flat
const getUserMessages = async (req, res) => {
  try {
    const { id: flatId, senderId } = req.params;

    // Check if flat exists
    const flat = await Flat.findById(flatId);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    // Check if user is the sender (can only see their own messages)
    if (senderId !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied. You can only view your own messages.",
      });
    }

    const messages = await Message.find({
      flat: flatId,
      sender: senderId,
    })
      .populate("sender", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new message
const addMessage = async (req, res) => {
  try {
    const flatId = req.params.id;
    const { content } = req.body;

    // Check if flat exists
    const flat = await Flat.findById(flatId);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    // Create new message
    const message = new Message({
      content,
      flat: flatId,
      sender: req.user._id,
    });

    const savedMessage = await message.save();
    const populatedMessage = await Message.findById(savedMessage._id).populate(
      "sender",
      "firstName lastName email"
    );

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllMessages,
  getUserMessages,
  addMessage,
};
