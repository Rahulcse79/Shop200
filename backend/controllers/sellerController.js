const Seller = require('../models/sellerModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { sendSellerToken } = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { SendmailTootp, SendOTP, CheckOTPSeller } = require('../utils/sendEmail');

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

// OTP Based Login seller
exports.OTPBasedLoginSeller = asyncErrorHandler(async (req, res, next) => {
    const { email, OTP } = req.body;
    if (!email) {
        return next(new ErrorHandler("Please enter both Email and OTP", 400));
    }

    const seller = await Seller.findOne({ email });

    if (!seller) {
        return next(new ErrorHandler("Invalid Email or seller not found.", 401));
    }

    const isOTPMatched = await CheckOTPSeller(email, OTP);

    if (!isOTPMatched) {
        return next(new ErrorHandler("Invalid OTP", 401));
    }

    sendToken(seller, 201, res);
});

// Login Seller
exports.loginSeller = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const seller = await Seller.findOne({ email }).select("+password");

    if (!seller) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await seller.comparePassword(password);
    
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendSellerToken(seller, 201, res);
});

// Send OTP
exports.OTPSendSeller = asyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler("Please Enter Email", 400));
    }

    const seller = await Seller.findOne({ email });

    if (!seller) {
        return next(new ErrorHandler("Invalid Email seller not found", 401));
    }

    const GenerateOTP = await SendOTP(email, "Seller");

    if (!GenerateOTP) {
        return next(new ErrorHandler("Invalid Email", 401));
    }

    res.status(200).json({
        success: true
    });
});

// Logout Seller
exports.logoutSeller = asyncErrorHandler(async (req, res, next) => {
    res.cookie("SellerToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get Seller Details
exports.getSellerDetails = asyncErrorHandler(async (req, res, next) => {

    const seller = await Seller.findById(req.seller.id);

    res.status(200).json({
        success: true,
        seller,
    });
});

// Forgot Password
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {

    const seller = await Seller.findOne({ email: req.body.email });

    if (!seller) {
        return next(new ErrorHandler("Seller Not Found", 404));
    }

    const resetToken = await seller.getResetPasswordToken();

    await seller.save({ validateBeforeSave: false });

    const resetPasswordUrl = `http://localhost:3000/password/seller/reset/${resetToken}`;

    const MailSubject = "Your Shop200 OTP Code";
    const MailText = `
Dear ${seller.name},

Reset your password by clicking the link below:
${resetPasswordUrl}

If you did not request this, please ignore.

Best regards,
Shop200 Team
  `;

    try {
        await SendmailTootp(seller.email, MailSubject, MailText);

        res.status(200).json({
            success: true,
            message: `Email sent to ${seller.email} successfully`,
        });

    } catch (error) {
        seller.resetPasswordToken = undefined;
        seller.resetPasswordExpire = undefined;

        await seller.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
});

// Reset Password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const seller = await Seller.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!seller) {
        return next(new ErrorHandler("Invalid or expired reset password token", 404));
    }
    seller.password = req.body.password;
    seller.resetPasswordToken = undefined;
    seller.resetPasswordExpire = undefined;
    await seller.save();
    sendSellerToken(seller, 200, res);
});


// Update Password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {

    const seller = await Seller.findById(req.seller.id).select("+password");

    const isPasswordMatched = await seller.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is Invalid", 400));
    }

    seller.password = req.body.newPassword;
    await seller.save();
    sendToken(seller, 201, res);
});

// Update seller Profile
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {

    const newSellerData = {
        name: req.body.name,
        email: req.body.email,
    }

    if (req.body.avatar !== "") {
        const seller = await Seller.findById(req.seller.id);

        const imageId = seller.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newSellerData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }

    await Seller.findByIdAndUpdate(req.seller.id, newSellerData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete Role --ADMIN
exports.deleteSeller = asyncErrorHandler(async (req, res, next) => {

    const seller = await Seller.findById(req.params.id);

    if (!seller) {
        return next(new ErrorHandler(`Seller doesn't exist with id: ${req.params.id}`, 404));
    }

    await seller.remove();

    res.status(200).json({
        success: true
    });
});

// Update Seller Role --ADMIN
exports.updateSellerRole = asyncErrorHandler(async (req, res, next) => {

    const newSellerData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        role: req.body.role,
    }

    await Seller.findByIdAndUpdate(req.params.id, newSellerData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Get All Seller --ADMIN
exports.getAllSellers = asyncErrorHandler(async (req, res, next) => {

    const sellers = await Seller.find();

    res.status(200).json({
        success: true,
        sellers,
    });
});

// Get Single seller Details --ADMIN
exports.getSingleSeller = asyncErrorHandler(async (req, res, next) => {

    const seller = await Seller.findById(req.params.id);

    if (!seller) {
        return next(new ErrorHandler(`Seller doesn't exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        seller,
    });
});
