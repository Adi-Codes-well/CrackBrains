import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductManageCard from './ProductManageCard'; // The component for a single card
import { Package, Plus } from 'lucide-react';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // This function fetches the products when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/products/myproducts`, {
          headers: { Authorization: token },
        });
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch your products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // This function is passed to each card to handle the delete action
  const handleDeleteProduct = (deletedProductId) => {
    setProducts(currentProducts =>
      currentProducts.filter(p => p._id !== deletedProductId)
    );
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
          <Link
            to="/supplier/add-product"
            className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductManageCard
                key={product._id}
                product={product} // Pass the real product data to the card
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products listed</h3>
            <p className="text-gray-600">Click "Add Product" to create your first listing.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;