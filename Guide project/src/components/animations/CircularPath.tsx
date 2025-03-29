import React, { useEffect, useRef } from 'react';

const CircularPath: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the path
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(156, 39, 176, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw the moving dot
      const dotX = centerX + radius * Math.cos(angle);
      const dotY = centerY + radius * Math.sin(angle);
      
      // Dot glow effect
      const gradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 20);
      gradient.addColorStop(0, 'rgba(156, 39, 176, 0.3)');
      gradient.addColorStop(1, 'rgba(156, 39, 176, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(dotX, dotY, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#9C27B0';
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fill();

      angle += 0.02;
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 opacity-50"
    />
  );
};

export default CircularPath;