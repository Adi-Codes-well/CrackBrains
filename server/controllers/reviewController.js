const Review = require('../models/Review');

exports.submitReview = async (req, res) => {
  const { productId, supplierId, rating, comment } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const review = new Review({
      vendorId: req.user.id,
      productId,
      supplierId,
      rating,
      comment,
      image,
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ message: 'Server error while submitting review.' });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id }).populate('vendorId', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

exports.getVendorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ vendorId: req.user.id })
      .populate('productId', 'name')
      .populate('supplierId', 'name');
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching vendor reviews:', err);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};