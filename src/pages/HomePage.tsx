import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Award, Clock } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-rozina-maroon text-white rounded-3xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 px-8 py-24 md:py-32 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-rozina-gold drop-shadow-lg">
            Rozina's Restaurant
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light text-stone-100">
            Nakuru's Premier Destination for Authentic Cuisine
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-rozina-gold text-rozina-maroon hover:bg-white hover:text-rozina-maroon transition-all transform hover:scale-105 shadow-lg"
            >
              View Menu <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full border-2 border-white text-white hover:bg-white hover:text-rozina-maroon transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 text-center px-4">
        <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rozina-maroon/10 text-rozina-maroon mb-6">
            <Utensils className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-stone-800">Diverse Menu</h3>
          <p className="text-stone-600">
            From Poussin Specials to Italian Classics, we offer a culinary journey for every palate.
          </p>
        </div>
        <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rozina-maroon/10 text-rozina-maroon mb-6">
            <Award className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-stone-800">Quality First</h3>
          <p className="text-stone-600">
            We use only the freshest ingredients to ensure every dish meets our high standards.
          </p>
        </div>
        <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rozina-maroon/10 text-rozina-maroon mb-6">
            <Clock className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-stone-800">Fast Service</h3>
          <p className="text-stone-600">
            Experience prompt and friendly service, whether you're dining in or ordering out.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
