import React from 'react';
import { Check, X } from 'lucide-react';

const VerificationBadge = ({ isVerified = false }) => {
  if (isVerified) {
    return (
      <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full border border-green-200">
        <Check className="w-3 h-3 mr-1" />
        <span>Verified</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
      <X className="w-3 h-3 mr-1" />
      <span>Not Verified</span>
    </div>
  );
};

export default VerificationBadge;
