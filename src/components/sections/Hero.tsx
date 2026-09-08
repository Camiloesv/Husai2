import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GlowingText from '../animations/GlowingText';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { openDiagnostico } from '../../lib/openDiagnostico';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const wordVariant = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUp = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const planetY = useTransform(scrollY, [0, 600], [0, 80]);
  const planetScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  const renderWords = (text: string, accent = false) =>
    text.split(' ').map((word, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden align-baseline mr-[0.25em]">
        <motion.span
          variants={reduced ? fadeUp : wordVariant}
          className={`inline-block ${accent ? 'text-gradient-purple' : ''}`}
        >
          {word}
        </motion.span>
      </span>
    ));

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-radial-purple pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-purple-primary/30 bg-purple-primary/10 text-purple-hover text-xs tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-primary animate-soft-pulse" />
            {t('hero_eyebrow')}
          </motion.div>

          <h1 className="font-display font-semibold leading-[1.02] tracking-tight text-text-primary text-[clamp(2.75rem,7vw,5.75rem)]">
            <motion.span className="block" variants={containerVariants}>
              {renderWords(t('hero_title_1'))}
            </motion.span>
            <motion.span className="block mt-2" variants={containerVariants}>
              {renderWords(t('hero_title_2'), true)}
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base md:text-lg text-text-secondary leading-relaxed"
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={openDiagnostico}
              className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-full bg-purple-primary text-white font-medium shadow-[0_8px_30px_rgba(156,39,176,0.35)] hover:bg-purple-hover transition-colors overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 shimmer-bg" />
              <span className="relative">{t('hero_button_primary')}</span>
              <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#prueba-social"
              className="inline-flex items-center gap-2 px-2 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {t('hero_button_secondary')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <GlowingText
              text={t('hero_tagline')}
              className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-purple-hover/80 font-display"
            />
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 text-xs text-text-tertiary">
            {t('hero_disclaimer')}
          </motion.p>
        </motion.div>

        <motion.div
          className="lg:col-span-5 relative aspect-square w-full max-w-[520px] mx-auto"
          style={reduced ? undefined : { y: planetY, scale: planetScale }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-60 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(156,39,176,0.55) 0%, rgba(74,20,140,0.25) 40%, transparent 70%)',
            }}
            aria-hidden
          />

          {!reduced && (
            <>
              <motion.div
                className="absolute inset-[-10%] rounded-full border border-purple-primary/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-[2%] rounded-full border border-dashed border-purple-primary/25"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-[14%] rounded-full border border-purple-hover/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
              />
            </>
          )}

          <div className="absolute inset-[20%] rounded-full overflow-hidden ring-1 ring-purple-primary/30 shadow-[0_0_80px_rgba(156,39,176,0.4)]">
            <img
              src="/planet_image.avif"
              alt=""
              aria-hidden
              className="w-full h-full object-cover scale-110"
            />
          </div>

          {!reduced && (
            <motion.div
              className="absolute inset-[-10%]"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-hover shadow-[0_0_20px_rgba(171,71,188,0.9)]" />
            </motion.div>
          )}
          {!reduced && (
            <motion.div
              className="absolute inset-[2%]"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-primary shadow-[0_0_14px_rgba(156,39,176,0.9)]" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
