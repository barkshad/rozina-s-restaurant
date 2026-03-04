import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-rozina-cream overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="block text-rozina-gold font-sans text-sm tracking-[0.2em] uppercase mb-4 pl-4 border-l-2 border-rozina-gold"
              >
                Our Story
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-serif font-medium text-rozina-maroon mb-8 leading-tight"
              >
                A Legacy of <br/><span className="italic text-rozina-gold">Flavor</span>
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-6 text-lg text-rozina-charcoal/70 font-sans font-light leading-relaxed"
              >
                <p>
                  Welcome to <span className="font-medium text-rozina-maroon">Rozina's Restaurant</span>, a culinary sanctuary in the heart of Nakuru. What began as a humble family kitchen has grown into a beloved destination for those who seek authenticity in every bite.
                </p>
                <p>
                  Our philosophy is rooted in the belief that food is a language of love. We've curated a menu that bridges cultures, featuring our legendary Poussin Chicken alongside comforting Italian pastas and vibrant Chinese dishes.
                </p>
              </motion.div>
            </div>
            <div className="md:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" 
                  alt="Chef plating a dish" 
                  className="w-full h-[500px] object-cover rounded-none shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rozina-gold flex items-center justify-center text-rozina-maroon font-serif text-xl font-bold p-4 text-center leading-none">
                  Est. 2010
                </div>
              </motion.div>
              <div className="absolute top-10 right-10 w-full h-full border-2 border-rozina-maroon/10 -z-0 transform translate-x-4 translate-y-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Award, title: "Excellence", desc: "We never compromise on quality. From sourcing to plating, every step is handled with care." },
              { icon: Users, title: "Community", desc: "We are more than a restaurant; we are a gathering place for friends, families, and neighbors." },
              { icon: Heart, title: "Passion", desc: "Cooking is our art. Every dish is prepared with dedication and a deep love for the craft." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-rozina-cream rounded-full flex items-center justify-center mb-6 group-hover:bg-rozina-maroon transition-colors duration-500">
                  <item.icon className="w-8 h-8 text-rozina-maroon group-hover:text-rozina-gold transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-serif text-rozina-charcoal mb-4">{item.title}</h3>
                <p className="text-rozina-charcoal/60 font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-rozina-maroon text-rozina-cream text-center px-6">
        <div className="max-w-3xl mx-auto">
          <motion.blockquote 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl italic leading-tight mb-8"
          >
            "Karibu Rozina's – where every meal is a celebration of tradition and taste."
          </motion.blockquote>
          <div className="w-16 h-[1px] bg-rozina-gold mx-auto"></div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
