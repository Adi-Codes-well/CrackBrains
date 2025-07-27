import React, { useState, useEffect } from 'react';
import {
  Home,
  Package,
  ShoppingBag,
  Star,
  User,
  TrendingUp,
  IndianRupee,
  Clock,
  CheckCircle,
  Award,
  Eye
} from 'lucide-react';
import TrustScoreDisplay from './TrustScoreDisplay'; // Component to display trust score
import axios from 'axios'; // For making API requests
import { Link } from 'react-router-dom'; // For navigation

const SupplierDashboard = () => {
  const [supplierData, setSupplierData] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [trustScore, setTrustScore] = useState(null); // State for dynamic trust score
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found. Please log in.');
          setLoading(false);
          return;
        }

        // 1. Fetch supplier's own profile data
        const userRes = await axios.get('${import.meta.env.VITE_APP_API_BASE_URL}/auth/me', {
          headers: { Authorization: token },
        });
        setSupplierData(userRes.data);
        const currentSupplierId = userRes.data._id; // Get supplier ID for trust score

        // 2. Fetch supplier's products
        const productsRes = await axios.get('${import.meta.env.VITE_APP_API_BASE_URL}/products/myproducts', {
          headers: { Authorization: token },
        });
        setProducts(productsRes.data);

        // 3. Fetch supplier's orders
        const ordersRes = await axios.get('${import.meta.env.VITE_APP_API_BASE_URL}/orders/supplier', {
          headers: { Authorization: token },
        });
        setOrders(ordersRes.data);

        // 4. Fetch trust score for the current supplier
        const trustRes = await axios.get(`/api/trust/${currentSupplierId}`, {
            headers: { Authorization: token },
        });
        setTrustScore(trustRes.data.trustScore);

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError('Could not load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Calculate dynamic statistics based on fetched data
  const totalRevenue = orders.reduce((sum, order) => {
    // Assuming product.priceTiers[0].pricePerUnit is the base price for calculation
    const productPrice = order.productId?.priceTiers?.[0]?.pricePerUnit || 0;
    return sum + (productPrice * order.quantity);
  }, 0);

  const newOrdersCount = orders.filter(order => order.status === 'Pending').length;
  const productsListedCount = products.length;
  // Assuming products have a 'status' field for active products (not explicitly in schema, but good for dynamic example)
  const activeProductsCount = products.filter(product => product.status === 'active').length;


  // Navigation items with updated href for proper routing
  const navigationItems = [
    { icon: Home, label: 'Dashboard', active: true, href: '/supplier/dashboard' },
    { icon: Package, label: 'Add Product', href: '/supplier/add-product' },
    { icon: ShoppingBag, label: 'Orders Received', href: '/supplier/orders-received' },
    { icon: Star, label: 'Reviews', href: '/supplier/reviews' }, // Assuming a /supplier/reviews route exists
    { icon: User, label: 'Profile', href: '/user-profile' }
  ];

  // Dynamic data for stat cards
  const statCards = [
    {
      title: 'Total Revenue',
      value: `Rs. ${totalRevenue.toLocaleString('en-IN')}`, // Format as Indian Rupees
      icon: IndianRupee,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      change: 'Based on fulfilled orders'
    },
    {
      title: 'New Orders',
      value: newOrdersCount,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: `${newOrdersCount} pending`
    },
    {
      title: 'Products Listed',
      value: productsListedCount,
      icon: Package,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: `${activeProductsCount} active`
    }
  ];

  // Prepare recent orders for display
  const recentOrdersDisplay = orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by most recent
    .slice(0, 5) // Display only the top 5 recent orders
    .map(order => ({
      id: order._id.slice(-8), // Show last 8 characters of order ID
      date: new Date(order.createdAt).toLocaleDateString('en-IN'),
      vendor: order.vendorId?.name || 'Unknown Vendor',
      location: 'N/A', // Set to N/A as location is not in User model
      items: order.quantity,
      value: (order.productId?.priceTiers?.[0]?.pricePerUnit * order.quantity) || 0,
      status: order.status === 'Pending' ? 'new' : 'fulfilled'
    }));

  // Render loading, error, or data
  if (loading) return <div className="text-center py-20">Loading Your Dashboard...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!supplierData) return <div className="text-center py-20">No supplier data available. Please log in as a supplier.</div>;


  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col fixed h-full">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-emerald-400">VyaparSetu</h1>
          <p className="text-sm text-slate-400 mt-1">Supplier Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      item.active
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section - Supplier Verification Status */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center text-sm text-slate-400">
            <Award className="w-4 h-4 mr-2" />
            <span>{supplierData.isVerifiedSupplier ? 'Verified Supplier' : 'Verification Pending'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, {supplierData.name}!</h2>
              <p className="text-gray-600 mt-1">Manage your products and orders efficiently</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                {supplierData.verificationStatus === 'approved' ? 'Premium Supplier' : 'Awaiting Verification'}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Trust Score Display Component */}
          <div className="mb-8">
            {/* Pass the dynamically fetched trustScore to TrustScoreDisplay */}
            <TrustScoreDisplay score={trustScore} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{card.change}</p>
                    </div>
                    <div className={`${card.bgColor} p-3 rounded-lg`}>
                      <IconComponent className={`w-6 h-6 ${card.textColor}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Incoming Orders</h3>
              <Link to="/supplier/orders-received" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View All Orders
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentOrdersDisplay.length > 0 ? (
                recentOrdersDisplay.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.status === 'new' ? 'bg-orange-100' : 'bg-green-100'
                      }`}>
                        {order.status === 'new' ? (
                          <Clock className="w-5 h-5 text-orange-600" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.vendor} - {order.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{order.items} items</p>
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          <span>{order.value.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      
                      <Link to={`/supplier/orders-received?orderId=${order.id}`} className="flex items-center px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600 py-8">No recent orders.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupplierDashboard;