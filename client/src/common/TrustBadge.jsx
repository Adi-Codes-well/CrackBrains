import React from 'react';
import { Star } from 'lucide-react';

const TrustScoreBadge = ({ score = 0 }) => {
  const getScoreColor = (score) => {
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.0) return 'text-yellow-500';
    return 'text-red-600';
  };

  const getBgColor = (score) => {
    if (score >= 4.0) return 'bg-green-50';
    if (score >= 3.0) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBgColor(score)}`}>
      <Star className={`w-3 h-3 mr-1 fill-current ${getScoreColor(score)}`} />
      <span className={getScoreColor(score)}>
        {score.toFixed(1)}
      </span>
    </div>
  );
};

export default TrustScoreBadge;
