require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===============================
// Routes
// ===============================

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/cart", cartRoutes);

// ===============================
// Default Route
// ===============================

app.get("/", (req, res) => {

    res.json({

        message: "Flipkart Clone Backend API Running"

    });

});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server Running on Port ${PORT}`);

});