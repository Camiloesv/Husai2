import React from 'react';
import { TFunction } from 'i18next';
// Removed motion import

interface HeroSectionProps {
  t: TFunction;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => {
  return (
    <section className="relative flex flex-col items-center text-center mb-32 pt-32 overflow-hidden h-screen">
      {/* Hero Content */}
      {/* Reverted back to standard h1 */}
      <h1
        className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight"
      >
        {t('hero.title1')}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-primary to-purple-secondary">
          {t('hero.title2')}
        </span>
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl mb-12">
        {t('hero.description')}
      </p>
      <div className="flex gap-4">
        <button className="glass-button">
          {t('button.scheduleDemo')}
        </button>
        <button className="glass-button bg-dark-card hover:bg-dark-modal">
          {t('button.viewCases')}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
