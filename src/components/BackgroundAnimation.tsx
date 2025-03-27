import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BackgroundAnimation: React.FC = () => {
  const { scrollYProgress } = useScroll(); // Get scroll progress

  // Transformations for background elements based on scroll progress
  const bgY1 = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ['30%', '0%']);
  const bgScale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const bgScale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.1]);
  const bgScale3 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);

  return (
    <>
      {/* Background Elements with Framer Motion */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-primary/20 rounded-full blur-[100px]"
        style={{ y: bgY1, scale: bgScale1 }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-secondary/20 rounded-full blur-[100px]"
        style={{ y: bgY2, scale: bgScale2 }}
      />
      <motion.div
        className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-status-info/10 rounded-full blur-[100px]"
        style={{ y: bgY3, scale: bgScale3 }}
      />
    </>
  );
};

export default BackgroundAnimation;
