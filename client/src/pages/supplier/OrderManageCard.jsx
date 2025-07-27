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
  Truck // Added Truck icon
} from 'lucide-react';

// The onStatusUpdate prop is passed down from the parent component
const OrderManageCard = ({ order, onStatusUpdate }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // This function will call the parent's handler to update the status
  const handleUpdateStatus = async (newStatus) => {
    setIsProcessing(true);
    await onStatusUpdate(order._id, newStatus);
    setIsProcessing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
        case 'Pending': return <Clock className="w-4 h-4 mr-2" />;
        case 'Shipped': return <Truck className="w-4 h-4 mr-2" />;
        case 'Delivered': return <CheckCircle className="w-4 h-4 mr-2" />;
        default: return null;
    }
  }

  // Calculate total price. Use optional chaining for safety.
  const totalPrice = (order.productId?.priceTiers?.[0]?.pricePerUnit || 0) * (order.quantity || 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Order Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Placed on {new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            {order.status}
        </div>
      </div>

      {/* Vendor Information */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
        <div className="flex items-center">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-emerald-600 font-medium text-xs">
                    {/* FIX: Accessing order.vendorId.name safely */}
                    {order.vendorId?.name?.charAt(0) || '?'}
                </span>
            </div>
            <div>
                <p className="font-medium text-gray-900">{order.vendorId?.name || 'Unknown Vendor'}</p>
            </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
                <span className="text-sm font-medium text-gray-900">{order.productId?.name || 'Product Not Found'}</span>
                <span className="text-sm text-gray-500 ml-2">× {order.quantity}</span>
            </div>
            <div className="flex items-center text-sm font-medium text-gray-900">
                <IndianRupee className="w-3 h-3 mr-1" />
                <span>{totalPrice.toLocaleString()}</span>
            </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {order.status === 'Pending' && (
          <button
            onClick={() => handleUpdateStatus('Shipped')}
            disabled={isProcessing}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:bg-gray-400"
          >
            <Truck className="w-4 h-4 mr-2" />
            Mark as Shipped
          </button>
        )}
        {order.status === 'Shipped' && (
          <button
            onClick={() => handleUpdateStatus('Delivered')}
            disabled={isProcessing}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:bg-gray-400"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Delivered
          </button>
        )}
         {order.status === 'Delivered' && (
          <div className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
            <CheckCircle className="w-4 h-4 mr-2" />
            Order Fulfilled
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManageCard;