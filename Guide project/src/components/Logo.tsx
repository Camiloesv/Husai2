import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  return (
    <img
      src="/husai_logo_svg.svg"
      alt="HusAI Logo"
      width={size}
      height={size}
      className={className}
    />
  );
};

export default Logo;
