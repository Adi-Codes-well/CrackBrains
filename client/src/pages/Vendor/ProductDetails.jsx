import React, { useState } from 'react';
import {
  Star,
  Shield,
  MapPin,
  IndianRupee,
  Truck,
  Award,
  Phone,
  Mail,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  CheckCircle,
  Clock
} from 'lucide-react';

const ProductDetail = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: '1',
    name: 'Premium Basmati Rice 25kg',
    category: 'Food & Beverages',
    description:
      'Premium quality aged Basmati rice sourced directly from the fertile plains of Punjab. This long-grain rice is known for its distinctive aroma, fluffy texture, and excellent cooking properties. Perfect for restaurants, hotels, and retail stores looking to offer their customers the finest quality rice.',
    specifications: {
      'Grain Length': '6.5-7.0 mm',
      'Moisture Content': '12-13%',
      'Broken Grains': 'Less than 2%',
      Purity: '99.5%',
      'Shelf Life': '24 months',
      Packaging: '25kg PP bags'
    },
    images: [
      'https://images.pexels.com/photos/33239/rice-grain-seed-food.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    supplier: {
      name: 'GoodGrain Wholesalers',
      trustScore: 4.8,
      verified: true,
      location: 'Delhi, India',
      phone: '+91 98765 43210',
      email: 'orders@goodgrain.com',
      totalOrders: 2847,
      responseTime: '< 2 hours'
    },
    pricing: [
      { minQuantity: 1, maxQuantity: 9, price: 2500 },
      { minQuantity: 10, maxQuantity: 24, price: 2300, savings: 8 },
      { minQuantity: 25, maxQuantity: 49, price: 2100, savings: 16 },
      { minQuantity: 50, price: 1950, savings: 22 }
    ],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    minOrderQuantity: 1,
    deliveryTime: '2-3 business days',
    features: [
      'Premium aged Basmati rice',
      'Direct from Punjab farms',
      'Minimal broken grains',
      'Excellent aroma and taste',
      'Bulk packaging available',
      'Quality guaranteed'
    ]
  };

  const getCurrentPrice = () => {
    for (const tier of product.pricing) {
      if (quantity >= tier.minQuantity && (!tier.maxQuantity || quantity <= tier.maxQuantity)) {
        return tier;
      }
    }
    return product.pricing[0];
  };

  const currentPriceTier = getCurrentPrice();
  const totalPrice = currentPriceTier.price * quantity;

  const TrustScoreBadge = ({ score }) => (
    <div className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
      <Star className="w-4 h-4 mr-1 fill-current" />
      <span>{score} Trust Score</span>
    </div>
  );

  const VerificationBadge = ({ verified }) =>
    verified ? (
      <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
        <Shield className="w-4 h-4 mr-1" />
        <span>Verified Supplier</span>
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <button className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Products</span>
          </button>
          <div className="text-sm text-gray-500">
            <span>Food & Beverages</span> /{' '}
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? 'border-emerald-500 ring-2 ring-emerald-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {product.category}
                </span>
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Supplier */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {product.supplier.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{product.supplier.location}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <TrustScoreBadge score={product.supplier.trustScore} />
                  <VerificationBadge verified={product.supplier.verified} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-gray-400 mr-2" />
                  <span>
                    {product.supplier.totalOrders.toLocaleString()} orders
                    completed
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Responds in {product.supplier.responseTime}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{product.supplier.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{product.supplier.email}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Specifications
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">{key}:</span>
                        <span className="text-gray-900 font-medium">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Tiered Pricing
              </h3>
              <div className="space-y-2">
                {product.pricing.map((tier, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 ${
                      quantity >= tier.minQuantity &&
                      (!tier.maxQuantity || quantity <= tier.maxQuantity)
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">
                        {tier.minQuantity}
                        {tier.maxQuantity
                          ? `-${tier.maxQuantity}`
                          : '+'} units
                      </span>
                      {tier.savings && (
                        <span className="ml-2 bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                          Save {tier.savings}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center font-semibold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{tier.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 ml-1">
                        per unit
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-4">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">
                    Current Price
                  </div>
                  <div className="flex items-center justify-center text-2xl font-bold text-gray-900">
                    <IndianRupee className="w-6 h-6" />
                    <span>{currentPriceTier.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      per unit
                    </span>
                  </div>
                  {currentPriceTier.savings && (
                    <div className="text-sm text-emerald-600 font-medium">
                      You save {currentPriceTier.savings}% on this quantity
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (Min: {product.minOrderQuantity})
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.max(product.minOrderQuantity, quantity - 1)
                        )
                      }
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(
                            product.minOrderQuantity,
                            parseInt(e.target.value) || product.minOrderQuantity
                          )
                        )
                      }
                      className="flex-1 text-center py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min={product.minOrderQuantity}
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total Price:</span>
                    <div className="flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      <span>{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Estimated delivery: {product.deliveryTime}</span>
                </div>

                <button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? 'Place Order' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
