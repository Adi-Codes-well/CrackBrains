const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');


exports.placeOrder = async (req, res) => {
   try {
        // Destructure new fields from the request body
        const { productId, quantity, totalAmount, shippingAddress, paymentDetails } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const order = new Order({
            vendorId: req.user.id,
            supplierId: product.supplierId,
            productId,
            quantity,
            totalAmount, // Save the total amount
            shippingAddress, // Save the shipping address
            paymentDetails // Save payment details
        });

        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ message: 'Error placing order', error: err.message });
    }
}

exports.getVendorOrders = async (req, res) => {
    try {
    const orders = await Order.find({ vendorId: req.user.id }) // FIX
      .populate('productId', 'name')
      .populate('supplierId', 'name');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
}

exports.getSupplierOrders = async (req, res) => {
  try {
    const orders = await Order.find({ supplierId: req.user.id }) // FIX
      .populate('productId', 'name')
      .populate('vendorId', 'name');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.supplierId.toString() !== req.user.id) { // FIX
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;
    await order.save();
    res.json({ message: 'Order updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order' });
  }
};