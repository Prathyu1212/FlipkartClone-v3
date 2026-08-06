const { sql, poolPromise } = require("../config/db");

// =========================
// Register User
// =========================
const registerUser = async (user) => {

    const pool = await poolPromise;

    await pool.request()
        .input("FullName", sql.NVarChar, user.FullName)
        .input("Email", sql.NVarChar, user.Email)
        .input("PasswordHash", sql.NVarChar, user.PasswordHash)
        .input("Phone", sql.NVarChar, user.Phone)
        .query(`
            INSERT INTO Users
            (
                FullName,
                Email,
                PasswordHash,
                Phone
            )
            VALUES
            (
                @FullName,
                @Email,
                @PasswordHash,
                @Phone
            )
        `);

};

// =========================
// Get User By Email
// =========================
const getUserByEmail = async (email) => {

    const pool = await poolPromise;

    const result = await pool.request()
        .input("Email", sql.NVarChar, email)
        .query(`
            SELECT *
            FROM Users
            WHERE Email = @Email
        `);

    return result.recordset[0];

};

// =========================
// Get User By ID
// =========================
const getUserById = async (userId) => {

    const pool = await poolPromise;

    const result = await pool.request()
        .input("UserID", sql.Int, userId)
        .query(`
            SELECT
                UserID,
                FullName,
                Email,
                Phone,
                Role,
                CreatedDate
            FROM Users
            WHERE UserID = @UserID
        `);

    return result.recordset[0];

};

// =========================
// Update Profile
// =========================
const updateProfile = async (userId, user) => {

    const pool = await poolPromise;

    await pool.request()
        .input("UserID", sql.Int, userId)
        .input("FullName", sql.NVarChar, user.FullName)
        .input("Phone", sql.NVarChar, user.Phone)
        .query(`
            UPDATE Users
            SET
                FullName = @FullName,
                Phone = @Phone
            WHERE UserID = @UserID
        `);

};

module.exports = {

    registerUser,
    getUserByEmail,
    getUserById,
    updateProfile

};