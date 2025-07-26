import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Upload, UserCheck, Truck } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [gstinFile, setGstinFile] = useState(null);
  const [fssaiFile, setFssaiFile] = useState(null);
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

    if (formData.role === 'supplier') {
      if (gstinFile) formDataToSend.append('gstin', gstinFile);
      if (fssaiFile) formDataToSend.append('fssai', fssaiFile);
    }
    
    try {
      // Use relative URL
      await axios.post('/api/auth/register', formDataToSend);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... Your existing JSX for the form ...
    // Make sure to add the error display and disable button on loading
    <div className="min-h-screen bg-gray-50 flex items-center justify-center ...">
        <div className="max-w-md w-full space-y-8">
            {/* ... header ... */}
            <div className="bg-white rounded-xl shadow-sm ... p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="bg-red-100 ...">{error}</div>}
                    {/* ... all form fields ... */}
                    <button type="submit" disabled={loading} className="w-full ...">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                {/* ... footer link ... */}
            </div>
        </div>
    </div>
  );
};

export default SignupForm;