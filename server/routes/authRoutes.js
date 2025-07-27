const express = require('express');
const router = express.Router();
const { register, login, getMe, updateMe } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer(); // Initialize multer

// Public Routes
// FIX: Use upload.none() to correctly handle multipart form data without file uploads.
router.post('/register', upload.none(), register);
router.post('/login', login);

// Protected Routes
router.get('/me', auth, getMe);
router.put('/me', auth, upload.none(), updateMe);

module.exports = router;