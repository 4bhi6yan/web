import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/CartContext';
import { WishlistContext } from '@/context/WishlistContext';
import { AuthContext } from '@/context/AuthContext';
import { ProductContext } from '@/context/ProductContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const { setFilters } = useContext(ProductContext);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  const navItems = [
    { name: 'Women', path: '/women' },
    { name: 'Men', path: '/men' },
    { name: 'Style Advisor', path: '/style-advisor' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchQuery }));
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate('/shop');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="hidden md:flex items-center justify-start flex-1">
              <nav className="flex space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`nav-link transition-colors ${
                      location.pathname === item.path
                        ? 'text-black font-medium'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="md:hidden flex-1 flex justify-start">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black hover:bg-gray-100">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            <div className="flex justify-center">
              <Link to="/" className="text-4xl tracking-widest text-black font-serif">
                CYLO
              </Link>
            </div>

            <div className="flex items-center justify-end space-x-2 sm:space-x-4 flex-1">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="text-black hover:bg-gray-100">
                <Search className="h-5 w-5" />
              </Button>
              
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="hidden sm:flex text-black hover:bg-gray-100 relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                      {wishlistItemCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to={user ? "/profile" : "/login"}>
                <Button variant="ghost" size="icon" className="hidden sm:flex text-black hover:bg-gray-100">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100 relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                        {cartItemCount}
                      </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 py-4"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)} className="nav-link text-gray-600 hover:text-black">
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-gray-100 pt-4 flex flex-col space-y-4">
                   <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="nav-link text-gray-600 hover:text-black">All Products</Link>
                   <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="nav-link text-gray-600 hover:text-black">Wishlist</Link>
                   <Link to={user ? "/profile" : "/login"} onClick={() => setIsMenuOpen(false)} className="nav-link text-gray-600 hover:text-black">Account</Link>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </header>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-4 max-w-2xl mx-auto">
              <Search className="h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, color, or category..."
                className="w-full text-lg bg-transparent focus:outline-none"
                autoFocus
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Header;