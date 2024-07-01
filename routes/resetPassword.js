const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// GET request to render the reset password form
router.get("/", (req, res) => {
    res.render("resetPassword");
});

// POST request to handle the password reset form submission
router.post("/", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        // Generate salt and hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        // Redirect to login page after successful password reset
        res.redirect("/login");
    } catch (error) {
        // Handle error, e.g., render the form with an error message
        res.render("resetPassword", { error: error.message });
    }
});

module.exports = router;

