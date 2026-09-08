import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useExperienceMotion } from '../../lib/experienceMotion';

export default function Glass({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useExperienceMotion();
  const inView = useInView(ref, { margin: '100px' });
  return <motion.div ref={ref} className={`liquid-panel ${className}`} data-active={enabled && inView}
    initial={enabled ? { opacity: 0, y: 28 } : false}
    animate={!enabled ? { opacity: 1, y: 0 } : undefined}
    whileInView={enabled ? { opacity: 1, y: 0 } : undefined}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: enabled ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
    onPointerMove={e => {
      if (!enabled || e.pointerType !== 'mouse') return;
      const box = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--light-x', `${e.clientX - box.left}px`);
      e.currentTarget.style.setProperty('--light-y', `${e.clientY - box.top}px`);
    }}>
    {children}
  </motion.div>;
}
