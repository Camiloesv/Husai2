import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Accordion from '../ui/Accordion';

const FAQ: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    { question: t('faq_q1'), answer: t('faq_a1') },
    { question: t('faq_q2'), answer: t('faq_a2') },
    { question: t('faq_q3'), answer: t('faq_a3') },
    { question: t('faq_q4'), answer: t('faq_a4') },
  ];

  return (
    <section id="faq" className="relative py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-purple-hover mb-4">
            {t('faq_eyebrow')}
          </p>
          <h2 className="font-display font-semibold text-4xl md:text-5xl leading-tight text-text-primary">
            {t('faq_title_a')}{' '}
            <span className="text-gradient-purple">{t('faq_title_b')}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Accordion items={items} defaultOpenIndex={0} />
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
