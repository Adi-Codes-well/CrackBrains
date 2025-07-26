const Review = require('../models/Review');

exports.submitReview = async (req, res) => {
  const { productId, supplierId, rating, comment } = req.body;
  const image = req.file ? req.file.path : null;

  const review = new Review({
    vendorId: req.user.userId,
    productId,
    supplierId,
    rating,
    comment,
    image,
  });

  await review.save();
  res.status(201).json({ message: 'Review submitted', review });
};


exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};
