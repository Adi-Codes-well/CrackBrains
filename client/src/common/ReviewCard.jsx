import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

const ReviewCard = ({
  userName = "Priya K.",
  userAvatar = null,
  date = "2024-01-20",
  rating = 4,
  comment = "Excellent quality rice! The grains were perfect and the delivery was on time. Will definitely order again.",
  photoUrl = null
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-emerald-700 font-medium text-sm">
                  {getInitials(userName)}
                </span>
              )}
            </div>

            {/* User Info */}
            <div>
              <p className="font-medium text-gray-900">{userName}</p>
              <p className="text-sm text-gray-500">{formatDate(date)}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
          </div>
        </div>

        {/* Review Comment */}
        <p className="text-gray-700 text-sm leading-relaxed mb-3">{comment}</p>

        {/* Photo Proof (Conditional) */}
        {photoUrl && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Photo proof:</p>
            <img
              src={photoUrl}
              alt="Review photo"
              className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Modal for Photo View */}
      {isModalOpen && photoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={photoUrl}
              alt="Review photo enlarged"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
