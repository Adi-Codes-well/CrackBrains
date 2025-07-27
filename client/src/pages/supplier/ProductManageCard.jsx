import React, { useState } from 'react';
import { Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import axios from 'axios'; // Import axios

const ProductManageCard = ({
  product = {
    id: '1',
    name: 'Premium Basmati Rice 25kg',
    image: 'https://images.pexels.com/photos/33239/rice-grain-seed-food.jpg?auto=compress&cs=tinysrgb&w=300',
    category: 'Food & Beverages',
    price: 2200,
    stock: 150,
    status: 'active'
  }, onDelete 
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'out_of_stock':
        return 'Out of Stock';
      default:
        return 'Unknown';
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        // Get the authentication token from local storage
        const token = localStorage.getItem('token');
        
        // Make the actual API call to the backend
        await axios.delete(`/api/products/${product._id}`, { // Use product._id
          headers: { Authorization: token },
        });

        // If the deletion is successful, call the onDelete prop
        if (onDelete) {
          onDelete(product._id); // Pass the ID of the deleted product back to the parent
        }

      } catch (err) {
        alert('Failed to delete product. Please try again.');
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  }

  const handleEdit = () => {
    console.log('Edit product:', product.id);
  };

  const handleView = () => {
    console.log('View product:', product.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
            {getStatusText(product.status)}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
            <p className="text-xs text-gray-500">per unit</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{product.stock} units</p>
            <p className="text-xs text-gray-500">in stock</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleView}
            className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </button>
          
          <button
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors duration-200"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    handleDelete();
                    setShowMenu(false);
                  }}
                  disabled={isDeleting}
                  className={`w-full flex items-center px-3 py-2 text-sm text-left transition-colors duration-200 ${
                    isDeleting
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {product.stock < 10 && product.status === 'active' && (
        <div className="px-4 pb-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
            <p className="text-xs text-yellow-800 font-medium">
              Low stock warning: Only {product.stock} units remaining
            </p>
          </div>
        </div>
      )}

      {showMenu && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default ProductManageCard;
