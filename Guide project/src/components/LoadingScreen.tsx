import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Define the prop type
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const { scrollYProgress } = useScroll(); // Get scroll progress

  // Transformations for background elements based on scroll progress
  const bgY1 = useTransform(scrollYProgress, [0, 1], ['-20%', '15%']);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ['-15%', '25%']);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ['25%', '-5%']);
  const bgY4 = useTransform(scrollYProgress, [0, 1], ['10%', '-15%']);
  const bgY5 = useTransform(scrollYProgress, [0, 1], ['-5%', '20%']);

  // Scale transforms for dynamism
  const scrollScale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const scrollScale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.1]);
  const scrollScale3 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);
  const scrollScale4 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 1.15]);
  const scrollScale5 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.85]);

  useEffect(() => {
    // Simulate minimum loading time
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-dark-background"> {/* Added fixed positioning and bg */}
      {/* Background Elements with Framer Motion */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-primary/40 rounded-full blur-[100px]"
        style={{ y: bgY1, scale: scrollScale1 }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-secondary/40 rounded-full blur-[100px]"
        style={{ y: bgY2, scale: scrollScale2 }}
      />
      <motion.div
        className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-status-info/30 rounded-full blur-[80px]"
        style={{ y: bgY3, scale: scrollScale3 }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-purple-primary/35 rounded-full blur-[90px]"
        style={{ y: bgY4, scale: scrollScale4 }}
      />
      <motion.div
        className="absolute top-[5%] right-[5%] w-[250px] h-[250px] bg-status-info/35 rounded-full blur-[70px]"
        style={{ y: bgY5, scale: scrollScale5 }}
      />
      {/* HusAI Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src="/husai_logo_svg.svg"
          alt="HusAI Logo"
          width="120"
          height="120"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
