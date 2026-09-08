import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Guarantee: React.FC = () => {
  const { t } = useTranslation();
  const main = t('guarantee_main');
  const accent = t('guarantee_main_accent');
  const parts = main.split(accent);

  return (
    <section id="garantia" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border-y-2 border-purple-secondary/50 bg-dark-card/30 backdrop-blur-md py-12 px-8 md:px-16 flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-purple-primary to-purple-secondary flex items-center justify-center shadow-[0_0_40px_rgba(156,39,176,0.4)]"
          >
            <ShieldCheck className="w-10 h-10 text-white" strokeWidth={1.5} />
          </motion.div>

          <div className="text-center md:text-left">
            <p className="text-xs tracking-[0.3em] uppercase text-purple-hover mb-3">
              {t('guarantee_eyebrow')}
            </p>
            <p className="font-display text-2xl md:text-3xl leading-snug text-text-primary">
              {parts[0]}
              <span className="text-gradient-purple">{accent}</span>
              {parts[1]}
            </p>
            <p className="mt-4 text-text-tertiary text-sm">{t('guarantee_secondary')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
