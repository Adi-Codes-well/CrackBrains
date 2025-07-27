import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Upload, Plus, X, Save, ArrowLeft, Loader2, Trash2 } from 'lucide-react';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  // FIX: Initialize with empty strings to ensure user input is the source of truth
  const [priceTiers, setPriceTiers] = useState([{ minQty: '', pricePerUnit: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Food & Beverages',
    'Clothing & Textiles',
    'Electronics',
    'Stationery',
    'Home & Garden',
    'Health & Beauty',
    'Industrial Supplies',
    'Automotive'
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.slice(0, 5 - images.length); // Max 5 images
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addPriceTier = () => {
    setPriceTiers(prev => [...prev, { minQty: '', pricePerUnit: '' }]);
  };

  const removePriceTier = (index) => {
    if (priceTiers.length > 1) {
      setPriceTiers(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updatePriceTier = (index, field, value) => {
    const newTiers = [...priceTiers];
    newTiers[index][field] = value;
    setPriceTiers(newTiers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('category', category);

    // Append price tiers as a JSON string
    formData.append('priceTiers', JSON.stringify(priceTiers));

    // Append each image file
    images.forEach(imageFile => {
      formData.append('images', imageFile);
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        }
      });
      alert('Product created successfully!');
      navigate('/supplier/dashboard'); // Redirect after success
    } catch (err) {
      console.error('Failed to create product:', err);
      setError(err.response?.data?.message || 'Failed to create product. Please check all fields and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link to="/supplier/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create a New Product Listing</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Details Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"></textarea>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option value="" disabled>Select a category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Images</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400">
              <input type="file" id="image-upload" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={images.length >= 5} />
              <label htmlFor="image-upload" className={`cursor-pointer ${images.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drag & drop files here, or click to browse</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB. Max 5 images.</p>
              </label>
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={URL.createObjectURL(image)} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-lg" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Pricing Tiers</h2>
            <div className="space-y-4">
              {priceTiers.map((tier, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Min. Quantity</label>
                    <input type="number" placeholder="e.g., 1" value={tier.minQty} onChange={(e) => updatePriceTier(index, 'minQty', e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Price per Unit (₹)</label>
                    <input type="number" placeholder="e.g., 100" value={tier.pricePerUnit} onChange={(e) => updatePriceTier(index, 'pricePerUnit', e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <button type="button" onClick={() => removePriceTier(index)} disabled={priceTiers.length <= 1} className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50 self-end">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addPriceTier} className="mt-4 flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800">
              <Plus className="w-4 h-4 mr-1" /> Add Tier
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <Link to="/supplier/dashboard" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200">Cancel</Link>
            <button type="submit" disabled={loading} className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-emerald-300 flex items-center">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
