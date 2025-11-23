const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food"
    },
}, {
    timestamps: true
});

const like = mongoose.model("like", likeSchema);
module.exports = like;