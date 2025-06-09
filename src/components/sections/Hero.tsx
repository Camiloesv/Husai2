import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import CircularPath from '../animations/CircularPath';
import GlowingText from '../animations/GlowingText';
import AICompanies from './AICompanies';
import { useText } from '../../hooks/useText'; // Asegúrate de que esta ruta sea correcta

const Hero: React.FC = () => {
  const { hero } = useText();

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 pt-36 pb-40 min-h-screen overflow-visible">
      {/* Background Animation */}
      <CircularPath />

      {/* Content */}
      <div className="relative z-20 max-w-5xl w-full">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-snug">
          <GlowingText text={hero.title1} />
          <GlowingText
            text={hero.title2}
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-primary to-purple-secondary"
          />
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
          {hero.subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a href="https://tally.so/r/nGbbvQ" target="_blank" rel="noopener noreferrer">
            <Button variant="primary">
              {hero.buttonPrimary}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </a>

          <a href="/blog">
            <Button variant="secondary">
              {hero.buttonSecondary}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </a>
        </div>

        {/* AI Companies Section */}
        <div className="mt-6">
          <p className="text-xs md:text-lg text-gray-500 mb-4 font-medium tracking-wide">
            {hero.aiPartners}
            <AICompanies />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
