const { body } = require("express-validator");

const productValidationRules = [

    body("ProductName")
        .trim()
        .notEmpty()
        .withMessage("Product Name is required"),

    body("Brand")
        .trim()
        .notEmpty()
        .withMessage("Brand is required"),

    body("Price")
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0"),

    body("Stock")
        .isInt({ min: 0 })
        .withMessage("Stock cannot be negative"),

    body("CategoryID")
        .isInt({ min: 1 })
        .withMessage("Valid CategoryID is required")

];

module.exports = productValidationRules;