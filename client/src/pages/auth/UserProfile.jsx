// src/components/UserProfile.jsx

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Edit2, 
  Save, 
  X, 
  Building, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Camera
} from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: 'Rajesh Kumar Sharma',
    email: 'rajesh@goodgrainwholesalers.com',
    phone: '+91 98765 43210',
    role: 'supplier',
    profileImage: null,
    businessName: 'GoodGrain Wholesalers',
    gstin: 'GST123456789',
    verificationStatus: 'verified'
  });

  const [editData, setEditData] = useState(userData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEditToggle = () => {
    if (isEditing) setEditData(userData);
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    console.log('Profile updated:', editData);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password change requested');
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const getVerificationBadge = (status) => {
    const badges = {
      pending: {
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: Clock,
        text: 'Verification Pending'
      },
      verified: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        text: 'Verified Supplier'
      },
      rejected: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertCircle,
        text: 'Verification Failed'
      }
    };

    const badge = badges[status];
    const IconComponent = badge.icon;

    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badge.color}`}>
        <IconComponent className="w-4 h-4 mr-1" />
        {badge.text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  {userData.profileImage ? (
                    <img 
                      src={userData.profileImage} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-emerald-600" />
                  )}
                </div>
                <button className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full hover:bg-emerald-700 transition-colors duration-200">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                <p className="text-gray-600 capitalize">{userData.role}</p>
              </div>
            </div>
            {userData.role === 'supplier' && (
              <div>
                {getVerificationBadge(userData.verificationStatus)}
              </div>
            )}
          </div>
        </div>

        {/* User Details Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
            <button
              onClick={isEditing ? handleSave : handleEditToggle}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isEditing 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={isEditing ? editData.name : userData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg transition-colors duration-200 ${
                    isEditing 
                      ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={isEditing ? editData.phone : userData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg transition-colors duration-200 ${
                    isEditing 
                      ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={userData.email}
                  disabled={true}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 bg-gray-50 text-gray-600 rounded-lg"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed. Contact support if needed.</p>
            </div>
          </div>

          {/* Cancel Button for Editing */}
          {isEditing && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleEditToggle}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </button>
          </div>

          {isChangingPassword && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Conditional Supplier Information Section */}
        {userData.role === 'supplier' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Supplier Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userData.businessName}
                    disabled={true}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 bg-gray-50 text-gray-600 rounded-lg"
                  />
                </div>
              </div>

              {/* GSTIN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GSTIN
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userData.gstin}
                    disabled={true}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 bg-gray-50 text-gray-600 rounded-lg"
                  />
                </div>
              </div>

              {/* Verification Status */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Verification Status
                </label>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {getVerificationBadge(userData.verificationStatus)}
                    <span className="ml-3 text-sm text-gray-600">
                      {userData.verificationStatus === 'verified' && 'Your business has been successfully verified'}
                      {userData.verificationStatus === 'pending' && 'Your verification is under review. We\'ll notify you once completed.'}
                      {userData.verificationStatus === 'rejected' && 'Verification failed. Please contact support for assistance.'}
                    </span>
                  </div>
                  {userData.verificationStatus === 'rejected' && (
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      Resubmit Documents
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Business information can only be updated by contacting our support team. 
                This ensures the integrity of our verification system.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;