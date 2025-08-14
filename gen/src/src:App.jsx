import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import CategoryPage from '@/pages/CategoryPage';
import Wishlist from '@/pages/Wishlist';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import About from '@/pages/About';
import StyleAdvisor from '@/pages/StyleAdvisor';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ProductProvider } from '@/context/ProductContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="min-h-screen bg-white">
                <Helmet>
                  <title>Cylo - Premium Fashion & Style</title>
                  <meta name="description" content="Discover premium fashion at Cylo. Shop the latest trends in clothing with our minimalist, elegant designs inspired by modern style." />
                  <meta property="og:title" content="Cylo - Premium Fashion & Style" />
                  <meta property="og:description" content="Discover premium fashion at Cylo. Shop the latest trends in clothing with our minimalist, elegant designs inspired by modern style." />
                </Helmet>
                
                <Header />
                
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/women" element={<CategoryPage category="Women" />} />
                    <Route path="/men" element={<CategoryPage category="Men" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/style-advisor" element={<StyleAdvisor />} />
                    <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                  </Routes>
                </main>
                
                <Toaster />
              </div>
            </CartProvider>
          </WishlistProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;