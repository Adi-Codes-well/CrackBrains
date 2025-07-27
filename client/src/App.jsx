import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import LoginForm from './pages/auth/LoginForm';
import SignupForm from './pages/auth/SignupForm';
import UserProfile from './pages/auth/UserProfile';
import RoleSelection from './pages/auth/RoleSelection';

import VendorDashboard from './pages/Vendor/VendorDashboard';
import BrowseProducts from './pages/Vendor/BrowseProducts';
import ProductDetails from './pages/Vendor/ProductDetails';
import MyOrders from './pages/Vendor/MyOrders';
import SubmitReview from './pages/Vendor/SubmitReview';

import SupplierDashboard from './pages/supplier/SupplierDashBoard';
import AddProductForm from './pages/supplier/AddProductForm';
import OrdersReceived from './pages/supplier/OrdersReceived';
import ProductManageCard from './pages/supplier/ProductManageCard';

import ProtectedRoute from './components/ProtectedRoute'; 
import MyProducts from './pages/supplier/myProduct';
import VendorPage from './pages/Vendor/VendorPage';
import SupplierPage from './pages/supplier/SupplierPage';
import AboutPage from './pages/AboutPage';
import TrustEnginePage from './pages/TrustEnginePage';
import OrderManageCard from './pages/supplier/OrderManageCard';
import MyReviews from './pages/Vendor/MyReviews';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      

      <Route element={<ProtectedRoute />}>
        {/* Vendor Routes */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/browse" element={<BrowseProducts />} />
        <Route path="/vendor/details/:id" element={<ProductDetails />} />
        <Route path="/vendor/orders" element={<MyOrders />} />
        <Route path="/vendor/review" element={<SubmitReview />} />
        <Route path="/vendor/reviews" element={<MyReviews />} />

        {/* Supplier Routes */}
        <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
         <Route path="/supplier/products" element={<MyProducts />} />
        <Route path="/supplier/add-product" element={<AddProductForm />} />
        <Route path="/supplier/orders-received" element={<OrdersReceived />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/vendor" element={<VendorPage />} />
        <Route path="/supplier" element={<SupplierPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/trust-engine" element={<TrustEnginePage />} />
        <Route path="/order-manage" element={<OrderManageCard />} />
      </Route>
      
      <Route path="*" element={<div><h2>404 Page Not Found</h2></div>} />
    </Routes>
  );
};

export default App;