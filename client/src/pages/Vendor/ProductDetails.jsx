import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, Shield, IndianRupee, Truck, Plus, Minus, ShoppingCart, ArrowLeft, CheckCircle, MapPin } from 'lucide-react';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // **FIX:** Ensure we only fetch data if a valid 'id' exists.
    if (!id) {
      setError("No product ID provided in the URL.");
      setLoading(false);
      return; // Stop the effect from running further
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        // Set initial quantity based on the first price tier's minimum
        if (res.data.priceTiers && res.data.priceTiers.length > 0) {
          setQuantity(res.data.priceTiers[0].minQty || 1);
        }
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setError("Could not find this product. It may have been removed or the link is incorrect.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // This effect re-runs ONLY when the `id` from the URL changes

  const handlePlaceOrder = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
          alert("Please log in to place an order.");
          navigate('/login'); // Redirect to login if not authenticated
          return;
      }
      try {
          await axios.post(`/api/orders`, 
              { productId: product._id, quantity },
              { headers: { 'Authorization': token } }
          );
          alert("Order placed successfully!");
          navigate('/vendor/orders'); // Redirect to orders page after success
      } catch (err) {
          alert("Failed to place order. " + (err.response?.data?.message || 'Please try again.'));
      }
  };

  // --- Render Logic ---

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading product details...</div>;
  }
  
  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center h-screen">Product data could not be loaded.</div>;
  }

  // Safely calculate the current price tier and total price
  const currentPriceTier = [...(product.priceTiers || [])]
    .sort((a, b) => b.minQty - a.minQty) // Sort descending to find the highest applicable tier
    .find(tier => quantity >= tier.minQty);
    
  const totalPrice = currentPriceTier ? currentPriceTier.pricePerUnit * quantity : 0;

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto">
                <Link to="/vendor/browse" className="flex items-center text-gray-600 hover:text-gray-900 font-medium">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Products
                </Link>
            </div>
        </div>

        <main className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                    <img 
                      src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/600'} 
                      alt={product.name} 
                      className="w-full h-auto object-cover rounded-xl shadow-lg border border-gray-200"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    
                    {/* Supplier Info Card */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="font-semibold text-gray-900 mb-2">Supplier: {product.supplierId?.name || 'N/A'}</div>
                        {product.supplierId?.isVerifiedSupplier && 
                          <span className="text-sm text-green-700 font-medium inline-flex items-center bg-green-50 px-2 py-1 rounded-full">
                            <Shield size={16} className="mr-1.5"/> Verified Supplier
                          </span>
                        }
                    </div>

                    {/* Pricing Tiers */}
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Wholesale Pricing</h3>
                        <div className="space-y-2">
                            {product.priceTiers?.sort((a,b) => a.minQty - b.minQty).map((tier, index) => (
                                <div key={index} className={`flex justify-between items-center p-3 rounded-lg border-2 transition-all ${currentPriceTier && tier.minQty === currentPriceTier.minQty ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
                                    <span className="font-medium text-gray-700">{tier.minQty}+ units</span>
                                    <span className="font-semibold text-gray-900">₹{tier.pricePerUnit.toLocaleString()}/unit</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Section */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
                        <div className="flex items-center space-x-3 mb-4">
                            <button onClick={() => setQuantity(q => Math.max(product.priceTiers[0]?.minQty || 1, q - 1))} className="p-2 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50" disabled={quantity <= (product.priceTiers[0]?.minQty || 1)}><Minus size={16}/></button>
                            <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} className="w-full text-center py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
                            <button onClick={() => setQuantity(q => q + 1)} className="p-2 border rounded-lg hover:bg-gray-100 transition"><Plus size={16}/></button>
                        </div>
                        <div className="text-lg font-semibold mb-4 text-center">Total Price: <span className="text-2xl text-emerald-600">₹{totalPrice.toLocaleString()}</span></div>
                        <button onClick={handlePlaceOrder} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-transform transform hover:scale-105">
                            <ShoppingCart className="w-5 h-5 mr-2" /> Place Order
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

export default ProductDetails;