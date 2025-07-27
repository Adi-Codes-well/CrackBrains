import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found. Please log in again.');
          setLoading(false);
          return;
        }
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: token },
        });
        setUserData(response.data);
        setEditData(response.data); // Initialize editData with fetched data
      } catch (err) {
        setError('Failed to fetch user profile. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData(userData); // Reset changes if canceled
    }
    setIsEditing(!isEditing);
  };
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/auth/me', editData, {
        headers: { Authorization: token },
      });
      setUserData(response.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
      console.error(err);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Logic to submit password change to the backend would go here
    console.log('Password change requested');
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const getVerificationBadge = (isVerified) => {
    const status = isVerified ? 'verified' : 'pending';
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
      // You can add a 'rejected' status if your backend supports it
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

  if (loading) return <div className="text-center py-20">Loading Your Profile...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!userData) return <div className="text-center py-20">Could not load user profile data.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-emerald-600" />
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
                {getVerificationBadge(userData.isVerifiedSupplier)}
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

            {/* Phone Field (Assuming phone is not in the current user model, adding as an example) */}
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
                  placeholder="+91 98765 43210" // Placeholder as it's not in the model
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
              {/* Password change form fields remain the same */}
            </form>
          )}
        </div>

        {/* Conditional Supplier Information Section */}
        {userData.role === 'supplier' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Supplier Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GSTIN from docs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GSTIN Document
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userData.verificationDocs?.gstin ? 'Document Uploaded' : 'Not Provided'}
                    disabled={true}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 bg-gray-50 text-gray-600 rounded-lg"
                  />
                </div>
              </div>

              {/* FSSAI from docs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  FSSAI Document
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userData.verificationDocs?.fssai ? 'Document Uploaded' : 'Not Provided'}
                    disabled={true}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 bg-gray-50 text-gray-600 rounded-lg"
                  />
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