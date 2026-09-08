import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { useExperienceMotion } from '../../lib/experienceMotion';
const ParticleField = lazy(() => import('./ParticleField'));
export default function SpatialScene() {
  const pointer = useRef({ x: 0, y: 0, active: false });
  const [failed, setFailed] = useState(false);
  const fail = useCallback(() => setFailed(true), []);
  const enabled = useExperienceMotion();
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.current = { x: (event.clientX / window.innerWidth) * 2 - 1, y: 1 - (event.clientY / window.innerHeight) * 2, active: true };
    };
    const leave = () => { pointer.current.active = false; };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);
  return <div className="particle-backdrop" data-active={enabled}>
    {!failed && <Suspense fallback={null}><ParticleField enabled={enabled} pointer={pointer} progress={scrollYProgress} onFailure={fail} /></Suspense>}
  </div>;
}
