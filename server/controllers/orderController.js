const Order = require('../models/Orders');
const User = require('../models/User');
const Product = require('../models/Product');


exports.placeOrder = async (req, res) => {
    try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const order = new Order({
      vendorId: req.user.userId,
      supplierId: product.supplierId,
      productId,
      quantity
    });

    await order.save();
    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
}

exports.getVendorOrders = async (req, res) => {
    try {
    const orders = await Order.find({ vendorId: req.user.userId })
      .populate('productId', 'name')
      .populate('supplierId', 'name');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
}

exports.getSupplierOrders = async (req, res) => {
  try {
    const orders = await Order.find({ supplierId: req.user.userId })
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

    if (order.supplierId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;
    await order.save();
    res.json({ message: 'Order updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order' });
  }
};