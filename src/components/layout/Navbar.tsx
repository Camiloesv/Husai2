import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { getExperienceCopy } from '../../content/experience';
import { getWhatsAppUrl } from '../../lib/whatsapp';
import Wordmark from '../Wordmark';
export default function Navbar() {
  const { i18n } = useTranslation();
  const copy = getExperienceCopy(i18n.language);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { document.documentElement.lang = i18n.resolvedLanguage || 'es'; }, [i18n.resolvedLanguage]);
  useEffect(() => {
    if (!location.hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [location]);
  const ids = ['capacidades', 'metodo', 'laboratorio', 'resultados', 'planes'];
  return <><a className="skip-link" href="#main-content">{i18n.language.startsWith('es') ? 'Saltar al contenido' : i18n.language.startsWith('fr') ? 'Aller au contenu' : 'Skip to content'}</a><header className="site-header"><nav className="site-nav" aria-label={copy.menu} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); document.getElementById('menu-toggle')?.focus(); } }}>
    <Link className="brand-logo" to="/" onClick={() => setOpen(false)} aria-label="HusAI"><img src="/husai_logo_svg.svg" alt="" width="30" height="30" /><Wordmark /></Link>
    <div id="site-links" className={`site-links ${open ? 'is-open' : ''}`}>{copy.nav.map((label, i) => <Link key={ids[i]} to={`/#${ids[i]}`} onClick={() => setOpen(false)}>{label}</Link>)}<Link to="/blog" onClick={() => setOpen(false)}>Blog</Link></div>
    <div className="nav-actions"><select aria-label={copy.language} value={i18n.resolvedLanguage?.slice(0, 2) || 'es'} onChange={e => { void i18n.changeLanguage(e.target.value); }}><option value="es">ES</option><option value="en">EN</option><option value="fr">FR</option></select><a className="nav-cta contact-cta" href={getWhatsAppUrl(i18n.language)} target="_blank" rel="noopener noreferrer">{copy.cta}<ArrowUpRight size={15} /></a><button id="menu-toggle" className="mobile-toggle" aria-label={copy.menu} aria-expanded={open} aria-controls="site-links" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </nav></header></>;
}
