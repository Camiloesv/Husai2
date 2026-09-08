import React from 'react';
import { motion } from 'framer-motion';
import { Search, Settings2, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Solution: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: Search, title: t('solution_step_1_title'), body: t('solution_step_1_body') },
    { icon: Settings2, title: t('solution_step_2_title'), body: t('solution_step_2_body') },
    { icon: Users, title: t('solution_step_3_title'), body: t('solution_step_3_body') },
  ];

  return (
    <section id="solucion" className="relative py-32 px-4 bg-dark-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-purple-hover mb-4">
            {t('solution_eyebrow')}
          </p>
          <h2 className="font-display font-semibold text-4xl md:text-5xl leading-tight text-text-primary">
            {t('solution_title_a')}{' '}
            <span className="text-gradient-purple">{t('solution_title_b')}</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg">{t('solution_subtitle')}</p>
        </motion.div>

        <div className="relative">
          <svg
            className="hidden md:block absolute left-0 right-0 top-12 mx-auto"
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
            width="100%"
            height="4"
          >
            <motion.line
              x1="60"
              y1="2"
              x2="940"
              y2="2"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9C27B0" stopOpacity="0" />
                <stop offset="50%" stopColor="#AB47BC" stopOpacity="1" />
                <stop offset="100%" stopColor="#4A148C" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center px-2"
                >
                  <div className="relative mx-auto mb-6 w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-purple-secondary shadow-[0_0_40px_rgba(156,39,176,0.35)]">
                    <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-dark-background border border-purple-primary/60 text-xs flex items-center justify-center text-purple-hover font-semibold">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed max-w-xs mx-auto">
                    {step.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
