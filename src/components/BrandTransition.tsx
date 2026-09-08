import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { useMotionPaused } from '../hooks/useMotionPaused';

export default function BrandTransition() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);
  const navigated = useRef(false);
  const [active, setActive] = useState(true);
  const [duration, setDuration] = useState(800);
  const reduced = useReducedMotion();
  const { paused } = useMotionPaused();
  useLayoutEffect(() => {
    if (previous.current !== pathname) navigated.current = true;
    previous.current = pathname;
    const ms = navigated.current ? 450 : 800;
    setDuration(ms); setActive(true);
    const timer = window.setTimeout(() => setActive(false), ms);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  if (!active) return null;
  return <div key={pathname} className="brand-transition" data-static={Boolean(reduced || paused)} data-route={pathname} style={{ animationDuration: `${duration}ms` }} aria-hidden="true">
    <div className="brand-transition-mark"><div className="brand-rings"><i /><i /><i /></div><img src="/husai_logo_svg.svg" width="72" height="72" alt="" /></div>
  </div>;
}
