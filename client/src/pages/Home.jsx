import React, { useState, useEffect } from 'react';
import {
    Search,
    User,
    ShoppingCart,
    Shield,
    Star,
    TrendingUp,
    Package,
    Users,
    CheckCircle,
    ArrowRight,
    IndianRupee,
    MapPin,
    Award,
    Eye,
    Instagram,
    Facebook,
    Twitter
} from 'lucide-react';
import { Link } from 'react-router-dom';


const VyaparSetuLanding = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const featuredProducts = [
        {
            id: 1,
            name: 'Premium Basmati Rice 25kg',
            supplier: 'GoodGrain Wholesalers',
            price: 2500,
            bulkPrice: 2200,
            trustScore: 4.8,
            image: 'https://images.pexels.com/photos/33239/rice-grain-seed-food.jpg?auto=compress&cs=tinysrgb&w=400',
            verified: true
        },
        {
            id: 2,
            name: 'Organic Turmeric Powder 1kg',
            supplier: 'SpiceKing Distributors',
            price: 450,
            bulkPrice: 380,
            trustScore: 4.6,
            image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=400',
            verified: true
        },
        {
            id: 3,
            name: 'Cotton T-Shirts Pack of 12',
            supplier: 'TextileMart India',
            price: 1800,
            bulkPrice: 1500,
            trustScore: 4.2,
            image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=400',
            verified: true
        },
        {
            id: 4,
            name: 'LED Bulbs 9W Pack of 10',
            supplier: 'BrightLight Solutions',
            price: 800,
            bulkPrice: 650,
            trustScore: 4.4,
            image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
            verified: true
        }
    ];

    const categories = [
        {
            name: 'Food & Beverages',
            image: 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=500',
            count: '2,500+ Products'
        },
        {
            name: 'Electronics',
            image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=500',
            count: '1,800+ Products'
        },
        {
            name: 'Textiles & Clothing',
            image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=500',
            count: '3,200+ Products'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Sticky Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-md'
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

                            <Link to="/vendor" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">For Vendors</Link>
                            <Link to="/supplier" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">For Suppliers</Link>
                            <Link to="/trust-engine" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Trust Engine</Link>
                            <Link to="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">About</Link>

                        </div>


                        {/* Right Side Icons */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                            <Link to="/user-profile"><button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                                <User className="w-5 h-5" />
                            </button></Link>
    
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in-up">
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Trust for Every <span className="text-emerald-600">Business Trade</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Connect with verified suppliers, discover transparent pricing, and build your business with India's most trusted B2B marketplace.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/login"><button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </button></Link>
                                <Link to="/browse"><button className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-lg font-semibold transition-colors">
                                    Browse Products
                                </button></Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <Shield className="w-6 h-6 text-emerald-600 mr-2" />
                                        <span className="font-semibold text-gray-900"></span>
                                    </div>
                                  
                                </div>
                                <img
                                    src="https://images.pexels.com/photos/5864769/pexels-photo-5864769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                    alt="B2B Trading"
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Engine Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Built on Trust, Powered by Technology
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our Trust Engine combines verification, community ratings, and photo reviews to ensure every trade is transparent and reliable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow group">
                            <div className="bg-emerald-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Verification</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every supplier undergoes mandatory document verification including GSTIN and business licenses before joining our platform.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow group">
                            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Dynamic Trust Score</h3>
                            <p className="text-gray-600 leading-relaxed">
                                AI-powered scoring system that considers verification status, user ratings, and order fulfillment history.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow group">
                            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Eye className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Photo-Based Reviews</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Visual proof of product quality through mandatory photo uploads with every review, ensuring transparency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                        <p className="text-xl text-gray-600">Discover quality products from our verified suppliers</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer transform hover:scale-105">
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                        <Shield className="w-3 h-3 mr-1" />
                                        Verified
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                                        {product.trustScore}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{product.supplier}</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Regular:</span>
                                            <div className="flex items-center font-semibold text-gray-900">
                                                <IndianRupee className="w-4 h-4" />
                                                <span>{product.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-emerald-600">Bulk:</span>
                                            <div className="flex items-center font-semibold text-emerald-600">
                                                <IndianRupee className="w-4 h-4" />
                                                <span>{product.bulkPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/vendor/details/:id"><button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 mt-4">
                                        View Details
                                    </button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop by Category */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                        <p className="text-xl text-gray-600">Find products across all major business categories</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((category, index) => (
                            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-2xl">
                                <div className="aspect-w-16 aspect-h-12">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                                    <div className="p-8 text-white">
                                        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                                        <p className="text-gray-200">{category.count}</p>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-emerald-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div className="text-white">
                            <div className="text-4xl font-bold mb-2">50,000+</div>
                            <div className="text-emerald-100">Verified Suppliers</div>
                        </div>
                        <div className="text-white">
                            <div className="text-4xl font-bold mb-2">2L+</div>
                            <div className="text-emerald-100">Active Vendors</div>
                        </div>
                        <div className="text-white">
                            <div className="text-4xl font-bold mb-2">₹500Cr+</div>
                            <div className="text-emerald-100">Trade Volume</div>
                        </div>
                        <div className="text-white">
                            <div className="text-4xl font-bold mb-2">4.8/5</div>
                            <div className="text-emerald-100">Average Trust Score</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold text-emerald-400 mb-4">VyaparSetu</h3>
                            <p className="text-gray-300 mb-6 max-w-md">
                                India's most trusted B2B marketplace connecting vendors with verified suppliers through our revolutionary Trust Engine.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="bg-slate-700 hover:bg-slate-600 p-3 rounded-lg transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="bg-slate-700 hover:bg-slate-600 p-3 rounded-lg transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="bg-slate-700 hover:bg-slate-600 p-3 rounded-lg transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Press</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping & Returns</a></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Trust & Safety</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">© 2024 VyaparSetu. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VyaparSetuLanding;