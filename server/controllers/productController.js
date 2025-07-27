const Product = require('../models/Product');
const calculateTrustScore = require('../utils/calculateTrustScore');
const User = require('../models/User');

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Supplier only)
 */
exports.createProduct = async (req, res) => {
  try {
    if (req.user.role !== 'supplier') {
      return res.status(403).json({ message: 'Access denied. Only suppliers can create products.' });
    }

    const { name, description, priceTiers, category } = req.body;
    
    if (!name || !description || !priceTiers || !category) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one product image is required.' });
    }
    const images = req.files.map(file => file.path);

    const parsedTiers = JSON.parse(priceTiers);

    const product = new Product({
      name,
      description,
      images,
      priceTiers: parsedTiers,
      category,
      supplierId: req.user.id,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error('!!! FAILED TO CREATE PRODUCT !!!', err);
    res.status(500).json({ message: 'Error creating product on the server.', error: err.message });
  }
};

/**
 * @desc    Get all products with optional filtering
 * @route   GET /api/products
 * @access  Public
 */
exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, trustScoreMin } = req.query;
    let filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (category) filter.category = category;

    // Fetch products and populate supplier information.
    let products = await Product.find(filter)
      .populate({
        path: 'supplierId',
        select: 'name isVerifiedSupplier'
      });

    // DEFINITIVE FIX: Filter out any products where the supplierId was invalid and could not be populated.
    // This prevents crashes from bad data in the database.
    products = products.filter(p => p.supplierId);

    let filteredProducts = products.map(p => p.toObject()); // Convert to plain objects for modification
    
    // Price Filtering
    if (minPrice || maxPrice) {
      filteredProducts = filteredProducts.filter(prod => {
        if (!prod.priceTiers || prod.priceTiers.length === 0) return false;
        const minTierPrice = Math.min(...prod.priceTiers.map(t => t.pricePerUnit));
        return (!minPrice || minTierPrice >= minPrice) && (!maxPrice || minTierPrice <= maxPrice);
      });
    }

    // Trust Score Filtering
    if (trustScoreMin) {
      const trustFiltered = [];
      for (let product of filteredProducts) {
        const score = await calculateTrustScore(product.supplierId._id, product.supplierId.isVerifiedSupplier);
        if (score >= Number(trustScoreMin)) {
          product.trustScore = score;
          trustFiltered.push(product);
        }
      }
      return res.json(trustFiltered);
    }
    
    res.json(filteredProducts);
  } catch (err) {
    console.error('!!! ERROR FETCHING PRODUCTS !!!', err);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

/**
 * @desc    Get a single product by its ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplierId', 'name isVerifiedSupplier').lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error getting product by ID:', err);
    res.status(500).json({ message: 'Server error while fetching product details.' });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private (Supplier only)
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.supplierId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error while deleting product.' });
  }
};

exports.getSupplierProducts = async (req, res) => {
  try {
    // This ensures only suppliers can access this route
    if (req.user.role !== 'supplier') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    // Find all products that match the logged-in supplier's ID
    const products = await Product.find({ supplierId: req.user.id });
    res.json(products);
  } catch (err) {
    console.error('!!! ERROR FETCHING SUPPLIER PRODUCTS !!!', err);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};