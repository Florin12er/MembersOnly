const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
const { checkNotAuthenticated } = require("../middleware/checks.js");

router.get("/", checkNotAuthenticated, (req, res) => {
    res.render("register");
});

router.post("/", checkNotAuthenticated, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new Error("Please fill in all fields");
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        const result = await user.save();
        res.redirect("/login");
    } catch (err) {
        res.render("register.ejs", { error: err.message });
    }
});
module.exports = router;
