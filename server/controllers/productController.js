const Product = require('../models/Product');
const calculateTrustScore = require('../utils/calculateTrustScore');
const User = require('../models/User');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, priceTiers, category } = req.body;
    const images = req.files.map(file => file.path);

    const parsedTiers = JSON.parse(priceTiers); // [{minQty: 1, pricePerUnit: 100}, ...]

    const product = new Product({
      name,
      description,
      images,
      priceTiers: parsedTiers,
      category,
      supplierId: req.user.userId,
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, trustScoreMin } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // case-insensitive search
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).populate('supplierId', 'name isVerifiedSupplier');

    // Price Filtering (per unit lowest tier)
    let filteredProducts = products;
    if (minPrice || maxPrice) {
      filteredProducts = filteredProducts.filter(prod => {
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
          product = product.toObject();
          product.trustScore = score;
          trustFiltered.push(product);
        }
      }
      return res.json(trustFiltered);
    }

    res.json(filteredProducts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplierId', 'name isVerifiedSupplier');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.supplierId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};