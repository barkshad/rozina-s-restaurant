import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-rozina-charcoal text-white/60 font-sans pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="block mb-6">
              <span className="font-serif text-3xl text-white font-bold tracking-tight">Rozina's</span>
            </Link>
            <p className="text-sm font-light leading-relaxed mb-6">
              A culinary landmark in Nakuru, serving authentic flavors with a touch of elegance since establishment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/40 hover:text-rozina-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-rozina-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-rozina-gold transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/menu" className="hover:text-rozina-gold transition-colors">Our Menu</Link></li>
              <li><Link to="/about" className="hover:text-rozina-gold transition-colors">Our Story</Link></li>
              <li><Link to="/checkout" className="hover:text-rozina-gold transition-colors">Order Online</Link></li>
              <li><Link to="/admin" className="hover:text-rozina-gold transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rozina-gold shrink-0" />
                <span>Kenyatta Avenue,<br/>Nakuru, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rozina-gold shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rozina-gold shrink-0" />
                <span>info@rozinas.co.ke</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Opening Hours</h4>
            <ul className="space-y-2 text-sm font-light">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span className="text-white">10:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat</span>
                <span className="text-white">10:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white">11:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-light tracking-wide">
          <p>&copy; {new Date().getFullYear()} Rozina's Restaurant. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
