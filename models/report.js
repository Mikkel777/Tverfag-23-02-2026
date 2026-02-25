const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema ({
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },
    reason: {
        type: String
    },

    reportedBy: {
        type: String,
    },
    date: {
        type: Date,
        defualt: Date.now
    }
});


module.exports = mongoose.model("Report", reportSchema);