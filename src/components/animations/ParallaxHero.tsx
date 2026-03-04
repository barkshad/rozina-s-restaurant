import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

gsap.registerPlugin(ScrollTrigger);

const ParallaxHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsRef = doc(db, 'settings', 'site_config');
        const settingsSnap = await getDoc(settingsRef);
        if (settingsSnap.exists() && settingsSnap.data().heroVideoUrl) {
          setHeroVideoUrl(settingsSnap.data().heroVideoUrl);
        }
      } catch (error) {
        console.error("Error fetching hero settings:", error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const text = textRef.current;
    const bg = bgRef.current;

    if (!hero || !text || !bg) return;

    // Initial load animation
    const tl = gsap.timeline();
    tl.fromTo(bg, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" })
      .fromTo(text.children, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=1");

    // Scroll parallax
    gsap.to(bg, {
      yPercent: 30,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(text, {
      yPercent: -50,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "center top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Media */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full z-0"
      >
        {heroVideoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            key={heroVideoUrl} // Force re-render when URL changes
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1934&q=80")',
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight drop-shadow-lg">
          Rozina's Restaurant
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wide mb-8 text-stone-200 max-w-2xl mx-auto drop-shadow-md">
          Experience the art of fine dining with flavors that tell a story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/menu" 
            className="px-8 py-4 bg-rozina-gold text-rozina-maroon font-bold uppercase tracking-widest hover:bg-white hover:text-rozina-maroon transition-all duration-300 transform hover:scale-105 shadow-lg rounded-sm"
          >
            View Menu
          </Link>
          <Link 
            to="/about" 
            className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-rozina-maroon transition-all duration-300 transform hover:scale-105 shadow-lg rounded-sm backdrop-blur-sm"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/70">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};

export default ParallaxHero;
