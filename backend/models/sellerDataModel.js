const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ]
    },
    storeName: {
        type: String,
        trim: true,
        maxlength: [100, "Store name cannot exceed 100 characters"]
    },
    storeNumber: {
        type: String,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    },
    address: {
        type: String,
        maxlength: [300, "Address cannot exceed 300 characters"]
    },
    pincode: {
        type: String,
        match: [/^\d{6}$/, "Please enter a valid 6-digit Indian pincode"]
    },
    country: {
        type: String,
    },
    businessReg: {
        type: String,
        default: ""
    },
    taxId: {
        type: String,
        default: ""
    },
    GSTNumber: {
        type: String,
        default: ""
    },
    storeDescription: {
        type: String,
        maxlength: [1000, "Store description must be within 1000 characters"]
    },
    logo: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    onBoarding: {
        type: [Number],
        default: [0, 0, 0, 0, 0, 0],
        validate: {
            validator: function (val) {
                return val.length === 6;
            },
            message: "onBoarding must have exactly 6 steps"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SellerData', sellerSchema);
