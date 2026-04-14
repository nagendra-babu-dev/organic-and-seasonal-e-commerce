import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';
import PrivateRoute from './components/auth/PrivateRoute';
import FarmerRoute from './components/auth/FarmerRoute';
import CustomerRoute from './components/auth/CustomerRoute';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SellerOrders from './pages/SellerOrders';
import SellerProducts from './pages/SellerProducts';
import SellerProfile from './pages/SellerProfile';
import CustomerOrders from './pages/CustomerOrders';
import CustomerWishlist from './pages/CustomerWishlist';
import CustomerReviews from './pages/CustomerReviews';
import CustomerProfile from './pages/CustomerProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/responsive.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/order-confirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/seller/orders" element={<FarmerRoute><SellerOrders /></FarmerRoute>} />
            <Route path="/seller/products" element={<FarmerRoute><SellerProducts /></FarmerRoute>} />
            <Route path="/seller/profile" element={<FarmerRoute><SellerProfile /></FarmerRoute>} />
            <Route path="/customer/orders" element={<CustomerRoute><CustomerOrders /></CustomerRoute>} />
            <Route path="/customer/wishlist" element={<CustomerRoute><CustomerWishlist /></CustomerRoute>} />
            <Route path="/customer/reviews" element={<CustomerRoute><CustomerReviews /></CustomerRoute>} />
            <Route path="/customer/profile" element={<CustomerRoute><CustomerProfile /></CustomerRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
