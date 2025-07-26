import React, { useState } from 'react';
import { Store, Truck, ArrowRight, UserCheck } from 'lucide-react';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log('Role selected:', role);
  };

  const roles = [
    {
      id: 'vendor',
      title: 'Vendor',
      subtitle: 'Retailer / Kirana Store Owner',
      description: 'I want to buy products for my retail store and serve my customers better',
      icon: Store,
      features: [
        'Browse verified suppliers',
        'Access wholesale pricing',
        'Track orders easily',
        'Photo-based reviews',
      ],
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 'supplier',
      title: 'Supplier',
      subtitle: 'Wholesaler / Distributor / Manufacturer',
      description: 'I want to sell my products to retailers and expand my business reach',
      icon: Truck,
      features: [
        'List products easily',
        'Manage orders efficiently',
        'Build trust score',
        'Reach more customers',
      ],
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-600 mb-4">VyaparSetu</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome! Tell us who you are</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your role to get started with the right experience for your business needs
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <div
                key={role.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                  isSelected
                    ? `border-${role.color}-500 ring-4 ring-${role.color}-100`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${role.gradient} rounded-t-2xl p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold">{role.title}</h3>
                        <p className="text-sm opacity-90">{role.subtitle}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="bg-white bg-opacity-20 p-2 rounded-full">
                        <UserCheck className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">{role.description}</p>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What you can do:</h4>
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-2 h-2 bg-${role.color}-500 rounded-full mr-3`}></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isSelected
                        ? `bg-${role.color}-600 hover:bg-${role.color}-700 text-white`
                        : `bg-${role.color}-50 hover:bg-${role.color}-100 text-${role.color}-700 border border-${role.color}-200`
                    }`}
                  >
                    <span>{isSelected ? `Continue as ${role.title}` : `Select ${role.title}`}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2">
                    <div className={`bg-${role.color}-500 text-white p-2 rounded-full shadow-lg`}>
                      <UserCheck className="h-5 w-5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedRole && (
          <div className="text-center mt-8">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Continue to Dashboard
            </button>
          </div>
        )}

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help choosing?{' '}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
