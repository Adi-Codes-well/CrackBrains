const razorpay = require('../utils/razorpayInstance');

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    // Create order options
    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`, // Unique receipt ID
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment creation failed', error: error.message });
  }
};
