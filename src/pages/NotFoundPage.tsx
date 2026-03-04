import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-rozina-cream px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-12 rounded-2xl shadow-xl border border-stone-100 max-w-lg w-full"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-rozina-maroon/10 p-6 rounded-full">
            <AlertCircle className="w-16 h-16 text-rozina-maroon" />
          </div>
        </div>
        
        <h1 className="text-6xl font-serif font-bold text-rozina-maroon mb-2">404</h1>
        <h2 className="text-2xl font-sans font-medium text-rozina-charcoal mb-4">Page Not Found</h2>
        
        <p className="text-stone-500 mb-8 font-light">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-bold tracking-widest uppercase rounded-none text-white bg-rozina-maroon hover:bg-rozina-maroon/90 shadow-lg transition-all hover:scale-105 duration-300 gap-2"
        >
          <Home className="w-4 h-4" /> Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
