import React from 'react';
import { Star, Shield, TrendingUp, CheckCircle } from 'lucide-react';

// Accept 'score' as a prop
const TrustScoreDisplay = ({ score = 0 }) => {
  const maxScore = 100; // Assuming trust score is out of 100 as per calculateTrustScore.js
  const percentage = (score / maxScore) * 100;

  // Function to determine text message based on score range
  const getTrustLevelMessage = (currentScore) => {
    if (currentScore >= 80) return "Excellent Trust Score";
    if (currentScore >= 60) return "Good Trust Score";
    if (currentScore >= 40) return "Developing Trust";
    return "Low Trust Score - Requires attention";
  };

  // Note: These metrics are illustrative. To make them dynamic,
  // your backend's calculateTrustScore would need to expose these individual metrics,
  // and the SupplierDashboard would need to fetch and pass them down.
  // For now, they remain as examples.
  const metrics = [
    {
      label: 'Average Customer Rating',
      value: 'N/A', // Placeholder, would be dynamic if available from API
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      label: 'Order Fulfillment Rate',
      value: 'N/A', // Placeholder, would be dynamic if available from API
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      label: 'Platform Verification',
      value: 'N/A', // Placeholder, would be dynamic if available from supplierData
      icon: Shield,
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Trust Score</h3>
      
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center">
          {/* Circular Progress Bar */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#10b981" // Emerald green for progress
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 50}
              strokeDashoffset={2 * Math.PI * 50 * (1 - percentage / 100)}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{score !== null ? score.toFixed(1) : 'N/A'}</span>
            <span className="text-sm text-gray-500">/ {maxScore.toFixed(0)}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-900">{getTrustLevelMessage(score)}</p>
          <p className="text-sm text-gray-600">This score is dynamically calculated based on your performance.</p>
        </div>
      </div>

      {/* Metrics Breakdown (Illustrative) */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 mb-3">Score Breakdown (Illustrative)</h4>
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <IconComponent className={`w-4 h-4 ${metric.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{metric.value}</span>
            </div>
          );
        })}
      </div>

      {/* Improvement Tips */}
      <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-emerald-800 mb-1">Keep up the great work!</p>
            <p className="text-emerald-700">
              Your high trust score helps you get more visibility and orders. Continue providing quality products and timely delivery to maintain this score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustScoreDisplay;