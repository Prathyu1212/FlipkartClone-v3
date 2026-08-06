const { sql, poolPromise } = require("../config/db");

// =========================
// Get All Products
// =========================
const getAllProducts = async () => {

    const pool = await poolPromise;

    const result = await pool.request()
        .query(`
            SELECT
                p.ProductID,
                p.ProductName,
                p.Brand,
                p.Price,
                p.Stock,
                p.ImageURL,
                p.Description,
                c.CategoryID,
                c.CategoryName
            FROM Products p
            INNER JOIN Categories c
                ON p.CategoryID = c.CategoryID
            ORDER BY p.ProductID
        `);

    return result.recordset;

};

// =========================
// Get Product By ID
// =========================
const getProductById = async (productId) => {

    const pool = await poolPromise;

    const result = await pool.request()
        .input("ProductID", sql.Int, productId)
        .query(`
            SELECT
                p.ProductID,
                p.ProductName,
                p.Brand,
                p.Price,
                p.Stock,
                p.ImageURL,
                p.Description,
                c.CategoryID,
                c.CategoryName
            FROM Products p
            INNER JOIN Categories c
                ON p.CategoryID = c.CategoryID
            WHERE p.ProductID = @ProductID
        `);

    return result.recordset[0];

};

// =========================
// Add Product
// =========================
const addProduct = async (product) => {

    const pool = await poolPromise;

    await pool.request()
        .input("ProductName", sql.NVarChar, product.ProductName)
        .input("Brand", sql.NVarChar, product.Brand)
        .input("Price", sql.Decimal(18,2), product.Price)
        .input("Stock", sql.Int, product.Stock)
        .input("ImageURL", sql.NVarChar, product.ImageURL)
        .input("Description", sql.NVarChar, product.Description)
        .input("CategoryID", sql.Int, product.CategoryID)
        .query(`
            INSERT INTO Products
            (
                ProductName,
                Brand,
                Price,
                Stock,
                ImageURL,
                Description,
                CategoryID
            )
            VALUES
            (
                @ProductName,
                @Brand,
                @Price,
                @Stock,
                @ImageURL,
                @Description,
                @CategoryID
            )
        `);

};

// =========================
// Update Product
// =========================
const updateProduct = async (productId, product) => {

    const pool = await poolPromise;

    await pool.request()
        .input("ProductID", sql.Int, productId)
        .input("ProductName", sql.NVarChar, product.ProductName)
        .input("Brand", sql.NVarChar, product.Brand)
        .input("Price", sql.Decimal(18,2), product.Price)
        .input("Stock", sql.Int, product.Stock)
        .input("ImageURL", sql.NVarChar, product.ImageURL)
        .input("Description", sql.NVarChar, product.Description)
        .input("CategoryID", sql.Int, product.CategoryID)
        .query(`
            UPDATE Products
            SET
                ProductName = @ProductName,
                Brand = @Brand,
                Price = @Price,
                Stock = @Stock,
                ImageURL = @ImageURL,
                Description = @Description,
                CategoryID = @CategoryID
            WHERE ProductID = @ProductID
        `);

};

// =========================
// Delete Product
// =========================
const deleteProduct = async (productId) => {

    const pool = await poolPromise;

    await pool.request()
        .input("ProductID", sql.Int, productId)
        .query(`
            DELETE FROM Products
            WHERE ProductID = @ProductID
        `);

};

module.exports = {

    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct

};