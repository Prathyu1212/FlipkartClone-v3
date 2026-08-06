const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

// =========================
// Register User
// =========================
const register = async (req, res) => {

    try {

        const {
            FullName,
            Email,
            Password,
            Phone
        } = req.body;

        const existingUser = await userModel.getUserByEmail(Email);

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        await userModel.registerUser({
            FullName,
            Email,
            PasswordHash: hashedPassword,
            Phone
        });

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =========================
// Login User
// =========================
const login = async (req, res) => {

    try {

        const {
            Email,
            Password
        } = req.body;

        const user = await userModel.getUserByEmail(Email);

        if (!user) {

            return res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

        const isPasswordValid = await bcrypt.compare(
            Password,
            user.PasswordHash
        );

        if (!isPasswordValid) {

            return res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

        const token = jwt.sign(
            {
                UserID: user.UserID,
                Email: user.Email,
                Role: user.Role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =========================
// Get Profile
// =========================
const getProfile = async (req, res) => {

    try {

        const user = await userModel.getUserById(req.user.UserID);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =========================
// Update Profile
// =========================
const updateProfile = async (req, res) => {

    try {

        const {
            FullName,
            Phone
        } = req.body;

        await userModel.updateProfile(
            req.user.UserID,
            {
                FullName,
                Phone
            }
        );

        const updatedUser = await userModel.getUserById(
            req.user.UserID
        );

        res.json({

            message: "Profile Updated Successfully",

            user: updatedUser

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    register,
    login,
    getProfile,
    updateProfile

};