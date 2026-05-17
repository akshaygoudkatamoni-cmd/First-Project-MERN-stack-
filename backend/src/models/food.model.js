const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner",
        required: true
     },
    likeCount: {
        type: Number,
        default: 0
    },
    saveCount: {
        type: Number,
        default: 0
    }
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

module.exports = foodModel;