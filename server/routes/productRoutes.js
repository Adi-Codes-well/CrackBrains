const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct
} = require('../controllers/productController');

// Create Product (Supplier only)
router.post('/', auth, upload.array('images', 5), createProduct);

// Get all products (Vendor browse)
router.get('/', getAllProducts);

// Get product by ID
router.get('/:id', getProductById);

// Delete product (Supplier only)
router.delete('/:id', auth, deleteProduct);

module.exports = router;
