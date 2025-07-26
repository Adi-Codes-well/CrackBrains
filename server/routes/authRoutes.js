const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

//Public
router.post('/register', register);
router.post('/login', login);

//Protected
router.get('/me', auth, getMe);

module.exports = router;