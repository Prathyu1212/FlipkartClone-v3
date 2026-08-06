const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

// =========================
// GET Routes
// =========================

// Get All Products
router.get("/", productController.getProducts);

// Get Product By ID
router.get("/:id", productController.getProduct);

// =========================
// POST Route
// =========================

// Add Product
router.post("/", productController.addProduct);

// =========================
// PUT Route
// =========================

// Update Product
router.put("/:id", productController.updateProduct);

// =========================
// DELETE Route
// =========================

// Delete Product
router.delete("/:id", productController.deleteProduct);

module.exports = router;