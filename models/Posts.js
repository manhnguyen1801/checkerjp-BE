const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        require: true,
        type: String
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);