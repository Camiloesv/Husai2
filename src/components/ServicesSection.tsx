import React from 'react';
import { TFunction } from 'i18next';
import { motion } from 'framer-motion';
import { Brain, Database, LineChart, ChevronRight } from 'lucide-react';

interface ServicesSectionProps {
  t: TFunction;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ t }) => {
  // Variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="mb-32">
      <motion.h2
        className="text-3xl font-bold text-text-primary text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }} // Trigger when 50% is visible, only once
        transition={{ duration: 0.5 }}
      >
        {t('services.title')}
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
      >
        <motion.div className="glass-card p-8" variants={itemVariants}>
          <Brain className="w-12 h-12 text-purple-primary mb-6" />
          <h3 className="text-xl font-bold text-text-primary mb-4">{t('services.ai.title')}</h3>
          <p className="text-text-secondary mb-6">{t('services.ai.description')}</p>
          <button className="text-purple-primary hover:text-purple-hover transition-colors flex items-center gap-2">
            {t('button.learnMore')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
        <motion.div className="glass-card p-8" variants={itemVariants}>
          <Database className="w-12 h-12 text-status-info mb-6" />
          <h3 className="text-xl font-bold text-text-primary mb-4">{t('services.data.title')}</h3>
          <p className="text-text-secondary mb-6">{t('services.data.description')}</p>
          <button className="text-status-info hover:text-status-info/90 transition-colors flex items-center gap-2">
            {t('button.learnMore')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
        <motion.div className="glass-card p-8" variants={itemVariants}>
          <LineChart className="w-12 h-12 text-status-success mb-6" />
          <h3 className="text-xl font-bold text-text-primary mb-4">{t('services.predictive.title')}</h3>
          <p className="text-text-secondary mb-6">{t('services.predictive.description')}</p>
          <button className="text-status-success hover:text-status-success/90 transition-colors flex items-center gap-2">
            {t('button.learnMore')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
