const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // Validate user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    console.log('User', User);
    console.log('req.body.email', req.body.email);
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');
    console.log('2');

    //Checking if the user is already in the database
    const usernameExist = await User.findOne({username: req.body.username});
    if (usernameExist) return res.status(400).send('Username already exists');

    console.log('3');
    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log('4');

    // Create new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.status(200).json({user: savedUser._id});
    }
    catch(err) {
        res.status(500).json({message: err});
    };
});

router.post('/login', async (req, res) => {
    // Validate
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user doesn't exists
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send('Username is not found');

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).send('Invalid Password');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).status(200).send({
        username: user.username,
        token
    });

    // res.send('Logged in');

});

module.exports = router;