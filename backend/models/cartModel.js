const { poolPromise } = require("../config/db");

const addToCart = async (userId, productId, quantity) => {

    const pool = await poolPromise;

    const existing = await pool.request()
        .input("UserID", userId)
        .input("ProductID", productId)
        .query(`
            SELECT *
            FROM Cart
            WHERE UserID=@UserID
            AND ProductID=@ProductID
        `);

    if (existing.recordset.length > 0) {

        await pool.request()
            .input("UserID", userId)
            .input("ProductID", productId)
            .input("Quantity", quantity)
            .query(`
                UPDATE Cart
                SET Quantity = Quantity + @Quantity
                WHERE UserID=@UserID
                AND ProductID=@ProductID
            `);

        return;
    }

    await pool.request()
        .input("UserID", userId)
        .input("ProductID", productId)
        .input("Quantity", quantity)
        .query(`
            INSERT INTO Cart
            (
                UserID,
                ProductID,
                Quantity
            )
            VALUES
            (
                @UserID,
                @ProductID,
                @Quantity
            )
        `);

};

const getCart = async (userId) => {

    const pool = await poolPromise;

    const result = await pool.request()
        .input("UserID", userId)
        .query(`
            SELECT
                c.CartID,
                c.Quantity,
                p.ProductID,
                p.ProductName,
                p.Brand,
                p.Price,
                p.Stock,
                p.ImageURL,
                p.Description
            FROM Cart c
            INNER JOIN Products p
                ON c.ProductID = p.ProductID
            WHERE c.UserID=@UserID
            ORDER BY c.CartID DESC
        `);

    return result.recordset;

};

const updateCart = async (userId, cartId, quantity) => {

    const pool = await poolPromise;

    if (quantity <= 0) {

        await pool.request()
            .input("CartID", cartId)
            .input("UserID", userId)
            .query(`
                DELETE FROM Cart
                WHERE CartID=@CartID
                AND UserID=@UserID
            `);

        return;
    }

    await pool.request()
        .input("CartID", cartId)
        .input("UserID", userId)
        .input("Quantity", quantity)
        .query(`
            UPDATE Cart
            SET Quantity=@Quantity
            WHERE CartID=@CartID
            AND UserID=@UserID
        `);

};

const deleteCartItem = async (userId, cartId) => {

    const pool = await poolPromise;

    await pool.request()
        .input("CartID", cartId)
        .input("UserID", userId)
        .query(`
            DELETE FROM Cart
            WHERE CartID=@CartID
            AND UserID=@UserID
        `);

};

module.exports = {

    addToCart,
    getCart,
    updateCart,
    deleteCartItem

};