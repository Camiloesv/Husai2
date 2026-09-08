import React from 'react';
import { Instagram } from 'lucide-react';
import Wordmark from '../Wordmark';
import { getWhatsAppUrl } from '../../lib/whatsapp';
import { getExperienceCopy } from '../../content/experience';
import { useTranslation } from 'react-i18next';

// TikTok and WhatsApp don't ship in lucide-react — render small inline SVGs.
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.51a8.16 8.16 0 0 0 4.77 1.52V6.58a4.85 4.85 0 0 1-1.84.11Z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M20.5 3.5A11.4 11.4 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95a11.9 11.9 0 0 0 1.6 5.96L0 24l6.27-1.64a11.94 11.94 0 0 0 5.78 1.47h.01c6.59 0 11.95-5.36 11.95-11.95a11.4 11.4 0 0 0-3.51-8.38ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.72.97 1-3.62-.24-.37a9.85 9.85 0 0 1-1.51-5.23c0-5.46 4.45-9.91 9.91-9.91 2.65 0 5.13 1.03 7 2.9a9.86 9.86 0 0 1 2.9 7c-.01 5.46-4.45 9.86-9.92 9.86Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const copy = getExperienceCopy(i18n.language);
  const year = new Date().getFullYear();

  const links = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/husai_co',
      Icon: Instagram,
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@husai_co',
      Icon: TikTokIcon,
    },
    {
      label: 'WhatsApp',
      href: getWhatsAppUrl(i18n.language),
      Icon: WhatsAppIcon,
    },

  ];

  return (
    <footer className="border-t border-dark-border/50 mt-16 pt-10 pb-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Wordmark className="footer-wordmark" />
          <p className="text-text-tertiary text-xs mt-1">{copy.footer}</p>
        </div>

        <div className="flex items-center gap-2">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className={`${label === 'WhatsApp' ? 'contact-link' : ''} w-10 h-10 flex items-center justify-center rounded-full border border-dark-border/40 text-text-tertiary hover:text-purple-hover hover:border-purple-primary/60 hover:bg-purple-primary/10 transition-all`}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <div className="text-text-tertiary text-xs text-center md:text-right">
          © {year} HUSAI. {copy.rights}
          <br />
          <a
            href={getWhatsAppUrl(i18n.language)} target="_blank" rel="noopener noreferrer"
            className="contact-link transition-colors"
          >
            +57 321 268 6430
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
