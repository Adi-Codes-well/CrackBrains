import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Clock, CheckCircle, Search, Filter, Truck } from 'lucide-react'; // FIX: Added Truck icon
import OrderManageCard from './OrderManageCard';

const OrdersReceived = () => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('${import.meta.env.VITE_APP_API_BASE_URL}/api/orders/supplier', {
        headers: { Authorization: token },
      });
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/orders/${orderId}`, { status }, {
        headers: { Authorization: token },
      });
      // Re-fetch orders to show the update
      fetchOrders();
    } catch (err) {
      alert('Failed to update order status.');
      console.error(err);
    }
  };

  const tabs = [
    { key: 'Pending', label: 'New Orders', icon: Clock },
    { key: 'Shipped', label: 'Shipped', icon: Truck },
    { key: 'Delivered', label: 'Fulfilled', icon: CheckCircle },
  ];

  const filteredOrders = orders
    .filter(order => order.status === activeTab)
    .filter(order =>
      searchTerm === '' ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.vendorId && order.vendorId.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Incoming Orders</h1>
          <p className="text-gray-600">Manage and fulfill orders from your customers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID or vendor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
                    activeTab === tab.key
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  <span>{tab.label}</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {orders.filter(o => o.status === tab.key).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading orders...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <OrderManageCard key={order._id} order={order} onStatusUpdate={handleStatusUpdate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab.toLowerCase()} orders</h3>
            <p className="text-gray-600">
              Orders with this status will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrdersReceived;