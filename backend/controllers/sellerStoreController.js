const SellerData = require('../models/sellerDataModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require("cloudinary");
const { sendEmail, SendOTP, CheckOTPUser } = require('../utils/sendEmail');

//createStoreSetup, bankAccountSetup, businessInformationSetup, documentUploadSetup, verification, getCreateStoreSetup, getBankAccountSetup, getBusinessInformationSetup, getDocumentUploadSetup, getVerification

// Create store setup controller.
exports.createStoreSetup = asyncErrorHandler(async (req, res, next) => {
    try {
        const {
            storeName,
            storeEmail,
            storeNumber,
            address,
            pincode,
            country,
            businessReg,
            taxId,
            GSTNumber,
            storeDescription
        } = req.body;
        let logoLink = [];
        if (req.body && req.body.logo) {
            const logoFile = req.body.logo;
            const result = await cloudinary.v2.uploader.upload(logoFile, {
                folder: "sellerData",
            });

            logoLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        const existingSeller = await SellerData.findOne({ email: storeEmail });
        if (!existingSeller) {
            return next(new ErrorHandler("Seller not found for given email", 404));
        }
        existingSeller.storeName = storeName;
        existingSeller.storeNumber = storeNumber;
        existingSeller.address = address;
        existingSeller.pincode = pincode;
        existingSeller.country = country;
        existingSeller.businessReg = businessReg;
        existingSeller.taxId = taxId;
        existingSeller.GSTNumber = GSTNumber;
        existingSeller.storeDescription = storeDescription;
        if (logoLink !== null) {
            existingSeller.logo = logoLink;
        }

        await existingSeller.save();
        return res.status(200).json({
            success: true,
            message: "Store setup updated or created successfully",
        });

    } catch (err) {
        return next(new ErrorHandler("User create store failed", 500));
    }
});

// Bank account setup controller.
exports.bankAccountSetup = asyncErrorHandler(async (req, res, next) => {
    try {
        const {
            storeName,
            storeEmail,
            storeNumber,
            address,
            pincode,
            country,
            businessReg,
            taxId,
            GSTNumber,
            storeDescription
        } = req.body;
        let logoLink = [];
        if (req.body && req.body.logo) {
            const logoFile = req.body.logo;
            const result = await cloudinary.v2.uploader.upload(logoFile, {
                folder: "sellerData",
            });

            logoLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        const existingSeller = await SellerData.findOne({ email: storeEmail });
        if (!existingSeller) {
            return next(new ErrorHandler("Seller not found for given email", 404));
        }
        existingSeller.storeName = storeName;
        existingSeller.storeNumber = storeNumber;
        existingSeller.address = address;
        existingSeller.pincode = pincode;
        existingSeller.country = country;
        existingSeller.businessReg = businessReg;
        existingSeller.taxId = taxId;
        existingSeller.GSTNumber = GSTNumber;
        existingSeller.storeDescription = storeDescription;
        if (logoLink !== null) {
            existingSeller.logo = logoLink;
        }

        await existingSeller.save();
        return res.status(200).json({
            success: true,
            message: "Store setup updated or created successfully",
            sellerData: existingSeller,
        });

    } catch (err) {
        return next(new ErrorHandler("User create store failed", 500));
    }
});

// Get store setup data by seller email
exports.getCreateStoreSetup = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required to fetch store setup data.",
            });
        }

        const existingSeller = await SellerData.findOne({ email });

        if (!existingSeller) {
            return res.status(404).json({
                success: false,
                message: "No seller found with the provided email.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Store setup data fetched successfully.",
            sellerData: existingSeller,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch store setup data. Please try again later.",
        });
    }
});



