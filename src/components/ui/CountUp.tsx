import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const CountUp: React.FC<CountUpProps> = ({ end, duration = 1600, className = '' }) => {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const startedRef = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    if (reduced) {
      setValue(end);
      return;
    }

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(end * easeOutCubic(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
};

export default CountUp;
