import React from 'react'; // Removed useState
import { motion, useScroll, useTransform } from 'framer-motion'; // Removed useAnimationControls

const BackgroundAnimation: React.FC = () => {
  const { scrollYProgress } = useScroll(); // Get scroll progress

  // Removed animation controls and handleClick function

  // Transformations for background elements based on scroll progress
  // Increased movement ranges for more dynamism
  const bgY1 = useTransform(scrollYProgress, [0, 1], ['-20%', '15%']); // More movement
  const bgY2 = useTransform(scrollYProgress, [0, 1], ['-15%', '25%']); // More movement
  const bgY3 = useTransform(scrollYProgress, [0, 1], ['25%', '-5%']); // More movement
  const bgY4 = useTransform(scrollYProgress, [0, 1], ['10%', '-15%']); // New circle movement
  const bgY5 = useTransform(scrollYProgress, [0, 1], ['-5%', '20%']); // New circle movement

  // Reverted scale transforms for more dynamism
  const scrollScale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]); // Original scaling
  const scrollScale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.1]); // Original scaling
  const scrollScale3 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]); // Original scaling
  const scrollScale4 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 1.15]); // New circle scaling
  const scrollScale5 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.85]); // New circle scaling

  return (
    // Removed onClick handler and pointer cursor style (remains removed)
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Background Elements with Framer Motion */}
      {/* Increased opacity */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-primary/40 rounded-full blur-[100px]" // Increased opacity to /40
        style={{ y: bgY1, scale: scrollScale1 }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-secondary/40 rounded-full blur-[100px]" // Increased opacity to /40
        style={{ y: bgY2, scale: scrollScale2 }}
      />
      <motion.div
        className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-status-info/30 rounded-full blur-[80px]" // Increased opacity to /30
        style={{ y: bgY3, scale: scrollScale3 }}
      />
      {/* New Circle 4 */}
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-purple-primary/35 rounded-full blur-[90px]" // Increased opacity to /35
        style={{ y: bgY4, scale: scrollScale4 }}
      />
      {/* New Circle 5 */}
      <motion.div
        className="absolute top-[5%] right-[5%] w-[250px] h-[250px] bg-status-info/35 rounded-full blur-[70px]" // Increased opacity to /35
        style={{ y: bgY5, scale: scrollScale5 }}
      />
    </div>
  );
};

export default BackgroundAnimation;
