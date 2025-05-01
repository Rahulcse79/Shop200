const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    onBoarding: {
        type: [Number],
        required: [true, "Please Enter Your onBoarding levels"],
        default: [0, 0, 0, 0, 0, 0],
        validate: {
            validator: function(value) {
                return value.length === 6; 
            },
            message: "onBoarding must have exactly 6 elements"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('SellerData', sellerSchema);
