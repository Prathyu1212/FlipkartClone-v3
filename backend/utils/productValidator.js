const validateProduct = (product) => {

    const errors = [];

    // Product Name
    if (!product.ProductName || product.ProductName.trim() === "") {
        errors.push("Product Name is required.");
    }

    // Brand
    if (!product.Brand || product.Brand.trim() === "") {
        errors.push("Brand is required.");
    }

    // Category
    if (!product.Category || product.Category.trim() === "") {
        errors.push("Category is required.");
    }

    // Price
    if (
        product.Price === undefined ||
        product.Price === null ||
        product.Price <= 0
    ) {
        errors.push("Price must be greater than 0.");
    }

    // Stock
    if (
        product.Stock === undefined ||
        product.Stock === null ||
        product.Stock < 0
    ) {
        errors.push("Stock cannot be negative.");
    }

    return errors;
};

module.exports = validateProduct;