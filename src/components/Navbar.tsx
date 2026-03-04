import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const shouldShowSolid = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Admin', path: '/admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={clsx(
        'fixed w-full z-50 transition-all duration-500 font-sans',
        shouldShowSolid
          ? 'bg-rozina-maroon/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex flex-col items-center">
            <span className={clsx(
              "font-serif text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300",
              shouldShowSolid ? "text-rozina-gold" : "text-white"
            )}>
              Rozina's
            </span>
            <span className={clsx(
              "text-[10px] tracking-[0.3em] uppercase font-light transition-colors duration-300",
              shouldShowSolid ? "text-white/80" : "text-white/80"
            )}>
              Restaurant
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'text-sm uppercase tracking-widest font-medium transition-all duration-300 relative group',
                  isActive(link.path)
                    ? 'text-rozina-gold'
                    : shouldShowSolid ? 'text-white hover:text-rozina-gold' : 'text-white hover:text-rozina-gold'
                )}
              >
                {link.name}
                <span className={clsx(
                  "absolute -bottom-2 left-0 w-full h-[1px] bg-rozina-gold transform transition-transform duration-300 origin-left",
                  isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
              </Link>
            ))}
            
            <Link to="/checkout" className="relative group p-2">
              <ShoppingCart className={clsx(
                "w-6 h-6 transition-colors duration-300",
                shouldShowSolid ? "text-white group-hover:text-rozina-gold" : "text-white group-hover:text-rozina-gold"
              )} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-rozina-gold text-rozina-maroon text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-rozina-gold transition-colors p-2"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-rozina-maroon border-t border-white/10 shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'text-lg font-serif font-medium tracking-wide transition-colors',
                    isActive(link.path)
                      ? 'text-rozina-gold pl-4 border-l-2 border-rozina-gold'
                      : 'text-white hover:text-rozina-gold'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-lg font-serif font-medium text-white hover:text-rozina-gold pt-4 border-t border-white/10"
              >
                <span>My Cart</span>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm bg-rozina-gold text-rozina-maroon px-2 py-0.5 rounded-full font-sans font-bold">
                    {cartCount}
                  </span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
