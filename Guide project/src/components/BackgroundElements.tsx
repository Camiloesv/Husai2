import React, { useEffect, useState } from 'react';

const BackgroundElements: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div 
        className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
        style={{
          perspective: '1000px',
          transform: `translateZ(0)`,
        }}
      >
        {/* Dynamic grid background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(156, 39, 176, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(156, 39, 176, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollPosition * 0.2}px) rotateX(${scrollPosition * 0.02}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />

        {/* Animated gradient orbs */}
        <div 
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-primary/20 rounded-full blur-[100px] floating"
          style={{
            transform: `translate(${Math.sin(scrollPosition * 0.002) * 50}px, ${scrollPosition * 0.3}px)`,
          }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-secondary/20 rounded-full blur-[100px] floating"
          style={{
            transform: `translate(${Math.cos(scrollPosition * 0.002) * 50}px, ${-scrollPosition * 0.3}px)`,
            animationDelay: '-3s',
          }}
        />
        <div 
          className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-status-info/10 rounded-full blur-[100px] floating"
          style={{
            transform: `translate(${Math.sin(scrollPosition * 0.003) * 30}px, ${Math.cos(scrollPosition * 0.002) * 30}px)`,
            animationDelay: '-1.5s',
          }}
        />

        {/* Animated lines */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-purple-primary/30 to-transparent"
              style={{
                top: `${20 * (i + 1)}%`,
                transform: `translateX(${Math.sin(scrollPosition * 0.002 + i) * 50}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay gradient for better text contrast */}
      <div className="fixed inset-0 bg-gradient-to-b from-dark-background/80 via-transparent to-dark-background/80 pointer-events-none z-0" />
    </>
  );
};

export default BackgroundElements;