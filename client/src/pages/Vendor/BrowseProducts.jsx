import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Star, IndianRupee, Package, Shield, TrendingUp, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../common/Navbar';

const BrowseProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [trustScoreMin, setTrustScoreMin] = useState(0);

    // This useEffect will run once on component mount to fetch all initial products
    useEffect(() => {
        const fetchInitialProducts = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/products`);

                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    setError('Received invalid data from server.');
                    setProducts([]);
                }
            } catch (err) {
                setError('Could not load products. Please ensure the server is running.');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialProducts();
    }, []); // Empty dependency array ensures this runs only once

    // You can add a separate useEffect for handling filter changes if needed
    // For now, the filtering will be done on the client side for simplicity
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const lowestPrice = product.priceTiers?.length > 0
                ? Math.min(...product.priceTiers.map(t => t.pricePerUnit))
                : 0;

            const matchesSearch = searchTerm === '' ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.supplierId && product.supplierId.name.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            
            const matchesPrice = lowestPrice >= priceRange[0] && lowestPrice <= priceRange[1];

            // Note: Client-side trust score filtering is not possible without fetching all scores first.
            // This setup assumes the backend handles trust score filtering when the `trustScoreMin` is used in a fetch call.
            
            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [products, searchTerm, selectedCategories, priceRange]);


    const categories = useMemo(() => {
        return ['Food & Beverages', 'Electronics', 'Textiles & Clothing', 'Stationery', 'Industrial Supplies'];
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const ProductCard = ({ product }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <Link to={`/vendor/details/${product._id}`}>
                <div className="relative">
                    <img
                        src={(product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.supplierId?.isVerifiedSupplier && (
                        <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Shield className="w-3 h-3 mr-1" /> Verified
                        </div>
                    )}
                    {product.trustScore && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                            {product.trustScore}
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>{product.supplierId?.name || 'Unknown Supplier'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Starts from:</span>
                        <div className="flex items-center font-semibold text-emerald-600">
                            <IndianRupee className="w-4 h-4" />
                            <span>
                                {(product.priceTiers?.length > 0)
                                    ? Math.min(...product.priceTiers.map(t => t.pricePerUnit)).toLocaleString()
                                    : 'N/A'}
                            </span>
                        </div>
                    </div>
                     <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="w-full bg-emerald-50 text-emerald-700 py-2 px-4 rounded-lg font-medium text-center text-sm">
                           View Details
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1 pt-16">
                <aside className="w-80 bg-white shadow-sm border-r border-gray-200 p-6 overflow-y-auto hidden lg:block">
                     <div className="flex items-center mb-6">
                        <Filter className="w-5 h-5 text-gray-600 mr-2" />
                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <label key={category} className="flex items-center">
                                    <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"/>
                                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                        <div className="px-2">
                            <input type="range" min="0" max="10000" step="100" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
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
                                max="100" 
                                step="5" 
                                value={trustScoreMin} 
                                onChange={(e) => setTrustScoreMin(parseInt(e.target.value))} 
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Any</span>
                                <span>{trustScoreMin}+</span>
                            </div>
                        </div>
                    </div>
                </aside>
                <main className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Browse Products</h1>
                         <span className="text-sm text-gray-600">{filteredProducts.length} results found</span>
                    </div>
                    {loading ? (
                        <div className="text-center py-12">Loading products...</div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-500">{error}</div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map(product => <ProductCard key={product._id} product={product} />)}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default BrowseProducts;
