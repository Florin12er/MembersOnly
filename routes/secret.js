const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const { checkAuthenticated } = require('../middleware/checks');

const SECRET_PASSWORD = process.env.SECRET_PASSWORD; // Replace with your actual secret password

// GET route to render the VIP form
router.get('/', checkAuthenticated, (req, res) => {
    res.render('secret');
});

// POST route to handle VIP membership upgrade
router.post('/', checkAuthenticated, async (req, res) => {
    const { password } = req.body;
    const user = req.user;

    if (password === SECRET_PASSWORD) {
        try {
            // Update the user's VIP status
            user.isVIP = true;
            await user.save();

            // Update all posts by this user to reflect VIP status
            await Post.updateMany({ author: user._id }, { $set: { isVIP: true } });

            res.redirect('/');
        } catch (error) {
            res.render('secret', { error: 'Failed to update VIP status' });
        }
    } else {
        res.render('secret', { error: 'Incorrect password' });
    }
});

module.exports = router;

