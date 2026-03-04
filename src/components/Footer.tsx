import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Rozina's Restaurant, Nakuru. All rights reserved.</p>
        <p className="text-sm">Authentic Cuisine • Exceptional Service</p>
      </div>
    </footer>
  );
};

export default Footer;
