import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Admin', path: '/admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-rozina-maroon text-white sticky top-0 z-50 shadow-lg backdrop-blur-lg bg-opacity-95 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-serif font-bold text-rozina-gold tracking-tight hover:text-white transition-colors">
              Rozina's
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    isActive(link.path)
                      ? 'bg-rozina-gold text-rozina-maroon shadow-md transform scale-105'
                      : 'hover:bg-white/10 hover:text-rozina-gold'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Link to="/checkout" className="relative p-3 rounded-full hover:bg-white/10 transition-colors group">
              <ShoppingCart className="h-6 w-6 text-rozina-gold group-hover:text-white transition-colors" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-rozina-maroon transform translate-x-1/4 -translate-y-1/4 bg-rozina-gold rounded-full shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-rozina-gold focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-rozina-maroon border-t border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'block px-3 py-3 rounded-md text-base font-medium transition-colors',
                    isActive(link.path)
                      ? 'bg-rozina-gold text-rozina-maroon'
                      : 'text-white hover:bg-white/10 hover:text-rozina-gold'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-white hover:bg-white/10 hover:text-rozina-gold flex items-center justify-between"
              >
                Cart
                {cartCount > 0 && (
                  <span className="bg-rozina-gold text-rozina-maroon px-2 py-1 rounded-full text-xs font-bold">
                    {cartCount} Items
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
