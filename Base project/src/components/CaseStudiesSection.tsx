import React from 'react';
import { TFunction } from 'i18next';
import { Award, ChevronRight } from 'lucide-react';
// Import motion if you want to add animations later
// import { motion } from 'framer-motion'; 

interface CaseStudiesSectionProps {
  t: TFunction;
}

const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ t }) => {
  // Add animation variants here if needed later
  // const containerVariants = { ... };
  // const itemVariants = { ... };

  return (
    <section id="cases" className="mb-32">
      {/* Add motion.h2 here if animating title */}
      <h2 className="text-3xl font-bold text-text-primary text-center mb-16">
        {t('cases.title')}
      </h2>
      {/* Add motion.div wrapper here if animating cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add motion.div wrapper here if animating card */}
        <div className="glass-card p-8">
          <div className="flex items-start gap-4 mb-6">
            <Award className="w-8 h-8 text-purple-primary flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-2">{t('cases.globalTech.title')}</h3>
              <p className="text-text-secondary">{t('cases.globalTech.description')}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-tertiary">{t('cases.globalTech.category')}</span>
            <button className="text-purple-primary hover:text-purple-hover transition-colors flex items-center gap-2">
              {t('button.readCase')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Add motion.div wrapper here if animating card */}
        <div className="glass-card p-8">
          <div className="flex items-start gap-4 mb-6">
            <Award className="w-8 h-8 text-status-info flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-2">{t('cases.healthcare.title')}</h3>
              <p className="text-text-secondary">{t('cases.healthcare.description')}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-tertiary">{t('cases.healthcare.category')}</span>
            <button className="text-status-info hover:text-status-info/90 transition-colors flex items-center gap-2">
              {t('button.readCase')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
