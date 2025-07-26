import React from 'react';
import { Star, Shield, TrendingUp, CheckCircle } from 'lucide-react';

const TrustScoreDisplay = () => {
  const trustScore = 4.8;
  const maxScore = 5.0;
  const percentage = (trustScore / maxScore) * 100;

  const metrics = [
    {
      label: 'Average Customer Rating',
      value: '4.9 stars',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      label: 'Order Fulfillment Rate',
      value: '98%',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      label: 'Platform Verification',
      value: 'Verified',
      icon: Shield,
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Trust Score</h3>
      
      {/* Main Trust Score Display */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center">
          {/* Circular Progress */}
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
              stroke="#10b981"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{trustScore}</span>
            <span className="text-sm text-gray-500">/ {maxScore}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-900">Excellent Trust Score</p>
          <p className="text-sm text-gray-600">You're in the top 10% of suppliers</p>
        </div>
      </div>

      {/* Metrics Breakdown */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 mb-3">Score Breakdown</h4>
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
