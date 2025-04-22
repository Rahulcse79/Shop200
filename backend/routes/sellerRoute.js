const express = require('express');

const { registerSeller, loginSeller } = require('../controllers/sellerController');
const { isAuthenticatedSeller } = require('../middlewares/auth');
const router = express.Router();


router.route('/register').post(registerSeller);
router.route('/login').post(loginSeller);

module.exports = router;