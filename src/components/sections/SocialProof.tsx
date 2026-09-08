import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CountUp from '../ui/CountUp';

const clients = ['Sandalo Importaciones', 'Nosso Galeón', 'Mapos Holding Group', 'Babuchis'];

const SocialProof: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="prueba-social" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-center text-xs tracking-[0.3em] uppercase text-text-tertiary mb-6">
            {t('social_proof_label')}
          </p>
          <div className="mask-fade-x overflow-hidden">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 px-6">
              {clients.map((c) => (
                <span
                  key={c}
                  className="font-display text-lg md:text-xl text-text-tertiary hover:text-text-primary transition-colors duration-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-purple-primary/30 bg-gradient-to-br from-purple-secondary/20 via-dark-card/40 to-dark-card/20 backdrop-blur-md p-10 md:p-16 overflow-hidden"
        >
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-purple-primary/20 blur-3xl pointer-events-none"
            aria-hidden
          />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-purple-hover mb-4">
                {t('social_proof_case_label')}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="font-display font-bold text-text-primary text-[clamp(5rem,14vw,11rem)] leading-none text-gradient-purple">
                  <CountUp end={40} />
                </span>
                <span className="font-display text-3xl md:text-4xl text-text-secondary">
                  {t('social_proof_unit')}
                </span>
              </div>
              <p className="mt-3 text-text-secondary text-lg">{t('social_proof_caption')}</p>
            </div>
            <div className="md:pl-8 md:border-l md:border-purple-primary/20">
              <blockquote className="text-text-secondary italic leading-relaxed text-lg">
                “{t('social_proof_quote')}”
              </blockquote>
              <p className="mt-4 text-sm text-text-tertiary">{t('social_proof_attribution')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
