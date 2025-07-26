import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ErrorMessage = ({
  message = "An error occurred. Please try again.",
  onClose = null,
  type = "error" // "error", "warning", "info"
}) => {
  const getStyles = (type) => {
    switch (type) {
      case 'warning':
        return {
          container: 'border-yellow-500 bg-yellow-100 text-yellow-700',
          icon: 'text-yellow-600'
        };
      case 'info':
        return {
          container: 'border-blue-500 bg-blue-100 text-blue-700',
          icon: 'text-blue-600'
        };
      default:
        return {
          container: 'border-red-500 bg-red-100 text-red-700',
          icon: 'text-red-600'
        };
    }
  };

  const styles = getStyles(type);

  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${styles.container} relative`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className={`w-5 h-5 ${styles.icon}`} />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                type === 'error'
                  ? 'text-red-500 hover:bg-red-200 focus:ring-red-600'
                  : type === 'warning'
                  ? 'text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-600'
                  : 'text-blue-500 hover:bg-blue-200 focus:ring-blue-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
