import { getWhatsAppUrl } from './whatsapp';
/** Compatibility for older sections; every commercial contact now uses WhatsApp. */
export const DIAGNOSTIC_FALLBACK_URL = getWhatsAppUrl('es');
export const openDiagnostico = (): void => {
  if (typeof window !== 'undefined') window.open(getWhatsAppUrl('es'), '_blank', 'noopener,noreferrer');
};
