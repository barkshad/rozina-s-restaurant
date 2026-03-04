import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  className?: string;
}

const FadeInUp: React.FC<FadeInUpProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  y = 50, 
  stagger = 0,
  className = "" 
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { 
        opacity: 0, 
        y: y 
      },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%", // Animation starts when top of element hits 85% of viewport height
          toggleActions: "play none none reverse" // Play on enter, reverse on leave back up
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay, duration, y]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default FadeInUp;
