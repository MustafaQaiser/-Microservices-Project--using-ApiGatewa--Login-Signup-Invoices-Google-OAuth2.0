const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authenticateUser= require('../Middleware/authenticateUser');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile',authenticateUser, authController.profile);
router.get('/google',authController.google);
router.get('/google/callback',authController.googleCallback);
module.exports = router;
