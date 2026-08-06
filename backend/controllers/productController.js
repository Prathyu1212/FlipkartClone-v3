const productModel = require("../models/productModel");

// =========================
// Get All Products
// =========================
const getProducts = async (req, res) => {

    try {

        const products = await productModel.getAllProducts();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =========================
// Get Product By ID
// =========================
const getProduct = async (req, res) => {

    try {

        const product = await productModel.getProductById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =========================
// Add Product
// =========================
const addProduct = async (req, res) => {

    try {

        await productModel.addProduct(req.body);

        res.status(201).json({
            message: "Product Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =========================
// Update Product
// =========================
const updateProduct = async (req, res) => {

    try {

        const existingProduct = await productModel.getProductById(req.params.id);

        if (!existingProduct) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        await productModel.updateProduct(req.params.id, req.body);

        const updatedProduct = await productModel.getProductById(req.params.id);

        res.status(200).json({

            message: "Product Updated Successfully",

            product: updatedProduct

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =========================
// Delete Product
// =========================
const deleteProduct = async (req, res) => {

    try {

        const existingProduct = await productModel.getProductById(req.params.id);

        if (!existingProduct) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        await productModel.deleteProduct(req.params.id);

        res.status(200).json({

            message: "Product Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct

};