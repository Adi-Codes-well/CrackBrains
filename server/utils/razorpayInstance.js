const Razorpay = require('razorpay');
require('dotenv').config(); // Load keys from .env

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports = razorpay;