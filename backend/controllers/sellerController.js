const Seller = require('../models/sellerModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { sendSellerToken } = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { SendOTP, CheckOTP } = require('../utils/sendEmail');



// Register Seller
exports.registerSeller = asyncErrorHandler(async (req, res, next) => {
    try {
        // Validate required fields
        const { name, email, gender, password, avatar } = req.body;

        if (!name || !email || !gender || !password || !avatar) {
            console.warn("[REGISTER] Missing required fields");
            return next(new ErrorHandler("All fields are required", 400));
        }

        console.log("[REGISTER] Uploading avatar to Cloudinary...");

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        console.log("[REGISTER] Avatar uploaded:", myCloud.secure_url);

        const seller = await Seller.create({
            name,
            email,
            gender,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        console.log("[REGISTER] New seller created:", seller.email);

        sendSellerToken(seller, 201, res);

    } catch (err) {
        console.error("[REGISTER] Error occurred:", err);
        return next(new ErrorHandler("Seller registration failed", 500));
    }
});

// Login Seller
exports.loginSeller = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const seller = await Seller.findOne({ email}).select("+password");

    if(!seller) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await seller.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendSellerToken(seller, 201, res);
});