import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-rozina-maroon mb-4">About Rozina's</h1>
        <div className="w-24 h-1 bg-rozina-gold mx-auto rounded-full"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="p-8 md:p-12 space-y-6 text-lg text-stone-700 leading-relaxed">
            <p>
              Welcome to <span className="font-bold text-rozina-maroon">Rozina's Restaurant</span>, a culinary gem located in the heart of Nakuru. 
              Established with a passion for bringing diverse flavors to our community, we have become a beloved destination for food lovers.
            </p>
            <p>
              Our philosophy is simple: <span className="italic">good food brings people together</span>. That's why we've curated a menu that spans continents, 
              featuring everything from our famous Poussin Specials and spicy BBQ Tikka to authentic Chinese dishes, comforting Italian pastas, and fresh Seafood.
            </p>
            <p>
              At Rozina's, we believe in quality without compromise. Our chefs select the finest local ingredients to craft dishes that are not only delicious 
              but also memorable. Whether you're joining us for a family dinner, a business lunch, or a quick bite, we promise an experience that delights the senses.
            </p>
            <p className="font-serif text-xl text-rozina-maroon pt-4">
              Karibu Rozina's – Taste the Tradition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
