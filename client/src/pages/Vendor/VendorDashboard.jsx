import React, { useState, useEffect } from 'react';
import {
  Home,
  Search,
  ShoppingCart,
  Star,
  User,
  Package,
  CheckCircle,
  MessageSquare,
  TrendingUp,
  IndianRupee
} from 'lucide-react';
import axios from 'axios'; // For making API requests
import { Link } from 'react-router-dom'; // For navigation

const VendorDashboard = () => {
  const [vendorData, setVendorData] = useState(null);
  const [orders, setOrders] = useState([]);
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

        // 1. Fetch vendor's own profile data
        const userRes = await axios.get('${import.meta.env.VITE_APP_API_BASE_URL}/api/auth/me', {
          headers: { Authorization: token },
        });
        setVendorData(userRes.data);

        // 2. Fetch vendor's orders
        const ordersRes = await axios.get('${import.meta.env.VITE_APP_API_BASE_URL}/api/orders/vendor', {
          headers: { Authorization: token },
        });
        setOrders(ordersRes.data);

        // You might want to fetch reviews count here if you have a backend API for it
        // const reviewsRes = await axios.get('/api/reviews/vendor-count', { headers: { Authorization: token } });
        // setReviewsLeftCount(reviewsRes.data.count);

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
  const pendingOrdersCount = orders.filter(order => order.status === 'Pending' || order.status === 'Shipped').length;
  const deliveredOrdersCount = orders.filter(order => order.status === 'Delivered').length;
  // Note: 'Reviews Left' would require fetching reviews associated with the vendor,
  // which your current backend doesn't explicitly expose for a vendor to list their own reviews easily.
  // It's kept as illustrative for now.
  const reviewsLeftCount = 89; // Placeholder, modify if you implement a backend API for this

  const navigationItems = [
    { icon: Home, label: 'Dashboard', active: true, href: '/vendor/dashboard' },
    { icon: Search, label: 'Browse Products', href: '/browse' },
    { icon: ShoppingCart, label: 'My Orders', href: '/vendor/orders' },
    { icon: Star, label: 'My Reviews', href: '/vendor/reviews' }, // Assuming a /vendor/reviews route
    { icon: User, label: 'Profile', href: '/user-profile' }
  ];

  const statCards = [
    {
      title: 'Pending Orders',
      value: pendingOrdersCount,
      icon: Package,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Delivered Orders',
      value: deliveredOrdersCount,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Reviews Left',
      value: reviewsLeftCount, // This remains a placeholder unless you fetch actual review count
      icon: MessageSquare,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    }
  ];

  // Prepare recent activity (recent delivered or dispatched orders)
  const recentActivity = orders
    .filter(order => order.status === 'Delivered' || order.status === 'Shipped')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3) // Show top 3 recent activities
    .map(order => ({
      id: order._id.slice(-8),
      date: new Date(order.createdAt).toLocaleDateString('en-IN'),
      status: order.status,
      supplierName: order.supplierId?.name || 'Unknown Supplier',
      value: (order.productId?.priceTiers?.[0]?.pricePerUnit * order.quantity) || 0,
    }));

  if (loading) return <div className="text-center py-20">Loading Your Dashboard...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!vendorData) return <div className="text-center py-20">No vendor data available. Please log in as a vendor.</div>;


  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-emerald-400">VyaparSetu</h1>
          <p className="text-sm text-slate-400 mt-1">Business Bridge</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
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
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Placeholder for Vendor Trust Score / overall platform trust */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center text-sm text-slate-400">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>Platform Trust: High</span> {/* Static for now, as vendor trust score isn't modelled */}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, {vendorData.name}!</h2>
              <p className="text-gray-600 mt-1">Here's what's happening with your business today</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                Verified Vendor
              </span>
            </div>
          </div>
        </header>

        <section className="p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    </div>
                    <div className={`${card.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${card.textColor}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/browse" className="flex items-center justify-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors duration-200 group">
                <Search className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="text-emerald-700 font-medium">Browse Products</span>
              </Link>
              <Link to="/vendor/orders" className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 group">
                <ShoppingCart className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-700 font-medium">View Orders</span>
              </Link>
              <Link to="/vendor/review" className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 group">
                <Star className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-700 font-medium">Leave Review</span>
              </Link>
              <Link to="/user-profile" className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200 group">
                <User className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-orange-700 font-medium">Update Profile</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      {activity.status === 'Delivered' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Package className="w-5 h-5 text-orange-600" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Order #{activity.id} {activity.status === 'Delivered' ? 'delivered' : 'dispatched'} from {activity.supplierName}
                      </p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      <span>{activity.value.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600 py-8">No recent activity.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VendorDashboard;