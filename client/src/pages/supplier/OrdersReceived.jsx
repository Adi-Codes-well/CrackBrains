import React, { useState } from 'react';
import { Package, Clock, CheckCircle, Search, Filter } from 'lucide-react';
import OrderManageCard from './OrderManageCard';

const OrdersReceived = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [searchTerm, setSearchTerm] = useState('');

  const mockOrders = [
    {
      id: '1',
      orderNumber: 'ORD-2024-0156',
      date: '2024-01-25',
      vendor: {
        name: 'Sharma General Store',
        location: 'Mumbai, Maharashtra',
        phone: '+91 98765 43210',
        email: 'sharma.store@email.com'
      },
      items: [
        { name: 'Premium Basmati Rice 25kg', quantity: 5, price: 2200 },
        { name: 'Organic Turmeric Powder 1kg', quantity: 10, price: 380 }
      ],
      totalAmount: 14800,
      status: 'new',
      priority: 'urgent'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-0155',
      date: '2024-01-25',
      vendor: {
        name: 'Krishna Traders',
        location: 'Delhi, India',
        phone: '+91 87654 32109',
        email: 'krishna.traders@email.com'
      },
      items: [
        { name: 'Coconut Oil 1L Bottles', quantity: 30, price: 150 }
      ],
      totalAmount: 4500,
      status: 'new',
      priority: 'normal'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-0154',
      date: '2024-01-24',
      vendor: {
        name: 'Patel Kirana',
        location: 'Ahmedabad, Gujarat',
        phone: '+91 76543 21098',
        email: 'patel.kirana@email.com'
      },
      items: [
        { name: 'Premium Basmati Rice 25kg', quantity: 3, price: 2200 },
        { name: 'Organic Turmeric Powder 1kg', quantity: 15, price: 380 }
      ],
      totalAmount: 12300,
      status: 'fulfilled',
      priority: 'normal'
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-0153',
      date: '2024-01-24',
      vendor: {
        name: 'Modern Store',
        location: 'Pune, Maharashtra',
        phone: '+91 65432 10987',
        email: 'modern.store@email.com'
      },
      items: [
        { name: 'Premium Basmati Rice 25kg', quantity: 1, price: 2500 }
      ],
      totalAmount: 2500,
      status: 'fulfilled',
      priority: 'normal'
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-0152',
      date: '2024-01-23',
      vendor: {
        name: 'City Mart',
        location: 'Bangalore, Karnataka',
        phone: '+91 54321 09876',
        email: 'city.mart@email.com'
      },
      items: [
        { name: 'Coconut Oil 1L Bottles', quantity: 25, price: 150 },
        { name: 'Organic Turmeric Powder 1kg', quantity: 12, price: 380 }
      ],
      totalAmount: 8310,
      status: 'fulfilled',
      priority: 'normal'
    }
  ];

  const tabs = [
    { 
      key: 'new',
      label: 'New Orders',
      count: mockOrders.filter(o => o.status === 'new').length,
      icon: Clock
    },
    { 
      key: 'fulfilled',
      label: 'Fulfilled',
      count: mockOrders.filter(o => o.status === 'fulfilled').length,
      icon: CheckCircle
    }
  ];

  const filteredOrders = mockOrders
    .filter(order => order.status === activeTab)
    .filter(order =>
      searchTerm === '' ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                placeholder="Search by order number or vendor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
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
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <OrderManageCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'new' ? 'No new orders' : 'No fulfilled orders'}
            </h3>
            <p className="text-gray-600">
              {activeTab === 'new'
                ? "New orders will appear here when customers place them"
                : "Orders you've fulfilled will appear here"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersReceived;
