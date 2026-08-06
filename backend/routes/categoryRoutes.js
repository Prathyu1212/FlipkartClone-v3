const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

// Get All Categories
router.get("/", categoryController.getCategories);

// Get Category By ID
router.get("/:id", categoryController.getCategory);

module.exports = router;