import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 mt-auto border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-rozina-gold mb-4">Rozina's</h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Authentic cuisine crafted with passion. Experience the taste of tradition in every bite.
            </p>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <p className="text-sm mb-2">Kenyatta Avenue, Nakuru</p>
            <p className="text-sm mb-2">+254 700 000 000</p>
            <p className="text-sm">info@rozinas.co.ke</p>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="#" className="text-stone-400 hover:text-rozina-gold transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-stone-400 hover:text-rozina-gold transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-stone-400 hover:text-rozina-gold transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Rozina's Restaurant, Nakuru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
