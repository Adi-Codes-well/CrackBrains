import React from 'react';
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
import TrustScoreDisplay from './TrustScoreDisplay';

const SupplierDashboard = () => {
  const navigationItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Package, label: 'Add Product' },
    { icon: ShoppingBag, label: 'Orders Received' },
    { icon: Star, label: 'Reviews' },
    { icon: User, label: 'Profile' }
  ];

  const statCards = [
    {
      title: 'Total Revenue',
      value: '₹2,45,680',
      icon: IndianRupee,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      change: '+12.5%'
    },
    {
      title: 'New Orders',
      value: '23',
      icon: ShoppingBag,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+8 today'
    },
    {
      title: 'Products Listed',
      value: '47',
      icon: Package,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '3 active'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-0156',
      date: '2024-01-25',
      vendor: 'Sharma General Store',
      location: 'Mumbai',
      items: 3,
      value: 8500,
      status: 'new'
    },
    {
      id: 'ORD-2024-0155',
      date: '2024-01-25',
      vendor: 'Krishna Traders',
      location: 'Delhi',
      items: 2,
      value: 4200,
      status: 'new'
    },
    {
      id: 'ORD-2024-0154',
      date: '2024-01-24',
      vendor: 'Patel Kirana',
      location: 'Ahmedabad',
      items: 5,
      value: 12300,
      status: 'fulfilled'
    },
    {
      id: 'ORD-2024-0153',
      date: '2024-01-24',
      vendor: 'Modern Store',
      location: 'Pune',
      items: 1,
      value: 2500,
      status: 'fulfilled'
    },
    {
      id: 'ORD-2024-0152',
      date: '2024-01-23',
      vendor: 'City Mart',
      location: 'Bangalore',
      items: 4,
      value: 9800,
      status: 'fulfilled'
    }
  ];

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
                  <a
                    href="#"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      item.active
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center text-sm text-slate-400">
            <Award className="w-4 h-4 mr-2" />
            <span>Verified Supplier</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, GoodGrain Wholesalers!</h2>
              <p className="text-gray-600 mt-1">Manage your products and orders efficiently</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                Premium Supplier
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Trust Score Display */}
          <div className="mb-8">
            <TrustScoreDisplay />
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

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Incoming Orders</h3>
              <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View All Orders
              </button>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
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
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.vendor} • {order.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{order.items} items</p>
                      <div className="flex items-center text-sm font-medium text-gray-900">
                        <IndianRupee className="w-3 h-3 mr-1" />
                        <span>{order.value.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <button className="flex items-center px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors duration-200">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupplierDashboard;
