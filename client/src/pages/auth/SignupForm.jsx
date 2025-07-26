import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Upload, UserCheck, Truck } from 'lucide-react';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: ''
  });
  const [verificationFile, setVerificationFile] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role: role
    });
    if (role !== 'supplier') {
      setVerificationFile(null);
    }
  };

  const handleFileChange = (e) => {
    setVerificationFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData, verificationFile);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">VyaparSetu</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join our platform</h2>
          <p className="text-gray-600">Create your business account to get started</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a
              </label>
              <div className="space-y-3">
                {/* Vendor Option */}
                <div 
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.role === 'vendor' 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleRoleChange('vendor')}
                >
                  <input
                    type="radio"
                    name="role"
                    value="vendor"
                    checked={formData.role === 'vendor'}
                    onChange={() => handleRoleChange('vendor')}
                    className="sr-only"
                  />
                  <UserCheck className={`h-5 w-5 mr-3 ${
                    formData.role === 'vendor' ? 'text-emerald-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <p className={`font-medium ${
                      formData.role === 'vendor' ? 'text-emerald-900' : 'text-gray-900'
                    }`}>
                      Vendor (Retailer/Kirana Store)
                    </p>
                    <p className="text-sm text-gray-600">I want to buy products for my store</p>
                  </div>
                </div>

                {/* Supplier Option */}
                <div 
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.role === 'supplier' 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleRoleChange('supplier')}
                >
                  <input
                    type="radio"
                    name="role"
                    value="supplier"
                    checked={formData.role === 'supplier'}
                    onChange={() => handleRoleChange('supplier')}
                    className="sr-only"
                  />
                  <Truck className={`h-5 w-5 mr-3 ${
                    formData.role === 'supplier' ? 'text-emerald-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <p className={`font-medium ${
                      formData.role === 'supplier' ? 'text-emerald-900' : 'text-gray-900'
                    }`}>
                      Supplier (Wholesaler/Distributor)
                    </p>
                    <p className="text-sm text-gray-600">I want to sell products to retailers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conditional File Upload for Supplier */}
            {formData.role === 'supplier' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Verification Required</h4>
                <p className="text-sm text-blue-700 mb-3">
                  As a supplier, please upload your business verification documents (GSTIN, FSSAI, etc.)
                </p>
                <div className="relative">
                  <input
                    type="file"
                    id="verification"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="verification"
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors duration-200"
                  >
                    <Upload className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-blue-700">
                      {verificationFile ? verificationFile.name : 'Upload Verification Documents'}
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-200">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
