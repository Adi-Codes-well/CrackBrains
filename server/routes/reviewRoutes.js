const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

// UPDATE THIS LINE to include getVendorReviews
const { submitReview, getProductReviews, getVendorReviews } = require('../controllers/reviewController');

router.post('/', auth, upload.single('image'), submitReview);
router.get('/product/:id', getProductReviews);
router.get('/vendor', auth, getVendorReviews);

module.exports = router;