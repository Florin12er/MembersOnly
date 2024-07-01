const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { checkAuthenticated } = require('../middleware/checks');

// GET route to render home page with posts
router.get('/', checkAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
        res.render('home', { name: req.user.username, posts, user: req.user });
  } catch (error) {
    res.redirect('/login');
  }
});

// POST route to create a new post
router.post('/', checkAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  const author = req.user._id;

  try {
    const newPost = new Post({ title, content, author, isVIP: req.user.isVIP });
    await newPost.save();
    res.redirect('/');
  } catch (error) {
    res.render('home', { error: error.message });
  }
});

// DELETE route to delete a post
router.delete('/post/:id', checkAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.equals(req.user._id)) {
      await post.deleteOne();
      res.redirect('/');
    } else {
      res.status(403).send('You are not authorized to delete this post');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

