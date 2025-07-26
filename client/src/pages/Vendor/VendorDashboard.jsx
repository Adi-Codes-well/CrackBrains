import React from 'react';
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

const VendorDashboard = () => {
  const navigationItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Search, label: 'Browse Products' },
    { icon: ShoppingCart, label: 'My Orders' },
    { icon: Star, label: 'My Reviews' },
    { icon: User, label: 'Profile' }
  ];

  const statCards = [
    {
      title: 'Pending Orders',
      value: '7',
      icon: Package,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Delivered Orders',
      value: '142',
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Reviews Left',
      value: '89',
      icon: MessageSquare,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    }
  ];

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
                  <a
                    href="#"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      item.active
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center text-sm text-slate-400">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>Trust Score: 4.8/5</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, Rajesh Kumar!</h2>
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
              <button className="flex items-center justify-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors duration-200 group">
                <Search className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="text-emerald-700 font-medium">Browse Products</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 group">
                <ShoppingCart className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-700 font-medium">View Orders</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 group">
                <Star className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-700 font-medium">Leave Review</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200 group">
                <User className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-orange-700 font-medium">Update Profile</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">Order #VY-2024-0089 delivered</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  <span>₹2,850</span>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">Order #VY-2024-0090 dispatched</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  <span>₹1,200</span>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">Review submitted for Supplier: GoodMart Wholesalers</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VendorDashboard;
