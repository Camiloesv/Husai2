import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import CaseStudies from './components/sections/CaseStudies';
import Contact from './components/sections/Contact';
import BackgroundElements from './components/BackgroundElements';
import LoadingScreen from './components/LoadingScreen';
import VoiceflowChat from './components/VoiceflowChat';
import Blog from './pages/Blog';
import ArticlePage from './pages/ArticlePage';
import ParallaxBackground from './components/ParallaxBackground';
import CircularPath from './components/animations/CircularPath';

const LandingPage: React.FC = () => (
  <>
    <Hero />
    <Services />
    <CaseStudies />
    <Contact />
  </>
);

function App() {
  const location = useLocation(); // 1. detecta cambios de ruta
  const [isLoading, setIsLoading] = useState(true);

  // 2. Mostrar pantalla de carga al inicio
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 3. Mostrar pantalla de carga cada vez que cambia la ruta
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // duración deseada al cambiar página
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen relative overflow-hidden flex flex-col bg-dark-background/80">
          <ParallaxBackground />
          <CircularPath />
          <BackgroundElements />

          <Navbar />
          <main className="flex-grow relative container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<ArticlePage />} />
            </Routes>
          </main>
          <Footer />
          <VoiceflowChat />
        </div>
      )}
    </>
  );
}

export default App;
