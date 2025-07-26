const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary'); // 👈 1. IMPORT UPLOAD MIDDLEWARE

// Public Routes
// FIX: Add upload.none() to handle the multipart form data from the signup page
router.post('/register', upload.none(), register); // 👈 2. ADD IT HERE
router.post('/login', login);

// Protected Routes
router.get('/me', auth, getMe);

module.exports = router;