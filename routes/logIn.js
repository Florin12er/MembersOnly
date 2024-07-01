const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkNotAuthenticated } = require("../middleware/checks");
const User = require("../models/User"); // Adjust path as necessary

router.get("/", checkNotAuthenticated, (req, res) => {
  res.render("login");
});

router.post(
  "/",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true, // Enable flash messages for failure
  })
);

module.exports = router;

