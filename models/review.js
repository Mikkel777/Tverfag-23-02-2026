const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema ({
    sitename: {
        type: String,
        required: true
    },

    url : {
        type: String,
        required: true
    },

    rating: {
        type: String,
        required: true
    },

    comment: String,
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Review", reviewSchema);