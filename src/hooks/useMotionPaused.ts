import { useEffect, useState } from 'react';
function readPaused() { try { return localStorage.getItem('husai-motion') === 'paused'; } catch { return false; } }
export function useMotionPaused() {
  const [paused, setPaused] = useState(readPaused);
  useEffect(() => {
    const sync = () => setPaused(readPaused());
    window.addEventListener('husai:motion', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('husai:motion', sync); window.removeEventListener('storage', sync); };
  }, []);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try { localStorage.setItem('husai-motion', next ? 'paused' : 'on'); } catch { /* In-memory preference still works. */ }
    window.dispatchEvent(new Event('husai:motion'));
  };
  return { paused, toggle };
}
