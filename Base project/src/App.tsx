import React, { useState, useEffect } from 'react'; 
import { useTranslation } from 'react-i18next'; // Import translation hook

// Removed unused Lucide icons if they are only used in child components now
// Removed motion, useScroll, useTransform as they are moved to BackgroundAnimation

// Import Child Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';
import VoiceflowChat from './components/VoiceflowChat';

function App() {
  const { t, i18n } = useTranslation(); // Initialize hook for translations
  const [isScrolled, setIsScrolled] = useState(false); // State for navbar background
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Function to change language (passed to Header)
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMobileMenuOpen(false); // Close mobile menu on language change
  };

  // Simplified scroll effect for navbar background only
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to hide preloader after mount with updated timing
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    let fadeTimer: number | null = null; // Use number type for browser setTimeout ID
    let hideTimer: number | null = null; // Use number type for browser setTimeout ID

    if (preloader) {
      // Wait 3 seconds before starting fade out
      fadeTimer = setTimeout(() => {
        preloader.classList.add('loaded'); // Start 1s fade out

        // Set timeout to add 'hidden' class after fade out transition (1s)
        hideTimer = setTimeout(() => {
          preloader.classList.add('hidden');
          }, 1000); // Match the 1s transition duration in CSS
          document.querySelector('.preloader-text')?.classList.remove('hidden'); // Show preloader text

      }, 3000); // Wait 3 seconds
    }

    // Cleanup timers on component unmount
    return () => {
      if (fadeTimer) clearTimeout(fadeTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  // Refactored Preloader Logic using State
  type PreloaderStatus = 'active' | 'fading' | 'hidden';
  const [preloaderStatus, setPreloaderStatus] = useState<PreloaderStatus>('active');

  useEffect(() => {
    // Start fading after 3 seconds
    const fadeTimer = setTimeout(() => {
      setPreloaderStatus('fading');
    }, 3000);

    // Hide completely after fade transition (1s) + initial delay (3s) = 4s
    const hideTimer = setTimeout(() => {
      setPreloaderStatus('hidden');
    }, 4000); // 3000ms delay + 1000ms fade

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []); // Run only once on mount

  // Effect to update preloader element classes based on state
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      if (preloaderStatus === 'fading') {
        preloader.classList.add('loaded');
      } else if (preloaderStatus === 'hidden') {
        // Ensure 'loaded' is added before 'hidden' if transitioning directly
        if (!preloader.classList.contains('loaded')) {
          preloader.classList.add('loaded');
        }
        // Add 'hidden' after a microtask delay to ensure 'loaded' styles apply first if needed
        // Although CSS transition should handle this, belt-and-suspenders approach
        queueMicrotask(() => {
           preloader.classList.add('hidden');
        });
      }
    }
  }, [preloaderStatus]); // Run when status changes

  return (
    <div className="min-h-screen bg-dark-background relative"> {/* Removed overflow-hidden */}
      {/* Preloader is in index.html, state just controls its classes */}
      {/* Render Background Animation Component */}
      <BackgroundAnimation />

      {/* Render Header Component */}
      <Header
        t={t}
        i18n={i18n}
        changeLanguage={changeLanguage}
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className="relative container mx-auto px-6 py-8">
        {/* Render Section Components */}
        <HeroSection t={t} />
        <ServicesSection t={t} />
        <CaseStudiesSection t={t} />
        <ContactSection t={t} />
      </main>

      {/* Render Footer Component (inside container or outside depending on desired layout) */}
      <div className="relative container mx-auto px-6 pb-8">
         <Footer t={t} />
      </div>

      {/* Render Voiceflow Chat Component */}
      <VoiceflowChat />
    </div>
  );
}

export default App;
