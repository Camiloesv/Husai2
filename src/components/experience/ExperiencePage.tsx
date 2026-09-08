import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ArrowRight, Pause, Play, Workflow, Bot, BarChart3, Fingerprint, Check, Plus, Sparkles } from 'lucide-react';
import { getExperienceCopy, type ExperienceCopy } from '../../content/experience';
import { ExperienceMotion, usePageVisible, useExperienceMotion } from '../../lib/experienceMotion';
import { getWhatsAppUrl } from '../../lib/whatsapp';
import { useMotionPaused } from '../../hooks/useMotionPaused';
import { useLocation } from 'react-router-dom';
import Glass from './Glass';
import '../../styles/experience.css';
const SpatialScene = lazy(() => import('./SpatialScene'));
const Laboratory = lazy(() => import('./Laboratory'));
const PaybackCalculator = lazy(() => import('./PaybackCalculator'));

function Deferred({ children }: { children: ReactNode }) {
  return <div className="deferred-content"><Suspense fallback={<div className="component-placeholder" aria-busy="true" />}>{children}</Suspense></div>;
}
function Method({ copy }: { copy: ExperienceCopy }) {
  const [step, setStep] = useState(0);
  const methodRef = useRef<HTMLElement>(null);
  const enabled = useExperienceMotion();
  const { scrollYProgress } = useScroll({ target: methodRef, offset: ['start end', 'end start'] });
  const mapRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const mapScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.04]);
  const stepsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nodes = stepsRef.current?.querySelectorAll<HTMLElement>('[data-step]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setStep(Number((entry.target as HTMLElement).dataset.step)); });
    }, { rootMargin: '-30% 0px -40% 0px', threshold: 0 });
    nodes?.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <section ref={methodRef} id="metodo" className="experience-section method-section">
    <div className="method-sticky"><span className="eyebrow">{copy.methodLabel}</span><h2>{copy.methodTitle}</h2><p className="section-intro">{copy.methodIntro}</p>
      <motion.div className="method-map" style={enabled ? { rotate: mapRotate, scale: mapScale } : undefined} aria-hidden="true"><div className="method-map-lines" />{copy.steps.map((item, i) => <div key={item[0]} className={`method-node node-${i} ${step >= i ? 'lit' : ''}`}><span>0{i + 1}</span>{item[0]}</div>)}<div className="method-hub"><img src="/husai_logo_svg.svg" alt="" /></div></motion.div>
      <div className="method-progress" aria-hidden="true">{copy.steps.map((item, i) => <i key={item[0]} className={i <= step ? 'filled' : ''} />)}</div>
    </div>
    <div className="method-steps" ref={stepsRef}>{copy.steps.map((item, i) => <article key={item[0]} data-step={i} className={step === i ? 'current' : ''}><span className="step-number">0{i + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p><span className="step-deliverable"><ArrowUpRight size={15} />{item[2]}</span></article>)}</div>
  </section>;
}
export default function ExperiencePage() {
  const { i18n } = useTranslation();
  const copy = getExperienceCopy(i18n.language);
  const reduced = useReducedMotion();
  const { paused, toggle } = useMotionPaused();
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  const visible = usePageVisible();
  const enabled = !paused && !reduced && visible;
  const icons = [Workflow, Bot, BarChart3, Fingerprint];

  return <ExperienceMotion.Provider value={enabled}><MotionConfig reducedMotion={enabled ? 'user' : 'always'} transition={{ duration: enabled ? 0.7 : 0 }}>
    <Helmet><title>{copy.metaTitle}</title><meta name="description" content={copy.intro} /><meta property="og:title" content={copy.metaTitle} /><meta property="og:description" content={copy.intro} /><meta property="og:url" content="https://www.husai.com.co/" /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary" /><meta name="twitter:title" content={copy.metaTitle} /><meta name="twitter:description" content={copy.intro} /></Helmet>
    <div className="experience" data-motion={enabled ? 'on' : 'off'}>
      <div className="experience-backdrop" aria-hidden="true"><Suspense fallback={null}><SpatialScene /></Suspense></div>
      <section className="experience-hero" id="inicio"><div className="hero-ambient" />
        <div className="hero-copy"><motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><span className="eyebrow"><span className="eyebrow-line" />{copy.eyebrow}</span></motion.div>
          <motion.h1 initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: enabled ? 0.9 : 0, delay: enabled ? 0.1 : 0 }}>{copy.title}<br /><em>{copy.accent}</em></motion.h1>
          <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: enabled ? 0.8 : 0, delay: enabled ? 0.25 : 0 }}><p className="hero-description">{copy.intro}</p><div className="hero-actions"><a className="button-primary contact-cta" href={getWhatsAppUrl(i18n.language)} target="_blank" rel="noopener noreferrer">{copy.cta}<ArrowUpRight size={18} /></a><a className="text-link" href="#laboratorio">{copy.explore}<ArrowRight size={16} /></a></div><p className="hero-note">{copy.note}</p></motion.div>
        </div>
        <div className="hero-bottom"><a href="#capacidades"><ArrowDown size={15} />{copy.scroll}</a><span>INTELLIGENCE IN MOTION</span></div>
      </section>
      <div className="technology-strip"><span>{copy.tech}</span><div>{['OpenAI', 'Anthropic', 'Gemini', 'Mistral', 'Meta'].map(name => <span key={name}>{name}</span>)}</div></div>
      <section id="capacidades" className="experience-section"><div className="section-heading"><div><span className="eyebrow">{copy.capabilitiesLabel}</span><h2>{copy.capabilitiesTitle}</h2></div><p className="section-intro">{copy.capabilitiesIntro}</p></div>
        <div className="capability-grid">{copy.capabilities.map((item, i) => { const Icon = icons[i]; return <Glass key={item[0]} className="capability-card"><div className="capability-top"><Icon size={27} strokeWidth={1.3} /><span>0{i + 1}</span></div><h3>{item[0]}</h3><h4>{item[1]}</h4><p>{item[2]}</p><a className="card-arrow" href="#laboratorio" aria-label={`${copy.explore}: ${item[0]}`}><ArrowUpRight size={21} /></a></Glass>; })}</div>
      </section>
      <Method copy={copy} />
      <section id="laboratorio" className="experience-section lab-section"><div className="section-heading"><div><span className="eyebrow">{copy.labLabel}</span><h2>{copy.labTitle}</h2></div><p className="section-intro">{copy.labIntro}</p></div><Deferred><Laboratory copy={copy} /></Deferred></section>
      <section id="resultados" className="experience-section"><div className="section-heading"><div><span className="eyebrow">{copy.resultsLabel}</span><h2>{copy.resultsTitle}</h2></div><p className="section-intro">{copy.resultsIntro}</p></div>
        <div className="impact-grid">{copy.cases.map((name, i) => <Glass key={name} className="impact-card"><div className="impact-header"><span>{name}</span><ArrowUpRight size={22} /></div><div className="impact-amount"><small>USD</small><strong>{new Intl.NumberFormat(i18n.language).format(i === 0 ? 20000 : 5500)}</strong><span>{copy.monthly}</span></div><p>{copy.caseDescriptions[i]}</p><div className="impact-chart" aria-hidden="true">{[18, 27, 22, 38, 30, 49, 44, 61, 56, 75, 68, 90, 84, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></Glass>)}</div><p className="fine-print metric-note">{copy.metricNote}</p>
        <Deferred><PaybackCalculator copy={copy} language={i18n.language} /></Deferred>
      </section>
      <section id="planes" className="experience-section"><span className="eyebrow">{copy.plansLabel}</span><h2 className="plans-heading">{copy.plansTitle}</h2><div className="plans-grid">{copy.plans.map((plan, i) => <Glass key={plan[0]} className={`plan-card ${i === 1 ? 'plan-featured' : ''}`}><div className="plan-kicker">{i === 1 ? <><Sparkles size={13} />{copy.recommended}</> : `0${i + 1} / HUSAI`}</div><h3>{plan[0]}</h3><p>{plan[1]}</p><div className="plan-price">{i < 2 ? <><small>{copy.from}</small><strong>USD {new Intl.NumberFormat(i18n.language).format(i === 0 ? 2500 : 7000)}</strong></> : <strong>{copy.consult}</strong>}</div><span className="plan-duration">{plan[2]}</span><ul>{plan.slice(3).map(item => <li key={item}><Check size={16} />{item}</li>)}</ul><a className="button-primary contact-cta" href={getWhatsAppUrl(i18n.language, { kind: 'plan', name: plan[0] })} target="_blank" rel="noopener noreferrer">{i === 2 ? copy.consult : copy.cta}<ArrowUpRight size={16} /></a></Glass>)}</div><p className="fine-print">{copy.planNote}</p></section>
      <section className="experience-section faq-section"><div><span className="eyebrow">FAQ /</span><h2>{copy.faqTitle}</h2></div><div>{copy.faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} /></summary><p>{answer}</p></details>)}</div></section>
      <section id="contacto" className="experience-section contact-section"><span className="eyebrow">{copy.contactLabel}</span><h2>{copy.contactTitle}</h2><p>{copy.contactBody}</p><div className="contact-actions"><a className="button-primary contact-cta" href={getWhatsAppUrl(i18n.language)} target="_blank" rel="noopener noreferrer">{copy.cta}<ArrowUpRight size={18} /></a></div><a className="contact-number" href={getWhatsAppUrl(i18n.language)} target="_blank" rel="noopener noreferrer">+57 321 268 6430</a></section>
      {!reduced && <button className="motion-control" onClick={toggle} aria-label={paused ? copy.resume : copy.pause} aria-pressed={paused}>{paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? copy.resume : copy.pause}</span></button>}
    </div>
  </MotionConfig></ExperienceMotion.Provider>;
}
