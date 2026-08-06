const { sql, poolPromise } = require("../config/db");

// =========================
// Get All Categories
// =========================
const getAllCategories = async () => {

    const pool = await poolPromise;

    const result = await pool.request()
        .query(`
            SELECT
                CategoryID,
                CategoryName,
                CreatedDate
            FROM Categories
            ORDER BY CategoryName
        `);

    return result.recordset;

};

// =========================
// Get Category By ID
// =========================
const getCategoryById = async (categoryId) => {

    const pool = await poolPromise;

    const result = await pool.request()
        .input("CategoryID", sql.Int, categoryId)
        .query(`
            SELECT
                CategoryID,
                CategoryName,
                CreatedDate
            FROM Categories
            WHERE CategoryID = @CategoryID
        `);

    return result.recordset[0];

};

module.exports = {

    getAllCategories,
    getCategoryById

};