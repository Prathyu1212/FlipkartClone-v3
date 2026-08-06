function validateProduct(product) {

    const errors = [];

    if (!product.ProductName || product.ProductName.trim() === "") {
        errors.push("Product Name is required.");
    }

    if (!product.Brand || product.Brand.trim() === "") {
        errors.push("Brand is required.");
    }

    if (!product.Category || product.Category.trim() === "") {
        errors.push("Category is required.");
    }

    if (product.Price === undefined || isNaN(product.Price)) {
        errors.push("Price must be a number.");
    } else if (Number(product.Price) <= 0) {
        errors.push("Price must be greater than zero.");
    }

    if (product.Stock === undefined || isNaN(product.Stock)) {
        errors.push("Stock must be a number.");
    } else if (Number(product.Stock) < 0) {
        errors.push("Stock cannot be negative.");
    }

    return errors;
}

module.exports = {
    validateProduct
};