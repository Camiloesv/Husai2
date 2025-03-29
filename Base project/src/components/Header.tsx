import React from 'react';
import { ArrowRight, Menu, X } from 'lucide-react'; // Removed Brain
import { TFunction, i18n } from 'i18next'; // Import i18n type directly

interface HeaderProps {
  t: TFunction;
  i18n: i18n; // Use the imported i18n type
  changeLanguage: (lng: string) => void;
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  t,
  i18n,
  changeLanguage,
  isScrolled,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  return (
    <nav className={`floating-nav ${isScrolled ? 'bg-dark-card/50' : 'bg-dark-card/30'}`}>
      <div className="flex items-center justify-between">
        {/* Logo and Brand Name */}
        <a href="/" className=""> {/* Link wraps logo and text */}
          <div className="flex items-center space-x-3"> {/* Flex container for logo and text */}
            <img src="/husai_logo_svg.svg" alt="HusAI Logo" className="h-16 w-auto" /> {/* Changed to SVG */}
            <span className="text-text-primary text-2xl font-bold">HusAI</span> {/* Added text */}
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          <div className="flex space-x-8 items-center">
            <a href="#services" className="nav-link">{t('nav.services')}</a>
            <a href="#cases" className="nav-link">{t('nav.cases')}</a>
            <a href="#contact" className="nav-link">{t('nav.contact')}</a>
            {/* Language Buttons - Desktop */}
            <div className="flex space-x-2 border-l border-dark-border/30 pl-4 ml-4">
              <button
                onClick={() => changeLanguage('en')}
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  i18n.language === 'en' ? 'text-purple-primary bg-purple-primary/10' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t('language.en')}
              </button>
              <button
                onClick={() => changeLanguage('es')}
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  i18n.language === 'es' ? 'text-purple-primary bg-purple-primary/10' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t('language.es')}
              </button>
            </div>
          </div>
          <button className="glass-button">
            {t('button.getStarted')}
            <ArrowRight className="w-4 h-4" />
          </button>
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
          <div className="flex flex-col space-y-4">
            <a
              href="#services"
              className="nav-link text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.services')}
            </a>
            <a
              href="#cases"
              className="nav-link text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.cases')}
            </a>
            <a
              href="#contact"
              className="nav-link text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
            <button className="glass-button w-full justify-center">
              {t('button.getStarted')}
              <ArrowRight className="w-4 h-4" />
            </button>
            {/* Language Buttons - Mobile */}
            <div className="flex justify-center space-x-4 pt-4 border-t border-dark-border/20 mt-4">
              <button
                onClick={() => changeLanguage('en')}
                className={`text-sm font-semibold px-3 py-1 rounded ${
                  i18n.language === 'en' ? 'text-purple-primary bg-purple-primary/10' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t('language.en')}
              </button>
              <button
                onClick={() => changeLanguage('es')}
                className={`text-sm font-semibold px-3 py-1 rounded ${
                  i18n.language === 'es' ? 'text-purple-primary bg-purple-primary/10' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t('language.es')}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
