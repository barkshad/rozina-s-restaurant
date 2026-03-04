import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Clock, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

const HomePage = () => {
  return (
    <div className="overflow-hidden bg-rozina-cream">
      {/* Hero Section - Asymmetric Split */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left Content - 40% */}
        <div className="lg:w-[45%] bg-rozina-maroon text-rozina-cream flex flex-col justify-center px-8 md:px-16 py-20 relative z-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block text-rozina-gold font-sans text-sm tracking-[0.2em] uppercase mb-6 border-l-2 border-rozina-gold pl-4">
              Est. Nakuru
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.9] mb-8">
              Taste <br/>
              <span className="text-rozina-gold italic font-normal">Tradition</span> <br/>
              In Every Bite
            </h1>
            <p className="text-lg md:text-xl font-sans font-light text-rozina-cream/80 mb-12 max-w-md leading-relaxed">
              Experience the authentic flavors of Nakuru. From our legendary Poussin Chicken to handcrafted Italian pastas, every dish tells a story.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/menu" className="group relative px-8 py-4 bg-rozina-gold text-rozina-maroon font-sans font-medium tracking-wide overflow-hidden">
                <span className="relative z-10 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                  Explore Menu <ArrowRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"></div>
              </Link>
              <Link to="/about" className="group px-8 py-4 border border-rozina-gold/30 text-rozina-gold font-sans font-medium tracking-wide hover:bg-rozina-gold/10 transition-colors">
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Image - 60% */}
        <div className="lg:w-[55%] relative min-h-[50vh] lg:min-h-screen bg-stone-900">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rozina-maroon/90 via-rozina-maroon/20 to-transparent lg:bg-gradient-to-r lg:from-rozina-maroon lg:via-transparent lg:to-transparent"></div>
          </motion.div>
          
          {/* Floating Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-8 max-w-xs text-white hidden lg:block"
          >
            <h3 className="font-serif text-2xl text-rozina-gold mb-4">Visit Us</h3>
            <div className="space-y-4 font-sans text-sm font-light">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-rozina-gold shrink-0" />
                <p>Open Daily: 10:00 AM - 10:00 PM</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rozina-gold shrink-0" />
                <p>Kenyatta Avenue, Nakuru</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-rozina-gold shrink-0" />
                <p>+254 700 000 000</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section - Overlapping Grid */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-serif text-rozina-maroon mb-8 leading-none">
                Crafted with <br/>
                <span className="text-rozina-gold italic">Passion</span>
              </h2>
              <p className="text-rozina-charcoal/70 font-sans leading-relaxed mb-8 text-lg">
                At Rozina's, we don't just serve food; we curate experiences. Our menu is a testament to the rich culinary heritage of Nakuru, blended with global influences.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "Signature Poussin", desc: "Our secret spicy sauce recipe that has become a local legend." },
                  { title: "Wood-Fired Flavors", desc: "Authentic BBQ and Tikka prepared over traditional charcoal grills." },
                  { title: "Fresh Ingredients", desc: "Sourced daily from local farmers to ensure peak freshness." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 group">
                    <span className="w-12 h-[1px] bg-rozina-maroon mt-3 group-hover:w-20 group-hover:bg-rozina-gold transition-all duration-300"></span>
                    <div>
                      <h4 className="font-serif text-xl text-rozina-maroon mb-1">{item.title}</h4>
                      <p className="text-sm text-rozina-charcoal/60 font-sans">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-12"
              >
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" 
                  alt="Signature Dish" 
                  className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
                  alt="Restaurant Interior" 
                  className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </div>
            {/* Decorative Gold Box */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-rozina-gold/30 -z-10 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rozina-charcoal text-rozina-cream py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Utensils className="w-12 h-12 text-rozina-gold mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to Dine?</h2>
          <p className="text-xl font-sans font-light text-white/70 mb-12 max-w-2xl mx-auto">
            Whether it's a romantic dinner, a family gathering, or a quick lunch, we have the perfect table for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-rozina-gold text-rozina-maroon font-sans font-bold tracking-wide hover:bg-white transition-colors">
              Book a Table
            </button>
            <Link to="/menu" className="px-10 py-4 border border-rozina-gold text-rozina-gold font-sans font-medium tracking-wide hover:bg-rozina-gold/10 transition-colors">
              Order Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
