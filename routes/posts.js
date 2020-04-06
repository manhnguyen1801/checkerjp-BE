const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const Post = require('../models/Posts');


router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({message: err});
    }
});

router.post('/', async (req, res) => {
    console.log('123', req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        console.log('123', savedPost);
        res.status(200).json(savedPost);
    }
    catch(err) {
        res.status(500).json({message: err});
    };
});

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({message: err});
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.remove({_id: req.params.postId});
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({message: err});
    }
});

router.patch('/:postId', async (req, res) => {
    try {
        const post = await Post.updateOne(
            { _id: req.params.postId },
            { $set: {title: req.body.title} });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({message: err});
    }
});

module.exports = router;