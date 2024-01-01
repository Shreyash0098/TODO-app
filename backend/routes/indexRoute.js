const express = require("express");
const router = express.Router();

// Import and use individual route files
const todoRoutes = require("../routes/todoRoutes.js");
const authRoutes = require("../routes/authRoutes.js");

// Add more route imports as needed
router.use("/todo", todoRoutes);
router.use("/auth", authRoutes);

module.exports = router;
