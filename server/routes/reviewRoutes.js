const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const upload = require('../config/cloudinary');
const { submitReview, getProductReviews } = require('../controllers/reviewController');

router.post('/', auth, upload.single('image'), submitReview);
router.get('/product/:id', getProductReviews);

module.exports = router;
