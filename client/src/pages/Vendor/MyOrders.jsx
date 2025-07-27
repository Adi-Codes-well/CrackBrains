import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  Star,
  IndianRupee,
  Calendar,
  MapPin,
  MessageSquare,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view your orders.');
          setLoading(false);
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/products/orders/vendor`, {
          headers: { 'Authorization': token }
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError('Could not load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const tabs = [
    { key: 'all', label: 'All Orders' },
    { key: 'Pending', label: 'Pending' },
    { key: 'Shipped', label: 'Shipped' },
    { key: 'Delivered', label: 'Delivered' },
  ];

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter(order => order.status === activeTab);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'Shipped': return <Truck className="w-5 h-5 text-blue-500" />;
      case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Placed on {new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          <span className="ml-2 capitalize">{order.status}</span>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{order.supplierId?.name || 'Supplier'}</span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex-1">
            <span className="text-gray-900">{order.productId?.name || 'Product'}</span>
            <span className="text-gray-500 ml-2">× {order.quantity}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <IndianRupee className="w-3 h-3" />
            <span>{(order.productId?.priceTiers?.[0]?.pricePerUnit * order.quantity).toLocaleString() || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 border-t border-gray-100">
        <span className="font-semibold text-gray-900">Total Amount:</span>
        <div className="flex items-center font-bold text-lg text-gray-900">
          <IndianRupee className="w-5 h-5" />
          <span>{(order.productId?.priceTiers?.[0]?.pricePerUnit * order.quantity).toLocaleString() || 'N/A'}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
        {order.status === 'Delivered' && (
          <Link to="/vendor/review" state={{ order }} className="flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors duration-200">
            <Star className="w-4 h-4 mr-2" />
            Write Review
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Order History</h1>
          <p className="text-gray-600">Track and manage all your orders in one place</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.key
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.key === 'all' ? orders.length : orders.filter(o => o.status === tab.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading your orders...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map(order => <OrderCard key={order._id} order={order} />)}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {activeTab === 'all'
                ? "You haven't placed any orders yet"
                : `No ${activeTab} orders at the moment`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;