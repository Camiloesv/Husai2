import React, { ReactNode } from 'react';
import { useCardHover } from '../../hooks/useCardHover';

interface CardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const Card: React.FC<CardProps> = ({ children, className = '', intensity = 15 }) => {
  const { style, handlers } = useCardHover(intensity);

  return (
    <div
      className={`glass-card transform-gpu ${className}`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
      }}
      {...handlers}
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </div>
  );
};

export default Card;