const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');


const {
  placeOrder, getVendorOrders, getSupplierOrders, updateOrderStatus
} = require('../controllers/orderController');

router.post('/', auth, placeOrder);
router.get('/vendor', auth, getVendorOrders);
router.get('/supplier', auth, getSupplierOrders);
router.patch('/:id', auth, updateOrderStatus);

module.exports = router;
