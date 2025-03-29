import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import CircularPath from '../animations/CircularPath';
import GlowingText from '../animations/GlowingText';

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center text-center mb-32 pt-32 overflow-hidden">
      {/* Circular Path Animation */}
      <CircularPath />
      
      {/* Content */}
      <div className="relative z-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <GlowingText text="Transforming Data into" />
          <GlowingText 
            text="Intelligence"
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-primary to-purple-secondary"
          />
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mb-12">
          Harness the power of artificial intelligence and advanced analytics to unlock unprecedented insights and drive innovation in your business.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary">
            Schedule Demo
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="secondary">
            View Case Studies
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;