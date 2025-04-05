import React, { useEffect, useRef } from 'react';

const CircularPath: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let scrollOffset = 0;
  const factor = 0.0025; // Ajusta este factor para modificar la sensibilidad al scroll

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
      scrollOffset = window.pageYOffset;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calcular el centro y el radio
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      
      // Dibujar la ruta circular
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(156, 39, 176, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Calcular ángulo base en función del scroll
      const baseAngle = scrollOffset * factor;
      // Definir los 4 puntos equidistantes (0, 90, 180 y 270 grados)
      const offsets = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

      offsets.forEach((offset) => {
        const angle = baseAngle + offset;
        const pointX = centerX + radius * Math.cos(angle);
        const pointY = centerY + radius * Math.sin(angle);
        
        // Crear gradiente para el efecto glow
        const gradient = ctx.createRadialGradient(pointX, pointY, 0, pointX, pointY, 20);
        gradient.addColorStop(0, 'rgba(156, 39, 176, 0.3)');
        gradient.addColorStop(1, 'rgba(156, 39, 176, 0)');
        
        // Dibujar el glow
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(pointX, pointY, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Dibujar el punto central
        ctx.beginPath();
        ctx.fillStyle = '#9C27B0';
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
