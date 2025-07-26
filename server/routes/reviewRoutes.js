const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { submitReview, getProductReviews } = require('../controllers/reviewController');

router.post('/', auth, upload.single('image'), submitReview);
router.get('/product/:id', getProductReviews);

module.exports = router;
