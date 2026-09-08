import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import AICompanies from './AICompanies';

const AIPartners: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 px-4 border-y border-dark-border/30">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6 }}
          className="text-center text-[11px] md:text-xs tracking-[0.3em] uppercase text-text-tertiary mb-8"
        >
          {t('partners_title')}
        </motion.p>
        <div className="mask-fade-x">
          <AICompanies />
        </div>
      </div>
    </section>
  );
};

export default AIPartners;
