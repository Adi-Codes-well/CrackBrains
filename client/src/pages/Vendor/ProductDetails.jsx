import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Star,
  Shield,
  IndianRupee,
  Truck,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  CheckCircle,
  MapPin,
  MessageSquare,
} from "lucide-react";
import ReviewCard from "../../common/ReviewCard"; // Import the review card component
import { X } from "lucide-react";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    contactNumber: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();
  

   useEffect(() => {
    if (!id) {
      setError("No product ID provided.");
      setLoading(false);
      return;
    }

    const fetchProductData = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        
        // Fetch all data in parallel for better performance
        const [productRes, reviewsRes, userRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_API_URL}/api/products/${id}`),
          axios.get(`${import.meta.env.VITE_APP_API_URL}/api/reviews/product/${id}`),
          axios.get(`${import.meta.env.VITE_APP_API_URL}/api/auth/me`, {
            headers: { Authorization: token },
          }),
        ]);

        setProduct(productRes.data);
        setReviews(reviewsRes.data);
        setUserData(userRes.data);

        // Set initial quantity based on the first price tier
        if (productRes.data.priceTiers && productRes.data.priceTiers.length > 0) {
          setQuantity(productRes.data.priceTiers[0].minQty || 1);
        }

      } catch (err) {
        console.error("Failed to fetch product data:", err);
        setError("Could not find this product. It may have been removed.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

   const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const openCheckoutModal = () => {
    setIsCheckoutModalOpen(true);
  };

  // --- PAYMENT & ORDER LOGIC ---
  const handleConfirmAndPay = async () => {
    // Simple validation
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.contactNumber) {
        alert("Please fill out all shipping address fields.");
        return;
    }
    
    setIsProcessingPayment(true);
    const token = localStorage.getItem('token');
    const currentPriceTier = [...(product.priceTiers || [])].sort((a, b) => b.minQty - a.minQty).find(tier => quantity >= tier.minQty);
    const totalPrice = currentPriceTier ? currentPriceTier.pricePerUnit * quantity : 0;

    try {
        // 1. Create Razorpay Order from backend
        const { data: { orderId } } = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/api/payment/create-order`,
            { amount: totalPrice },
            { headers: { Authorization: token } }
        );

        // 2. Configure Razorpay options
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: totalPrice * 100,
            currency: "INR",
            name: "VyaparSetu",
            description: `Order for ${product.name}`,
            order_id: orderId,
            handler: async function (response) {
                // 3. On successful payment, save the order to your DB
                const paymentDetails = {
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    paymentStatus: 'Paid',
                };

                await axios.post(
                    `${import.meta.env.VITE_APP_API_URL}/api/orders`,
                    {
                        productId: product._id,
                        quantity,
                        totalAmount: totalPrice,
                        shippingAddress,
                        paymentDetails,
                    },
                    { headers: { Authorization: token } }
                );

                alert("Payment successful and order placed!");
                setIsCheckoutModalOpen(false);
                navigate('/vendor/orders');
            },
            prefill: {
                name: userData?.name,
                email: userData?.email,
                contact: shippingAddress.contactNumber,
            },
            theme: {
                color: "#10b981" // Emerald color
            }
        };

        // 4. Open Razorpay checkout modal
        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on('payment.failed', function (response){
            alert("Payment failed. Please try again. Reason: " + response.error.description);
            setIsProcessingPayment(false);
        });

    } catch (error) {
        console.error("Payment initiation failed:", error);
        alert("Could not initiate payment. Please try again.");
        setIsProcessingPayment(false);
    }
  };

  // const handlePlaceOrder = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("Please log in to place an order.");
  //     navigate("/login");
  //     return;
  //   }
  //   try {
  //     await axios.post(
  //       `${import.meta.env.VITE_APP_API_URL}/api/orders`,
  //       { productId: product._id, quantity },
  //       { headers: { Authorization: token } }
  //     );
  //     alert("Order placed successfully!");
  //     navigate("/vendor/orders");
  //   } catch (err) {
  //     alert(
  //       "Failed to place order. " +
  //         (err.response?.data?.message || "Please try again.")
  //     );
  //   }
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        Product data could not be loaded.
      </div>
    );
  }

  const currentPriceTier = [...(product.priceTiers || [])]
    .sort((a, b) => b.minQty - a.minQty)
    .find((tier) => quantity >= tier.minQty);

  const totalPrice = currentPriceTier
    ? currentPriceTier.pricePerUnit * quantity
    : 0;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "N/A";

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
  //       <div className="max-w-7xl mx-auto">
  //         <Link
  //           to="/vendor/browse"
  //           className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
  //         >
  //           <ArrowLeft className="w-5 h-5 mr-2" />
  //           Back to Products
  //         </Link>
  //       </div>
  //     </div>

  //     <main className="max-w-7xl mx-auto p-4 md:p-6">
  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
  //         {/* Image Gallery */}
  //         <div>
  //           <img
  //             src={
  //               product.images && product.images.length > 0
  //                 ? product.images[0]
  //                 : "https://via.placeholder.com/600"
  //             }
  //             alt={product.name}
  //             className="w-full h-auto object-cover rounded-xl shadow-lg border border-gray-200"
  //           />
  //         </div>

  //         {/* Product Info */}
  //         <div className="space-y-6">
  //           <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
  //             {product.name}
  //           </h1>
  //           <p className="text-gray-700 leading-relaxed">
  //             {product.description}
  //           </p>

  //           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
  //             <div className="font-semibold text-gray-900 mb-2">
  //               Supplier: {product.supplierId?.name || "N/A"}
  //             </div>
  //             {product.supplierId?.isVerifiedSupplier && (
  //               <span className="text-sm text-green-700 font-medium inline-flex items-center bg-green-50 px-2 py-1 rounded-full">
  //                 <Shield size={16} className="mr-1.5" /> Verified Supplier
  //               </span>
  //             )}
  //           </div>

  //           <div>
  //             <h3 className="text-lg font-semibold text-gray-900 mb-3">
  //               Wholesale Pricing
  //             </h3>
  //             <div className="space-y-2">
  //               {product.priceTiers
  //                 ?.sort((a, b) => a.minQty - b.minQty)
  //                 .map((tier, index) => (
  //                   <div
  //                     key={index}
  //                     className={`flex justify-between items-center p-3 rounded-lg border-2 transition-all ${
  //                       currentPriceTier &&
  //                       tier.minQty === currentPriceTier.minQty
  //                         ? "border-emerald-500 bg-emerald-50"
  //                         : "border-gray-200"
  //                     }`}
  //                   >
  //                     <span className="font-medium text-gray-700">
  //                       {tier.minQty}+ units
  //                     </span>
  //                     <span className="font-semibold text-gray-900">
  //                       ₹{tier.pricePerUnit.toLocaleString()}/unit
  //                     </span>
  //                   </div>
  //                 ))}
  //             </div>
  //           </div>

  //           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
  //             <div className="flex items-center space-x-3 mb-4">
  //               <button
  //                 onClick={() =>
  //                   setQuantity((q) =>
  //                     Math.max(product.priceTiers[0]?.minQty || 1, q - 1)
  //                   )
  //                 }
  //                 className="p-2 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
  //                 disabled={quantity <= (product.priceTiers[0]?.minQty || 1)}
  //               >
  //                 <Minus size={16} />
  //               </button>
  //               <input
  //                 type="number"
  //                 value={quantity}
  //                 onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
  //                 className="w-full text-center py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
  //               />
  //               <button
  //                 onClick={() => setQuantity((q) => q + 1)}
  //                 className="p-2 border rounded-lg hover:bg-gray-100 transition"
  //               >
  //                 <Plus size={16} />
  //               </button>
  //             </div>
  //             <div className="text-lg font-semibold mb-4 text-center">
  //               Total Price:{" "}
  //               <span className="text-2xl text-emerald-600">
  //                 ₹{totalPrice.toLocaleString()}
  //               </span>
  //             </div>
  //             <button
  //               onClick={handlePlaceOrder}
  //               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-transform transform hover:scale-105"
  //             >
  //               <ShoppingCart className="w-5 h-5 mr-2" /> Place Order
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* --- NEW REVIEWS SECTION --- */}
  //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  //         <div className="flex items-center mb-6">
  //           <MessageSquare className="w-6 h-6 text-gray-800 mr-3" />
  //           <h2 className="text-2xl font-bold text-gray-900">
  //             Community Reviews
  //           </h2>
  //         </div>
  //         {reviews.length > 0 ? (
  //           <div>
  //             <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-lg">
  //               <div className="text-4xl font-bold text-emerald-600">
  //                 {averageRating}
  //               </div>
  //               <div className="ml-4">
  //                 <div className="flex">
  //                   {[...Array(5)].map((_, i) => (
  //                     <Star
  //                       key={i}
  //                       className={`w-5 h-5 ${
  //                         i < Math.round(averageRating)
  //                           ? "text-yellow-400 fill-current"
  //                           : "text-gray-300"
  //                       }`}
  //                     />
  //                   ))}
  //                 </div>
  //                 <div className="text-sm text-gray-600">
  //                   Based on {reviews.length} review(s)
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //               {reviews.map((review) => (
  //                 <ReviewCard
  //                   key={review._id}
  //                   userName={review.vendorId?.name || "Anonymous Vendor"}
  //                   date={review.createdAt}
  //                   rating={review.rating}
  //                   comment={review.comment}
  //                   photoUrl={review.image}
  //                 />
  //               ))}
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="text-center py-8">
  //             <p className="text-gray-600">
  //               No reviews yet for this product. Be the first to leave one!
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </main>
  //   </div>
  // );

