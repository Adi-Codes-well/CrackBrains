import React, { useState, useEffect } from 'react';
import { ChevronDown, User, LogOut, Settings, Search, ShoppingCart } from 'lucide-react';

const Navbar = ({ isLoggedIn = false, userRole = null, userName = "John Doe" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const vendorLinks = [
    { label: 'Dashboard', href: '/vendor/dashboard' },
    { label: 'Browse Products', href: '/products' },
    { label: 'My Orders', href: '/vendor/orders' }
  ];

  const supplierLinks = [
    { label: 'Dashboard', href: '/supplier/dashboard' },
    { label: 'My Products', href: '/supplier/products' },
    { label: 'Orders Received', href: '/supplier/orders' }
  ];

  const currentLinks = userRole === 'vendor' ? vendorLinks : supplierLinks;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-emerald-600">VyaparSetu</h1>
            <span className="ml-2 text-sm text-gray-600 hidden sm:block">Business Bridge</span>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">For Vendors</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">For Suppliers</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Trust Engine</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">About</a>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
