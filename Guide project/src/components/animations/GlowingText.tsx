import React from 'react';

interface GlowingTextProps {
  text: string;
  className?: string;
}

const GlowingText: React.FC<GlowingTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`animate-glow ${char === ' ' ? 'w-2' : 'inline-block'}`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default GlowingText;