import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import LoginForm from './pages/auth/LoginForm';
import SignupForm from './pages/auth/SignupForm';
import UserProfile from './pages/auth/UserProfile';
import RoleSelection from './pages/auth/RoleSelection';

import VendorDashboard from './pages/vendor/VendorDashboard';
import BrowseProducts from './pages/vendor/BrowseProducts';
import ProductDetails from './pages/Vendor/ProductDetails';
import MyOrders from './pages/Vendor/MyOrders';
import SubmitReview from './pages/Vendor/SubmitReview';

import SupplierDashboard from './pages/supplier/SupplierDashBoard';
import AddProductForm from './pages/supplier/AddProductForm';
import OrdersReceived from './pages/supplier/OrdersReceived';
import ProductManageCard from './pages/supplier/ProductManageCard';

// Import the component you just created
import ProtectedRoute from './components/ProtectedRoute'; 

const App = () => {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/role-selection" element={<RoleSelection />} />

      {/* --- PROTECTED ROUTES WRAPPER --- */}
      <Route element={<ProtectedRoute />}>
        {/* Vendor Routes */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/browse" element={<BrowseProducts />} />
        <Route path="/vendor/details/:id" element={<ProductDetails />} />
        <Route path="/vendor/orders" element={<MyOrders />} />
        <Route path="/vendor/review" element={<SubmitReview />} />

        {/* Supplier Routes */}
        <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
        <Route path="/supplier/products" element={<ProductManageCard />} />
        <Route path="/supplier/add-product" element={<AddProductForm />} />
        <Route path="/supplier/orders-received" element={<OrdersReceived />} />
        
        {/* Shared Protected Routes */}
        <Route path="/user-profile" element={<UserProfile />} />
      </Route>
      
      {/* Fallback for any unmatched URL */}
      <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-screen">
              <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
              <Link to="/" className="text-emerald-600 hover:underline">Go back to Home</Link>
          </div>
      } />
    </Routes>
  );
};

export default App;