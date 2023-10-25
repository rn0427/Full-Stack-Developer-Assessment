// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Route to handle user authentication
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
