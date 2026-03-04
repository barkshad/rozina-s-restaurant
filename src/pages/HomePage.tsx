import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Clock, MapPin, Phone } from 'lucide-react';
import ParallaxHero from '@/components/animations/ParallaxHero';
import FadeInUp from '@/components/animations/FadeInUp';
import ParallaxSection from '@/components/animations/ParallaxSection';
import TiltCard from '@/components/animations/TiltCard';

const HomePage = () => {
  return (
    <div className="overflow-hidden bg-rozina-cream">
      {/* Hero Section - Parallax */}
      <ParallaxHero />

      {/* Featured Section - Overlapping Grid */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative z-10">
            <FadeInUp>
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
            </FadeInUp>
          </div>
          
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-2 gap-4">
              <FadeInUp delay={0.2} className="mt-12">
                <TiltCard>
                  <img 
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" 
                    alt="Signature Dish" 
                    className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-lg shadow-xl"
                  />
                </TiltCard>
              </FadeInUp>
              <FadeInUp delay={0.4}>
                <TiltCard>
                  <img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
                    alt="Restaurant Interior" 
                    className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-lg shadow-xl"
                  />
                </TiltCard>
              </FadeInUp>
            </div>
            {/* Decorative Gold Box */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-rozina-gold/30 -z-10 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* CTA Section - Parallax Background */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&w=1920&q=80"
        className="py-32 px-4 text-center text-white"
        overlayColor="#1a1a1a"
        overlayOpacity={0.7}
      >
        <FadeInUp y={30}>
          <Utensils className="w-12 h-12 text-rozina-gold mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-serif mb-8 relative z-10">Ready to Dine?</h2>
          <p className="text-xl font-sans font-light text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
            Whether it's a romantic dinner, a family gathering, or a quick lunch, we have the perfect table for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <button className="px-10 py-4 bg-rozina-gold text-rozina-maroon font-sans font-bold tracking-wide hover:bg-white transition-colors shadow-lg transform hover:scale-105 duration-300">
              Book a Table
            </button>
            <Link to="/menu" className="px-10 py-4 border-2 border-rozina-gold text-rozina-gold font-sans font-medium tracking-wide hover:bg-rozina-gold/10 transition-colors shadow-lg transform hover:scale-105 duration-300">
              Order Online
            </Link>
          </div>
        </FadeInUp>
      </ParallaxSection>
    </div>
  );
};

export default HomePage;
