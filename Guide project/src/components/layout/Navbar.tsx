import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll suave a la sección cuando cambia el hash
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

  return (
    <nav className={`floating-nav ${isScrolled ? 'bg-dark-card/50' : 'bg-dark-card/30'}`}>
      <div className="flex items-center justify-between">
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
            <button className="nav-link" onClick={() => handleNavClick('services')}>Services</button>
            <button className="nav-link" onClick={() => handleNavClick('cases')}>Case Studies</button>
            <button className="nav-link" onClick={() => handleNavClick('contact')}>Contact</button>
            <Link to="/blog" className="nav-link">Blog</Link>
          </div>
          <button className="glass-button">Get Started</button>
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
            <button className="nav-link text-lg" onClick={() => handleNavClick('services')}>Services</button>
            <button className="nav-link text-lg" onClick={() => handleNavClick('cases')}>Case Studies</button>
            <button className="nav-link text-lg" onClick={() => handleNavClick('contact')}>Contact</button>
            <Link to="/blog" className="nav-link text-lg" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <button className="glass-button w-full justify-center">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
