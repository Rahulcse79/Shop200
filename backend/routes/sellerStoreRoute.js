const express = require('express');

const { createStoreSetup, bankAccountSetup, businessInformationSetup, documentUploadSetup, verification, getCreateStoreSetup, getBankAccountSetup, getBusinessInformationSetup, getDocumentUploadSetup, getVerification } = require('../controllers/sellerStoreController');
const { isAuthenticatedSeller, authorizeRolesForSeller } = require('../middlewares/auth');
const router = express.Router();

router.route('/createStore-setup').post(isAuthenticatedSeller, createStoreSetup);
router.route('/bankAccount-setup').post(isAuthenticatedSeller, bankAccountSetup);
// router.route('/businessInfo-setup').post(isAuthenticatedSeller, businessInformationSetup);
// router.route('/documentUpload-setup').post(isAuthenticatedSeller, documentUploadSetup);
// router.route('/verification').post(isAuthenticatedSeller, verification);

router.route('/get/createStore').get(isAuthenticatedSeller, authorizeRolesForSeller("admin"), getCreateStoreSetup);
// router.route('admin/get/bankAccount').get(isAuthenticatedSeller, authorizeRolesForSeller("admin"), getBankAccountSetup);
// router.route('admin/get/businessInfo').get(isAuthenticatedSeller, authorizeRolesForSeller("admin"), getBusinessInformationSetup);
// router.route('admin/get/documentUpload').get(isAuthenticatedSeller, authorizeRolesForSeller("admin"), getDocumentUploadSetup);
// router.route('admin/get/verification').get(isAuthenticatedSeller, authorizeRolesForSeller("admin"), getVerification);

module.exports = router;