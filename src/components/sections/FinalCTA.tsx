import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { openDiagnostico } from '../../lib/openDiagnostico';

const FinalCTA: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact-final" className="relative py-32 px-4 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(156, 39, 176, 0.25), transparent 60%)',
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-display font-semibold text-4xl md:text-6xl leading-tight text-text-primary">
          {t('final_cta_title_a')}{' '}
          <span className="text-gradient-purple">{t('final_cta_title_b')}</span>
        </h2>
        <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto">
          {t('final_cta_subtitle')}
        </p>

        <motion.button
          type="button"
          onClick={openDiagnostico}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative mt-10 inline-flex items-center gap-3 px-9 py-5 rounded-full bg-purple-primary text-white text-lg font-medium shadow-[0_10px_40px_rgba(156,39,176,0.45)] hover:bg-purple-hover transition-colors overflow-hidden"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 shimmer-bg" />
          <span className="relative">{t('final_cta_button')}</span>
          <ArrowRight className="relative w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>

        <p className="mt-6 text-xs text-text-tertiary tracking-wide">
          {t('final_cta_email')}{' '}
          <a
            href="mailto:gerencia@husai.com.co"
            className="text-text-secondary hover:text-purple-hover transition-colors"
          >
            gerencia@husai.com.co
          </a>
        </p>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
