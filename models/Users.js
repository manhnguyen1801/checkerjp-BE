const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        require: true,
        type: String,
        max: 255,
        min: 6
    },
    email: {
        require: true,
        max: 255,
        min: 6,
        type: String
    },
    password: {
        require: true,
        type: String,
        min: 6,
        max: 1024
    },
    role: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);