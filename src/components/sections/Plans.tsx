import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { openDiagnostico } from '../../lib/openDiagnostico';

const order = [0, 2, 1];

const Plans: React.FC = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('plans_1_name'),
      tagline: t('plans_1_tagline'),
      price: t('plans_1_price'),
      priceDetail: t('plans_1_price_detail'),
      duration: t('plans_1_duration'),
      bullets: [t('plans_1_b1'), t('plans_1_b2'), t('plans_1_b3'), t('plans_1_b4')],
      highlight: false,
    },
    {
      name: t('plans_2_name'),
      tagline: t('plans_2_tagline'),
      price: t('plans_2_price'),
      priceDetail: t('plans_2_price_detail'),
      duration: t('plans_2_duration'),
      bullets: [t('plans_2_b1'), t('plans_2_b2'), t('plans_2_b3'), t('plans_2_b4')],
      highlight: true,
    },
    {
      name: t('plans_3_name'),
      tagline: t('plans_3_tagline'),
      price: t('plans_3_price'),
      priceDetail: t('plans_3_price_detail'),
      duration: t('plans_3_duration'),
      bullets: [t('plans_3_b1'), t('plans_3_b2'), t('plans_3_b3'), t('plans_3_b4')],
      highlight: false,
    },
  ];

  return (
    <section id="planes" className="relative py-32 px-4 bg-dark-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-purple-hover mb-4">
            {t('plans_eyebrow')}
          </p>
          <h2 className="font-display font-semibold text-4xl md:text-5xl leading-tight text-text-primary">
            {t('plans_title_a')}{' '}
            <span className="text-gradient-purple">{t('plans_title_b')}</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg">{t('plans_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => {
            const animOrder = order.indexOf(i);
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 50, scale: plan.highlight ? 0.96 : 1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.8, delay: animOrder * 0.18, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  plan.highlight
                    ? 'gradient-border-purple md:-mt-4 md:mb-0 shadow-[0_20px_60px_-20px_rgba(156,39,176,0.45)]'
                    : 'border border-dark-border/50 bg-dark-card/30 backdrop-blur-md'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-primary text-white text-xs font-semibold tracking-wide shadow-lg whitespace-nowrap">
                    {t('plans_popular_badge')}
                  </span>
                )}

                <header className="mb-6">
                  <h3 className="font-display text-2xl font-semibold text-text-primary">
                    {plan.name}
                  </h3>
                  <p className="text-text-tertiary text-sm mt-1">{plan.tagline}</p>
                </header>

                <div className="mb-6">
                  <p className="font-display text-3xl md:text-4xl text-text-primary">
                    {plan.price}
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">{plan.priceDetail}</p>
                  <p className="text-xs text-purple-hover mt-2 tracking-wide uppercase">
                    {plan.duration}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-text-secondary text-sm">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-purple-hover" strokeWidth={2.5} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={openDiagnostico}
                  className={`group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium transition-colors ${
                    plan.highlight
                      ? 'bg-purple-primary text-white hover:bg-purple-hover'
                      : 'bg-dark-modal/60 text-text-primary hover:bg-dark-modal'
                  }`}
                >
                  {t('plans_cta')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.article>
            );
          })}
        </div>

        <p className="text-center text-xs text-text-tertiary mt-10">{t('plans_disclaimer')}</p>
      </div>
    </section>
  );
};

export default Plans;
