const express = require('express');
const router = express.Router();

const Feeds = require('../models/Feeds');

router.post('/', (req, res) => {
    const newFeed = new Feeds({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    });
    newFeed.save((res) => {
        console.log('res', res);
    },
    (err) => {
        console.log('err', err);
    });
    // console.log('newFeed', newFeed);
    // try {
    //     const saved = await newFeed.save();
    //     res.status(200).json(saved);
    // }
    // catch(err) {
    //     res.status(500).json({message: err});
    // };
});

module.exports = router;