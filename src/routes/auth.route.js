const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login-email', authController.loginByEmail);

module.exports = router;