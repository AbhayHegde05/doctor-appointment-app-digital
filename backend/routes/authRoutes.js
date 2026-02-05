const express = require('express');

const router = express.Router();
const { register, login, sendOtp, verifyOtp, validateEmail } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/validate-email', validateEmail);
module.exports = router;