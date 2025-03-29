import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import CaseStudies from './components/sections/CaseStudies';
import Contact from './components/sections/Contact';
import BackgroundElements from './components/BackgroundElements';
import LoadingScreen from './components/LoadingScreen';
import VoiceflowChat from './components/VoiceflowChat'; // Local path

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-dark-background relative overflow-hidden">
          <BackgroundElements />
          <div className="relative container mx-auto px-6 py-8">
            <Navbar />
            <Hero />
            <Services />
            <CaseStudies />
            <Contact />
            <Footer />
            <VoiceflowChat /> {/* Add VoiceflowChat component */}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
