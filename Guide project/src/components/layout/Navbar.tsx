import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`floating-nav ${isScrolled ? 'bg-dark-card/50' : 'bg-dark-card/30'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Logo className="text-purple-primary w-8 h-8" />
          <div className="flex flex-col">
            <span className="text-text-primary text-2xl font-normal" style={{ fontFamily: 'Poppins' }}>Husai</span>
            <span className="text-purple-primary text-xs tracking-wider" style={{ fontFamily: 'Source Sans 3' }}>Smarter With Data</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          <div className="flex space-x-8">
            <a href="#services" className="nav-link">Services</a>
            <a href="#cases" className="nav-link">Case Studies</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <button className="glass-button">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text-primary hover:text-purple-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
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
              Services
            </a>
            <a 
              href="#cases" 
              className="nav-link text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Case Studies
            </a>
            <a 
              href="#contact" 
              className="nav-link text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <button className="glass-button w-full justify-center">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;