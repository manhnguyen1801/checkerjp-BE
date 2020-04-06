const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
    title: {
        require: true,
        type: String
    },
    description: {
        require: true,
        type: String
    },
    price: {
        require: true,
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feed', feedSchema);