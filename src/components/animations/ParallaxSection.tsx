import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgImage: string;
  speed?: number; // 0.5 means background moves at half speed
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  bgImage, 
  speed = 0.5, 
  className = "",
  overlayColor = "black",
  overlayOpacity = 0.5
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;

    if (!section || !bg) return;

    const tween = gsap.to(bg, {
      yPercent: 50 * speed, // Move background vertically
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom", // Start when top of section hits bottom of viewport
        end: "bottom top",   // End when bottom of section hits top of viewport
        scrub: true
      }
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div 
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
      />
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
