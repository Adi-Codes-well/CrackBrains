const mongoose = require("mongoose");

const priceTierSchema = new mongoose.Schema({
  minQty: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  images: [String],
  priceTiers: [priceTierSchema],
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
