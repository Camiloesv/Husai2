import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const Problem: React.FC = () => {
  const { t } = useTranslation();

  const problems = [
    { n: '01', title: t('problem_1_title'), body: t('problem_1_body') },
    { n: '02', title: t('problem_2_title'), body: t('problem_2_body') },
    { n: '03', title: t('problem_3_title'), body: t('problem_3_body') },
  ];

  return (
    <section id="problema" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-purple-hover mb-4">
            {t('problem_eyebrow')}
          </p>
          <h2 className="font-display font-semibold text-4xl md:text-5xl leading-tight text-text-primary">
            {t('problem_title_a')}{' '}
            <span className="text-gradient-purple">{t('problem_title_b')}</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">{t('problem_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.article
              key={p.n}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              className="relative overflow-hidden rounded-3xl border border-dark-border/50 bg-dark-card/30 backdrop-blur-md p-7 md:p-8 group"
            >
              <span
                className="absolute -top-4 -right-2 font-display text-[8rem] leading-none text-purple-primary/10 select-none transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:text-purple-primary/20"
                aria-hidden
              >
                {p.n}
              </span>
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 leading-snug">
                  {p.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">{p.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
