import { useState, useEffect, useCallback } from 'react';

interface CardPosition {
  rotateX: number;
  rotateY: number;
  translateZ: number;
}

export const useCardHover = (intensity: number = 15) => {
  const [position, setPosition] = useState<CardPosition>({
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
  });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const rotateX = ((mouseY - height / 2) / height) * -intensity;
    const rotateY = ((mouseX - width / 2) / width) * intensity;
    
    setPosition({
      rotateX,
      rotateY,
      translateZ: 50,
    });
  }, [intensity, isHovering]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setPosition({ rotateX: 0, rotateY: 0, translateZ: 0 });
  }, []);

  return {
    style: {
      transform: `perspective(1000px) rotateX(${position.rotateX}deg) rotateY(${position.rotateY}deg) translateZ(${position.translateZ}px)`,
      transition: isHovering ? 'none' : 'all 0.5s ease-out',
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
};