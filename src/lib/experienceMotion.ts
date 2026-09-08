import { createContext, useContext, useEffect, useState } from 'react';
export const ExperienceMotion = createContext(true);
export const useExperienceMotion = () => useContext(ExperienceMotion);
export function usePageVisible() {
  const [visible, setVisible] = useState(!document.hidden);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return visible;
}
