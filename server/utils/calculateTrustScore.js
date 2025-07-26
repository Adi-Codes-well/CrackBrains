const Review = require('../models/Review');
const Order = require('../models/Order');

const calculateTrustScore = async (supplierId, isVerifiedSupplier) => {
  // 1. Platform Verification
  const verificationScore = isVerifiedSupplier ? 40 : 0;

  // 2. Avg Rating
  const reviews = await Review.find({ supplierId });
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const ratingScore = (avgRating / 5) * 40;

  // 3. Fulfillment Rate
  const orders = await Order.find({ supplierId });
  const fulfilledOrders = orders.filter(o => o.status === 'Delivered').length;
  const fulfillmentRate = orders.length > 0 ? fulfilledOrders / orders.length : 0;
  const fulfillmentScore = fulfillmentRate * 20;

  const trustScore = Math.round(verificationScore + ratingScore + fulfillmentScore);
  return trustScore; // Out of 100
};

module.exports = calculateTrustScore;