import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  IndianRupee, 
  CheckCircle, 
  Eye,
  Clock,
  AlertCircle
} from 'lucide-react';

const OrderManageCard = ({ order }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMarkAsFulfilled = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
  };

  const getPriorityColor = (priority) => {
    return priority === 'urgent' 
      ? 'bg-red-100 text-red-800 border-red-200' 
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityIcon = (priority) => {
    return priority === 'urgent' ? AlertCircle : Clock;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Order Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Placed on {new Date(order.date).toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {order.priority === 'urgent' && (
            <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center ${getPriorityColor(order.priority)}`}>
              <AlertCircle className="w-3 h-3 mr-1" />
              Urgent
            </div>
          )}
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            order.status === 'new' 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {order.status === 'new' ? 'New Order' : 'Fulfilled'}
          </div>
        </div>
      </div>

      {/* Vendor Information */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-emerald-600 font-medium text-xs">
                {order.vendor.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{order.vendor.name}</p>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{order.vendor.location}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>{order.vendor.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{order.vendor.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900">{item.name}</span>
                <span className="text-sm text-gray-500 ml-2">× {item.quantity}</span>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-900">
                <IndianRupee className="w-3 h-3 mr-1" />
                <span>{item.price.toLocaleString()}</span>
                <span className="text-xs text-gray-500 ml-1">each</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Total */}
      <div className="flex items-center justify-between py-3 border-t border-gray-200 mb-4">
        <span className="text-lg font-semibold text-gray-900">Total Order Value:</span>
        <div className="flex items-center text-xl font-bold text-gray-900">
          <IndianRupee className="w-5 h-5 mr-1" />
          <span>{order.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
        
        {order.status === 'new' && (
          <button
            onClick={handleMarkAsFulfilled}
            disabled={isProcessing}
            className={`flex items-center px-6 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200 ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-md'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Fulfilled
              </>
            )}
          </button>
        )}

        {order.status === 'fulfilled' && (
          <div className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
            <CheckCircle className="w-4 h-4 mr-2" />
            Order Fulfilled
          </div>
        )}
      </div>

      {/* Fulfillment Tips for New Orders */}
      {order.status === 'new' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Fulfillment Checklist:</p>
            <ul className="text-xs space-y-1">
              <li>• Verify product availability and quality</li>
              <li>• Package items securely for shipping</li>
              <li>• Arrange pickup/delivery with logistics partner</li>
              <li>• Mark as fulfilled only after dispatch</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManageCard;
