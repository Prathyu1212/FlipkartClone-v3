const categoryModel = require("../models/categoryModel");

// =========================
// Get All Categories
// =========================
const getCategories = async (req, res) => {

    try {

        const categories = await categoryModel.getAllCategories();

        res.status(200).json(categories);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// =========================
// Get Category By ID
// =========================
const getCategory = async (req, res) => {

    try {

        const category = await categoryModel.getCategoryById(
            req.params.id
        );

        if (!category) {

            return res.status(404).json({

                message: "Category not found"

            });

        }

        res.status(200).json(category);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getCategories,
    getCategory

};