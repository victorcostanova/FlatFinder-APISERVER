const express = require("express");
const router = express.Router({ mergeParams: true });
const { auth } = require("../middleware/auth");
const {
  getAllMessages,
  getUserMessages,
  addMessage,
} = require("../controllers/messageController");

// All routes require authentication
router.use(auth);

// Message routes
router.get("/", getAllMessages);
router.get("/:senderId", getUserMessages);
router.post("/", addMessage);

module.exports = router;
