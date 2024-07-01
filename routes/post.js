const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/checks');
const Post = require('../models/Post');

// GET route to render form for creating a new post
router.get('/new', checkAuthenticated, (req, res) => {
    res.render('newPost');
});

// POST route to handle submission of a new post
router.post('/', checkAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    const author = req.user; // Assuming req.user contains the authenticated user

    try {
        const newPost = new Post({ title, content, author });
        await newPost.save();
        res.redirect('/');
    } catch (error) {
        res.render('newPost', { error: error.message });
    }
});

module.exports = router;

