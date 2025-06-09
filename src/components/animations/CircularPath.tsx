import React, { useEffect, useRef } from 'react';

const CircularPath: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let baseRotation = 0;
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      baseRotation += deltaScroll * 0.005; // Añade scroll directamente a la rotación
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;

      // Rotación base lenta hacia la derecha
      baseRotation += 0.001;

      // Dibujar ruta circular
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(114, 24, 173, 0.03)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Dibujar puntos giratorios
      const offsets = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      offsets.forEach((offset) => {
        const angle = baseRotation + offset;
        const pointX = centerX + radius * Math.cos(angle);
        const pointY = centerY + radius * Math.sin(angle);

        const gradient = ctx.createRadialGradient(pointX, pointY, 0, pointX, pointY, 20);
        gradient.addColorStop(0, 'rgba(39, 144, 176, 0.3)');
        gradient.addColorStop(1, 'rgba(166, 20, 211, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(pointX, pointY, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#27a1b0';
        ctx.arc(pointX, pointY, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      className="w-full h-full z-0 opacity-50"
    />
  );
};

export default CircularPath;
