const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware");

// =========================
// Public Routes
// =========================

// Register
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

// =========================
// Protected Routes
// =========================

// Get Logged-in User Profile
router.get(
    "/profile",
    authenticateUser,
    userController.getProfile
);

// Update Logged-in User Profile
router.put(
    "/profile",
    authenticateUser,
    userController.updateProfile
);

module.exports = router;