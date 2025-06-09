import React, { useEffect, useState } from 'react';

const ParallaxBackground: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <div 
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
        style={{
          backgroundImage: 'url(/galaxy.png)',
          transform: `translateY(${scrollPosition * 0.15}px)`,
          willChange: 'transform'
        }}
      >
        {/* Overlay gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-background/20 via-dark-background/30 to-dark-background/40" />
      </div>
    </div>
  );
};

export default ParallaxBackground;