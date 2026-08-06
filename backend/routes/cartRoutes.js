const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");

const auth = require("../middleware/authMiddleware");

router.post(
    "/",
    auth,
    cartController.addToCart
);

router.get(
    "/",
    auth,
    cartController.getCart
);

router.put(
    "/:cartId",
    auth,
    cartController.updateCart
);

router.delete(
    "/:cartId",
    auth,
    cartController.deleteCartItem
);

module.exports = router;