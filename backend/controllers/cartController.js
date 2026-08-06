const cartModel = require("../models/cartModel");

const addToCart = async (req, res) => {

    try {

        const userId = req.user.UserID;

        const { ProductID, Quantity } = req.body;

        if (!ProductID || !Quantity) {

            return res.status(400).json({

                message: "ProductID and Quantity are required."

            });

        }

        await cartModel.addToCart(userId, ProductID, Quantity);

        res.json({

            success: true,
            message: "Product added to cart."

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const getCart = async (req, res) => {

    try {

        const userId = req.user.UserID;

        const cart = await cartModel.getCart(userId);

        let grandTotal = 0;

        const items = cart.map(item => {

            const lineTotal = item.Price * item.Quantity;

            grandTotal += lineTotal;

            return {

                ...item,

                LineTotal: lineTotal

            };

        });

        res.json({

            success: true,

            totalItems: items.length,

            grandTotal,

            items

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const updateCart = async (req, res) => {

    try {

        const userId = req.user.UserID;

        const cartId = req.params.cartId;

        const { Quantity } = req.body;

        await cartModel.updateCart(

            userId,
            cartId,
            Quantity

        );

        res.json({

            success: true,
            message: "Cart updated."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const deleteCartItem = async (req, res) => {

    try {

        const userId = req.user.UserID;

        const cartId = req.params.cartId;

        await cartModel.deleteCartItem(

            userId,
            cartId

        );

        res.json({

            success: true,
            message: "Item removed from cart."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

module.exports = {

    addToCart,
    getCart,
    updateCart,
    deleteCartItem

};