import React from 'react'
import { Routes, Route } from 'react-router-dom';
import VendorDashboard from './pages/vendor/VendorDashboard'
import BrowseProducts from './pages/vendor/BrowseProducts'
import ProductDetails from './pages/Vendor/ProductDetails'
import MyOrders from './pages/Vendor/MyOrders'
import SubmitReview from './pages/Vendor/SubmitReview'
import SupplierDashboard from './pages/supplier/SupplierDashBoard'
import OrderManageCard from './pages/supplier/OrderManageCard'
import ProductManageCard from './pages/supplier/ProductManageCard';
import AddProductForm from './pages/supplier/AddProductForm';
import OrdersReceived from './pages/supplier/OrdersReceived';
import TrustScoreDisplay from './pages/supplier/TrustScoreDisplay';
import LoginForm from './pages/auth/LoginForm';
import RoleSelection from './pages/auth/RoleSelection';
import SignupForm from './pages/auth/SignupForm';
import UserProfile from './pages/auth/UserProfile';
const App = () => {
  return (
    
    <Routes>

      <Route path="/vendor/dashboard" element={<VendorDashboard />} />
      <Route path="/vendor/browse" element={<BrowseProducts />} />
      <Route path="/vendor/details" element={<ProductDetails />} />
      <Route path="/vendor/orders" element={<MyOrders />} />
      <Route path="/vendor/review" element={<SubmitReview />} />
      <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
      <Route path="/supplier/orders" element={<OrderManageCard />} />
      <Route path="/supplier/products" element={<ProductManageCard />} />
      <Route path="/supplier/add-product" element={<AddProductForm />} />
      <Route path="/supplier/orders-received" element={<OrdersReceived />} />
      <Route path="/supplier/trust-score" element={<TrustScoreDisplay />} />
      <Route path="/auth/login" element={<LoginForm />} />
      <Route path="/auth/role-selection" element={<RoleSelection />} />
      <Route path="/auth/signup" element={<SignupForm />} />
      <Route path="/auth/user-profile" element={<UserProfile />} />

    </Routes>



  )
}


export default App