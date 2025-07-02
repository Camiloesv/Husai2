import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo';
import CustomSelect from '../sections/CustomSelect';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleNavClick = (hash: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${hash}`);
    } else {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className={`floating-nav ${isScrolled ? 'bg-dark-card/50' : 'bg-dark-card/30'}`}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3">
            <Logo className="text-purple-primary w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-text-primary text-2xl font-normal">Husai</span>
              <span className="text-blue-primary text-xs tracking-wider font-italic">Intelligence in motion</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          <div className="flex space-x-8">
            <button className="nav-link" onClick={() => handleNavClick('services')}>
              {t('nav_services')}
            </button>
            <button className="nav-link" onClick={() => handleNavClick('cases')}>
              {t('nav_cases')}
            </button>
            <button className="nav-link" onClick={() => handleNavClick('contact')}>
              {t('nav_contact')}
            </button>
            <button onClick={() => navigate('/blog')} className="nav-link">{t('nav_blog')}</button>
            <button onClick={() => navigate('/auth')} className="nav-link">{t('nav_login')}</button>
          </div>
          <div className="ml-2 w-16">
            <CustomSelect value={i18n.language} onChange={changeLanguage} />
          </div>
          <a
            href="https://wa.me/573212686430?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20de%20Husai"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button bg-cyan-400 hover:bg-cyan-500 text-white transition-colors"
          >
            {t('nav_cta')}
            <img
              src="/wa.png"
              alt="WhatsApp"
              className="w-5 h-5 ml-2"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary hover:text-purple-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-dark-border/20">
          <div className="flex flex-col space-y-4 items-start">
            <button className="nav-link text-lg" onClick={() => handleNavClick('services')}>
              {t('nav_services')}
            </button>
            <button className="nav-link text-lg" onClick={() => handleNavClick('cases')}>
              {t('nav_cases')}
            </button>
            <button className="nav-link text-lg" onClick={() => handleNavClick('contact')}>
              {t('nav_contact')}
            </button>
            <Link to="/blog" className="nav-link text-lg" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav_blog')}
            </Link>
            <Link to="/auth" className="nav-link text-lg" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav_login')}
            </Link>
            
            <CustomSelect value={i18n.language} onChange={changeLanguage} />

            <a
              href="https://wa.me/573212686430?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20de%20Husai"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button bg-cyan-400 hover:bg-cyan-500 text-white transition-colors-button"
            >
              {t('nav_cta')}
              <img
                src="/wa.png"
                alt="WhatsApp"
                className="w-5 h-5 ml-2"
              />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
