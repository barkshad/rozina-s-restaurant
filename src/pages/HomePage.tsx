import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Award, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const HomePage = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-rozina-maroon text-white rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        {/* Decorative background pattern or image could go here */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10 px-8 py-24 md:py-32 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-rozina-gold drop-shadow-lg"
          >
            Rozina's Restaurant
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-10 font-light text-stone-100"
          >
            Nakuru's Premier Destination for Authentic Cuisine
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/menu"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-rozina-gold text-rozina-maroon hover:bg-white hover:text-rozina-maroon transition-all transform hover:scale-105 shadow-lg"
            >
              View Menu <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full border-2 border-white text-white hover:bg-white hover:text-rozina-maroon transition-all hover:scale-105"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 text-center px-4">
        {[
          { icon: Utensils, title: "Diverse Menu", desc: "From Poussin Specials to Italian Classics, we offer a culinary journey for every palate." },
          { icon: Award, title: "Quality First", desc: "We use only the freshest ingredients to ensure every dish meets our high standards." },
          { icon: Clock, title: "Fast Service", desc: "Experience prompt and friendly service, whether you're dining in or ordering out." }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rozina-maroon/5 text-rozina-maroon mb-6 group-hover:bg-rozina-maroon group-hover:text-white transition-colors">
              <feature.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-stone-800 font-serif">{feature.title}</h3>
            <p className="text-stone-600 leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
