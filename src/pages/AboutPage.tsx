import React from 'react';
import { motion } from 'motion/react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-serif font-bold text-rozina-maroon mb-6"
        >
          About Rozina's
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8 }}
          className="h-1.5 bg-rozina-gold mx-auto rounded-full"
        ></motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100"
      >
        <div className="md:flex relative">
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rozina-maroon to-rozina-gold"></div>
          
          <div className="p-10 md:p-16 space-y-8 text-lg text-stone-700 leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-rozina-maroon first-letter:float-left first-letter:mr-3 first-letter:mt-[-8px]">
              Welcome to <span className="font-bold text-rozina-maroon">Rozina's Restaurant</span>, a culinary gem located in the heart of Nakuru. 
              Established with a passion for bringing diverse flavors to our community, we have become a beloved destination for food lovers.
            </p>
            <p>
              Our philosophy is simple: <span className="italic font-serif text-xl text-stone-900">good food brings people together</span>. That's why we've curated a menu that spans continents, 
              featuring everything from our famous Poussin Specials and spicy BBQ Tikka to authentic Chinese dishes, comforting Italian pastas, and fresh Seafood.
            </p>
            <p>
              At Rozina's, we believe in quality without compromise. Our chefs select the finest local ingredients to craft dishes that are not only delicious 
              but also memorable. Whether you're joining us for a family dinner, a business lunch, or a quick bite, we promise an experience that delights the senses.
            </p>
            
            <div className="pt-8 border-t border-stone-100 text-center">
              <p className="font-serif text-3xl text-rozina-maroon italic">
                "Karibu Rozina's – Taste the Tradition."
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