return (
    <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto">

                <Link to="/browse" className="flex items-center text-gray-600 hover:text-gray-900 font-medium">

                
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Products
                </Link></a>
            </div>
        </div>

        <main className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                    
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="font-semibold text-gray-900 mb-2">Supplier: {product.supplierId?.name || 'N/A'}</div>
                        {product.supplierId?.isVerifiedSupplier && 
                          <span className="text-sm text-green-700 font-medium inline-flex items-center bg-green-50 px-2 py-1 rounded-full">
                            <Shield size={16} className="mr-1.5"/> Verified Supplier
                          </span>
                        }
                    </div>

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
                    
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
                        <div className="flex items-center space-x-3 mb-4">
                            <button onClick={() => setQuantity(q => Math.max(product.priceTiers[0]?.minQty || 1, q - 1))} className="p-2 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50" disabled={quantity <= (product.priceTiers[0]?.minQty || 1)}><Minus size={16}/></button>
                            <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} className="w-full text-center py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
                            <button onClick={() => setQuantity(q => q + 1)} className="p-2 border rounded-lg hover:bg-gray-100 transition"><Plus size={16}/></button>
                        </div>
                        <div className="text-lg font-semibold mb-4 text-center">Total Price: <span className="text-2xl text-emerald-600">₹{totalPrice.toLocaleString()}</span></div>
                        <button onClick={openCheckoutModal} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-transform transform hover:scale-105">
                            <ShoppingCart className="w-5 h-5 mr-2" /> Place Order
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                    <MessageSquare className="w-6 h-6 text-gray-800 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Community Reviews</h2>
                </div>
                {reviews.length > 0 ? (
                    <div>
                        <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-lg">
                            <div className="text-4xl font-bold text-emerald-600">{averageRating}</div>
                            <div className="ml-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <div className="text-sm text-gray-600">Based on {reviews.length} review(s)</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {reviews.map(review => (
                                <ReviewCard 
                                    key={review._id}
                                    userName={review.vendorId?.name || "Anonymous Vendor"}
                                    date={review.createdAt}
                                    rating={review.rating}
                                    comment={review.comment}
                                    photoUrl={review.image}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No reviews yet for this product. Be the first to leave one!</p>
                    </div>
                )}
            </div>
        </main>

        {/* --- CHECKOUT MODAL --- */}
        {isCheckoutModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg transform transition-all duration-300 scale-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Confirm Order & Shipping</h2>
                        <button onClick={() => setIsCheckoutModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
                    </div>
                    
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Street Address</label>
                            <input name="street" value={shippingAddress.street} onChange={handleAddressChange} required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input name="city" value={shippingAddress.city} onChange={handleAddressChange} required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">State</label>
                                <input name="state" value={shippingAddress.state} onChange={handleAddressChange} required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                <input name="zipCode" value={shippingAddress.zipCode} onChange={handleAddressChange} required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                                <input name="contactNumber" type="tel" value={shippingAddress.contactNumber} onChange={handleAddressChange} required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                            </div>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Total Amount:</span>
                            <span className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={handleConfirmAndPay}
                            disabled={isProcessingPayment}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-200 disabled:bg-emerald-300"
                        >
                            {isProcessingPayment ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                `Confirm & Pay`
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};


export default ProductDetails;
