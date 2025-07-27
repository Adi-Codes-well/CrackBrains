import React, { useState } from 'react';
import { 
  Star, 
  Upload, 
  Camera, 
  CheckCircle, 
  X,
  Image as ImageIcon
} from 'lucide-react';
import axios from 'axios'; // Step 1: Import axios
import { useLocation, useNavigate } from 'react-router-dom';

const SubmitReview = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const orderData = location.state?.order;

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    if (files) {
      setPhotos(Array.from(files).slice(0, 1));
    }
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
        alert("Please select a star rating.");
        return;
    }
    if (!orderData) {
        alert("Could not find order data. Please go back to your orders and try again.");
        return;
    }

    setIsSubmitting(true);

    // Use FormData because we are sending a file (image) along with text data
    const formData = new FormData();
    formData.append('productId', orderData.productId._id);
    formData.append('supplierId', orderData.supplierId._id);
    formData.append('rating', rating);
    formData.append('comment', comment);
    
    // Append the image file if it exists
    if (photos.length > 0) {
      formData.append('image', photos[0]);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('${import.meta.env.VITE_APP_API_BASE_URL}/api/reviews', formData, {
        headers: {
          // This header is important for file uploads
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
        },
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Review submission failed:', err);
      alert('Failed to submit review. ' + (err.response?.data?.message || 'Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="p-1 transition-transform duration-200 hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors duration-200 ${
              star <= (hoverRating || rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your feedback. Your review helps other vendors make better decisions.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setRating(0);
              setComment('');
              setPhotos([]);
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review your recent purchase</h1>
          <p className="text-gray-600">Help other vendors by sharing your experience</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="text-sm text-gray-600 mb-1">Order #{orderData.orderId}</div>
          <div className="font-semibold text-gray-900">{orderData.productName}</div>
          <div className="text-sm text-gray-600">from {orderData.supplierName}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="text-center">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              How would you rate this supplier?
            </label>
            <StarRating />
            {rating > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {rating === 1 && "Poor - Had significant issues"}
                {rating === 2 && "Fair - Below expectations"}
                {rating === 3 && "Good - Met expectations"}
                {rating === 4 && "Very Good - Exceeded expectations"}
                {rating === 5 && "Excellent - Outstanding service"}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="comment" className="block text-lg font-semibold text-gray-900 mb-3">
              Share your experience
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell other vendors about the product quality, delivery time, packaging, and overall experience..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
            />
            <div className="text-sm text-gray-500 mt-2">
              {comment.length}/500 characters
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Upload Photo Proof
              <span className="text-sm font-normal text-gray-600 ml-2">(Optional but highly recommended)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors duration-200">
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={photos.length >= 5}
              />
              <label
                htmlFor="photo-upload"
                className={`cursor-pointer ${photos.length >= 5 ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                    <Camera className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {photos.length >= 5 ? 'Maximum 5 photos allowed' : 'Click to upload photos'}
                  </div>
                  <div className="text-xs text-gray-500">
                    Show the actual products you received
                  </div>
                </div>
              </label>
            </div>

            {photos.length > 0 && (
              <div className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {photos.length}/5 photos uploaded
                </div>
              </div>
            )}

            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <div className="font-medium mb-1">Photo Tips:</div>
                  <ul className="text-xs space-y-1">
                    <li>• Show the actual products you received</li>
                    <li>• Include packaging and labeling</li>
                    <li>• Good lighting helps other vendors see quality</li>
                    <li>• Multiple angles provide better perspective</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={rating === 0 || isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                rating === 0 || isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting Review...
                </div>
              ) : (
                'Submit Review'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="font-medium">Your review powers VyaparSetu's Trust Engine</span>
            </div>
            <p>Honest reviews with photo proof help build a transparent marketplace for all vendors.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitReview;
