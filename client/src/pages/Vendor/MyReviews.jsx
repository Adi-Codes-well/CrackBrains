import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MessageSquare, Package } from 'lucide-react';
import ReviewCard from '../../common/ReviewCard'; // Re-use your existing ReviewCard component

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/reviews/vendor`, {
          headers: { Authorization: token },
        });
        setReviews(response.data);
      } catch (err) {
        setError('Failed to fetch your reviews.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-20">Loading your reviews...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
          <p className="text-gray-600">Here are all the reviews you have submitted.</p>
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map(review => (
              <ReviewCard
                key={review._id}
                userName="You" // Since these are the user's own reviews
                date={review.createdAt}
                rating={review.rating}
                comment={review.comment}
                photoUrl={review.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">You haven't left any reviews yet.</h3>
            <p className="text-gray-600 mt-2">When you review a product, it will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;