import { useReducedMotion as fmUseReducedMotion } from 'framer-motion';

export const useReducedMotion = (): boolean => {
  const prefers = fmUseReducedMotion();
  return Boolean(prefers);
};

export default useReducedMotion;
