// import React, { useState } from 'react';
// import { User, Mail, Lock, Eye, EyeOff, UserCheck, Truck } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const SignupForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: ''
//   });
//   const [gstinFile, setGstinFile] = useState(null);
//   const [fssaiFile, setFssaiFile] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
  
//   const handleRoleChange = (role) => {
//     setFormData({ ...formData, role: role });
//     if (role !== 'supplier') {
//       setGstinFile(null);
//       setFssaiFile(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.role) {
//         setError('Please select a role (Vendor or Supplier).');
//         return;
//     }
    
//     setLoading(true);
//     setError('');

//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('email', formData.email);
//     formDataToSend.append('password', formData.password);
//     formDataToSend.append('role', formData.role);

//     if (formData.role === 'supplier') {
//       if (gstinFile) formDataToSend.append('gstin', gstinFile);
//       if (fssaiFile) formDataToSend.append('fssai', fssaiFile);
//     }
    
//     try {
//       // FIX: Use a relative URL so the Vite proxy works correctly.
//       await axios.post('/api/auth/register', formDataToSend);
      
//       alert('Registration successful! Please log in.');
//       navigate('/login');

//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-emerald-600 mb-2">VyaparSetu</h1>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Join our platform</h2>
//           <p className="text-gray-600">Create your business account to get started</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//                 <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
//                     <p>{error}</p>
//                 </div>
//             )}
//             {/* Full Name Field */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
//                 <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200" placeholder="Enter your full name" />
//               </div>
//             </div>
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
//                 <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200" placeholder="Enter your email" />
//               </div>
//             </div>
//             {/* Password Field */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
//                 <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleInputChange} className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200" placeholder="Create a strong password" />
//                 <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
//                 </button>
//               </div>
//             </div>
//             {/* Role Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
//               <div className="space-y-3">
//                 <div 
//                   className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
//                     formData.role === 'vendor' 
//                       ? 'border-emerald-500 bg-emerald-50' 
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                   onClick={() => handleRoleChange('vendor')}
//                 >
//                   <UserCheck className={`h-5 w-5 mr-3 ${
//                     formData.role === 'vendor' ? 'text-emerald-600' : 'text-gray-400'
//                   }`} />
//                   <div>
//                     <p className={`font-medium ${
//                       formData.role === 'vendor' ? 'text-emerald-900' : 'text-gray-900'
//                     }`}>
//                       Vendor (Retailer/Kirana Store)
//                     </p>
//                     <p className="text-sm text-gray-600">I want to buy products for my store</p>
//                   </div>
//                 </div>
//                 <div 
//                   className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
//                     formData.role === 'supplier' 
//                       ? 'border-emerald-500 bg-emerald-50' 
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                   onClick={() => handleRoleChange('supplier')}
//                 >
//                   <Truck className={`h-5 w-5 mr-3 ${
//                     formData.role === 'supplier' ? 'text-emerald-600' : 'text-gray-400'
//                   }`} />
//                   <div>
//                     <p className={`font-medium ${
//                       formData.role === 'supplier' ? 'text-emerald-900' : 'text-gray-900'
//                     }`}>
//                       Supplier (Wholesaler/Distributor)
//                     </p>
//                     <p className="text-sm text-gray-600">I want to sell products to retailers</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Conditional File Upload for Supplier */}
//             {formData.role === 'supplier' && (
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
//                 <h4 className="font-medium text-blue-900">Verification Documents</h4>
//                 <div>
//                     <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-2">GSTIN Document (Required)</label>
//                     <input type="file" id="gstin" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setGstinFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"/>
//                 </div>
//                  <div>
//                     <label htmlFor="fssai" className="block text-sm font-medium text-gray-700 mb-2">FSSAI License (Optional)</label>
//                     <input type="file" id="fssai" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFssaiFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"/>
//                 </div>
//               </div>
//             )}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-emerald-400 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Creating Account...' : 'Create Account'}
//             </button>
//           </form>
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-200">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;












import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Upload, UserCheck, Truck } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  // const [gstinFile, setGstinFile] = useState(null); // Commented out for testing
  // const [fssaiFile, setFssaiFile] = useState(null); // Commented out for testing
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleRoleChange = (role) => setFormData({ ...formData, role: role });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
        setError('Please select a role (Vendor or Supplier).');
        return;
    }
    setLoading(true);
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);

    // --- Document upload logic commented out for testing ---
    // if (formData.role === 'supplier') {
    //   if (gstinFile) formDataToSend.append('gstin', gstinFile);
    //   if (fssaiFile) formDataToSend.append('fssai', fssaiFile);
    // }
    
    try {
      await axios.post('${import.meta.env.VITE_APP_API_BASE_URL}/auth/register', formDataToSend);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-emerald-600 mb-2">VyaparSetu</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Business Account</h2>
                <p className="text-gray-600">Join a network of trusted vendors and suppliers</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg" role="alert"><p>{error}</p></div>}
                    
                    {/* Role Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => handleRoleChange('vendor')} className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${formData.role === 'vendor' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}>
                            <UserCheck className="w-6 h-6 mb-2" />
                            <span className="font-medium">Vendor</span>
                        </button>
                        <button type="button" onClick={() => handleRoleChange('supplier')} className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${formData.role === 'supplier' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}>
                            <Truck className="w-6 h-6 mb-2" />
                            <span className="font-medium">Supplier</span>
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="mt-1 relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <div className="mt-1 relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1 relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleInputChange} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    {/* --- Document upload fields commented out for testing --- */}
                    {/* {formData.role === 'supplier' && (
                        <>
                            <div>
                                <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">GSTIN Document</label>
                                <div className="mt-1 relative">
                                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input id="gstin" name="gstin" type="file" onChange={(e) => setGstinFile(e.target.files[0])} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="fssai" className="block text-sm font-medium text-gray-700">FSSAI License (Optional)</label>
                                <div className="mt-1 relative">
                                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input id="fssai" name="fssai" type="file" onChange={(e) => setFssaiFile(e.target.files[0])} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"/>
                                </div>
                            </div>
                        </>
                    )} */}

                    <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-700">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SignupForm;
