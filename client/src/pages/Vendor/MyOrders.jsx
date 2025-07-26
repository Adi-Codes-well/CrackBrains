import React, { useState } from 'react';
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

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('all');

  const mockOrders = [
    {
      id: '1',
      orderNumber: 'VY-2024-0089',
      date: '2024-01-15',
      supplier: 'GoodGrain Wholesalers',
      supplierLocation: 'Delhi',
      items: [
        { name: 'Premium Basmati Rice 25kg', quantity: 5, price: 2200 },
        { name: 'Organic Turmeric Powder 1kg', quantity: 10, price: 380 },
      ],
      totalAmount: 14800,
      status: 'delivered',
      actualDelivery: '2024-01-18',
      trackingNumber: 'TRK123456789',
      canReview: true,
      hasReviewed: false,
    },
    {
      id: '2',
      orderNumber: 'VY-2024-0090',
      date: '2024-01-20',
      supplier: 'SpiceKing Distributors',
      supplierLocation: 'Kerala',
      items: [{ name: 'Coconut Oil 1L Bottles', quantity: 30, price: 150 }],
      totalAmount: 4500,
      status: 'shipped',
      estimatedDelivery: '2024-01-25',
      trackingNumber: 'TRK987654321',
      canReview: false,
      hasReviewed: false,
    },
    {
      id: '3',
      orderNumber: 'VY-2024-0091',
      date: '2024-01-22',
      supplier: 'TextileMart India',
      supplierLocation: 'Tamil Nadu',
      items: [{ name: 'Cotton T-Shirts Pack of 12', quantity: 3, price: 1500 }],
      totalAmount: 4500,
      status: 'pending',
      estimatedDelivery: '2024-01-28',
      canReview: false,
      hasReviewed: false,
    },
    {
      id: '4',
      orderNumber: 'VY-2024-0088',
      date: '2024-01-10',
      supplier: 'BrightLight Solutions',
      supplierLocation: 'Gujarat',
      items: [{ name: 'LED Bulbs 9W Pack of 10', quantity: 15, price: 650 }],
      totalAmount: 9750,
      status: 'delivered',
      actualDelivery: '2024-01-14',
      trackingNumber: 'TRK555666777',
      canReview: true,
      hasReviewed: true,
    },
  ];

  const tabs = [
    { key: 'all', label: 'All Orders', count: mockOrders.length },
    { key: 'pending', label: 'Pending', count: mockOrders.filter(o => o.status === 'pending').length },
    { key: 'shipped', label: 'Shipped', count: mockOrders.filter(o => o.status === 'shipped').length },
    { key: 'delivered', label: 'Delivered', count: mockOrders.filter(o => o.status === 'delivered').length },
  ];

  const filteredOrders = activeTab === 'all'
    ? mockOrders
    : mockOrders.filter(order => order.status === activeTab);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return '';
    }
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderNumber}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Placed on {new Date(order.date).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="ml-2 capitalize">{order.status}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{order.supplier} • {order.supplierLocation}</span>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex-1">
              <span className="text-gray-900">{item.name}</span>
              <span className="text-gray-500 ml-2">× {item.quantity}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <IndianRupee className="w-3 h-3" />
              <span>{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between py-3 border-t border-gray-100">
        <span className="font-semibold text-gray-900">Total Amount:</span>
        <div className="flex items-center font-bold text-lg text-gray-900">
          <IndianRupee className="w-5 h-5" />
          <span>{order.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {order.status === 'shipped' && order.estimatedDelivery && (
        <div className="bg-blue-50 p-3 rounded-lg mt-4">
          <div className="flex items-center text-sm text-blue-700">
            <Truck className="w-4 h-4 mr-2" />
            <span>Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}</span>
          </div>
          {order.trackingNumber && (
            <div className="text-xs text-blue-600 mt-1">
              Tracking: {order.trackingNumber}
            </div>
          )}
        </div>
      )}

      {order.status === 'delivered' && order.actualDelivery && (
        <div className="bg-green-50 p-3 rounded-lg mt-4">
          <div className="flex items-center text-sm text-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Delivered on {new Date(order.actualDelivery).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>

        {order.trackingNumber && (
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200">
            <Truck className="w-4 h-4 mr-2" />
            Track Order
          </button>
        )}

        {order.canReview && !order.hasReviewed && (
          <button className="flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors duration-200">
            <Star className="w-4 h-4 mr-2" />
            Write Review
          </button>
        )}

        {order.hasReviewed && (
          <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50 rounded-lg">
            <MessageSquare className="w-4 h-4 mr-2" />
            Review Submitted
          </div>
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
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
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
