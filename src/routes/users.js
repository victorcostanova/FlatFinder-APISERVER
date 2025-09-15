const express = require("express");
const router = express.Router();
const { auth, adminAuth, ownerOrAdmin } = require("../middleware/auth");
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/", auth, adminAuth, getAllUsers);
router.get("/:id", auth, getUserById);
router.patch("/:id", auth, ownerOrAdmin("user"), updateUser);
router.patch("/", auth, ownerOrAdmin("user"), updateUser);
router.delete("/:id", auth, ownerOrAdmin("user"), deleteUser);
router.delete("/", auth, ownerOrAdmin("user"), deleteUser);

module.exports = router;
