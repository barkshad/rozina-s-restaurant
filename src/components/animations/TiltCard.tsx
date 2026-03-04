import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  perspective?: number;
  scale?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = "", 
  perspective = 1000,
  scale = 1.05
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        transform: isHovering 
          ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})` 
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
      }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
