import React, { useState, useMemo } from 'react';
import {
    Search,
    Filter,
    Star,
    MapPin,
    IndianRupee,
    Package,
    Shield,
    TrendingUp
} from 'lucide-react';

const BrowseProducts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [minTrustScore, setMinTrustScore] = useState(0);

    const mockProducts = [
        {
            id: '1',
            name: 'Premium Basmati Rice 25kg',
            category: 'Food & Beverages',
            price: 2500,
            bulkPrice: 2200,
            minBulkQuantity: 10,
            supplier: 'GoodGrain Wholesalers',
            trustScore: 4.8,
            location: 'Delhi',
            image: 'https://images.pexels.com/photos/33239/rice-grain-seed-food.jpg?auto=compress&cs=tinysrgb&w=300',
            verified: true,
            rating: 4.7,
            reviewCount: 156
        },
        {
            id: '2',
            name: 'Organic Turmeric Powder 1kg',
            category: 'Food & Beverages',
            price: 450,
            bulkPrice: 380,
            minBulkQuantity: 20,
            supplier: 'SpiceKing Distributors',
            trustScore: 4.6,
            location: 'Kerala',
            image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=300',
            verified: true,
            rating: 4.5,
            reviewCount: 89
        },
        {
            id: '3',
            name: 'Cotton T-Shirts Pack of 12',
            category: 'Clothing',
            price: 1800,
            bulkPrice: 1500,
            minBulkQuantity: 5,
            supplier: 'TextileMart India',
            trustScore: 4.2,
            location: 'Tamil Nadu',
            image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=300',
            verified: true,
            rating: 4.3,
            reviewCount: 67
        },
        {
            id: '4',
            name: 'LED Bulbs 9W Pack of 10',
            category: 'Electronics',
            price: 800,
            bulkPrice: 650,
            minBulkQuantity: 15,
            supplier: 'BrightLight Solutions',
            trustScore: 4.4,
            location: 'Gujarat',
            image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300',
            verified: true,
            rating: 4.2,
            reviewCount: 134
        },
        {
            id: '5',
            name: 'Notebook Set A4 Size',
            category: 'Stationery',
            price: 320,
            bulkPrice: 280,
            minBulkQuantity: 25,
            supplier: 'EduSupply Co.',
            trustScore: 4.1,
            location: 'Maharashtra',
            image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=300',
            verified: false,
            rating: 4.0,
            reviewCount: 45
        },
        {
            id: '6',
            name: 'Coconut Oil 1L Bottles',
            category: 'Food & Beverages',
            price: 180,
            bulkPrice: 150,
            minBulkQuantity: 30,
            supplier: 'CocoFresh Traders',
            trustScore: 4.7,
            location: 'Karnataka',
            image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=300',
            verified: true,
            rating: 4.6,
            reviewCount: 98
        }
    ];

    const categories = ['Food & Beverages', 'Clothing', 'Electronics', 'Stationery', 'Home & Garden', 'Health & Beauty'];

    const filteredProducts = useMemo(() => {
        return mockProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            const matchesTrustScore = product.trustScore >= minTrustScore;
            return matchesSearch && matchesCategory && matchesPrice && matchesTrustScore;
        });
    }, [searchTerm, selectedCategories, priceRange, minTrustScore]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const ProductCard = ({ product }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.verified && (
                    <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                    {product.trustScore}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{product.supplier} • {product.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                    <span>{product.rating} ({product.reviewCount} reviews)</span>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Regular Price:</span>
                        <div className="flex items-center font-semibold text-gray-900">
                            <IndianRupee className="w-4 h-4" />
                            <span>{product.price.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-600">Bulk Price ({product.minBulkQuantity}+ units):</span>
                        <div className="flex items-center font-semibold text-emerald-600">
                            <IndianRupee className="w-4 h-4" />
                            <span>{product.bulkPrice.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                        <Package className="w-4 h-4 mr-2" />
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="w-80 bg-white shadow-sm border-r border-gray-200 p-6 overflow-y-auto">
                <div className="flex items-center mb-6">
                    <Filter className="w-5 h-5 text-gray-600 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by product or supplier..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
                    <div className="space-y-2">
                        {categories.map(category => (
                            <label key={category} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="100"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>₹0</span>
                            <span>₹{priceRange[1].toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Trust Score</label>
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="5"
                            step="0.1"
                            value={minTrustScore}
                            onChange={(e) => setMinTrustScore(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0.0</span>
                            <span>{minTrustScore.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setSearchTerm('');
                        setSelectedCategories([]);
                        setPriceRange([0, 10000]);
                        setMinTrustScore(0);
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                    Clear All Filters
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Browse Products</h1>
                        <p className="text-gray-600 mt-1">
                            Showing {filteredProducts.length} products from verified suppliers
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>Sorted by Trust Score</span>
                        </div>
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your filters to see more results</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseProducts;
