import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { getExperienceCopy } from '../content/experience';
export default function WhatsAppContact() {
  const { i18n } = useTranslation();
  return <a className="chat-fab whatsapp-fab" href={getWhatsAppUrl(i18n.language)} target="_blank" rel="noopener noreferrer" aria-label={getExperienceCopy(i18n.language).whatsapp}><MessageCircle size={22} /></a>;
}
