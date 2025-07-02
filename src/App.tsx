import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import VoiceflowChat from './components/VoiceflowChat';
import ParallaxBackground from './components/ParallaxBackground';
import CircularPath from './components/animations/CircularPath';
import BackgroundElements from './components/BackgroundElements';
import LoadingScreen from './components/LoadingScreen';
import BusinessAssistant from './pages/BusinessAssistant';
import { AnimatePresence, motion } from 'framer-motion';

/* -------------------------------------------------------------------------- */
/*                        Lazy-loaded page modules                            */
/* -------------------------------------------------------------------------- */
const LandingPage   = lazy(() => import('./pages/LandingPage'));
const Blog          = lazy(() => import('./pages/Blog'));
const ArticlePage   = lazy(() => import('./pages/ArticlePage'));
const AuthPage      = lazy(() => import('./pages/Auth'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

/* -------------------------------------------------------------------------- */
/*                               Layouts                                      */
/* -------------------------------------------------------------------------- */
function PublicLayout() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-dark-background/80">
      <ParallaxBackground />
      <CircularPath />
      <BackgroundElements />
      <Navbar />
      <main className="flex-grow relative container mx-auto px-6 py-8">
        <Outlet />
      </main>
      <Footer />
      <VoiceflowChat />
    </div>
  );
}

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-background">
      <Outlet />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               App Router                                   */
/* -------------------------------------------------------------------------- */
export default function App() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);       // TRUE initially to delay first mount
  const [showRoutes, setShowRoutes] = useState(false);

  useEffect(() => {
    setLoading(true);
    setShowRoutes(false);

    const timer = setTimeout(() => {
      setLoading(false);

      // Delay route rendering a bit more after loader fades out
      setTimeout(() => {
        setShowRoutes(true);
      }, 300); // small delay to avoid flicker
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AuthProvider>
      {/* Loading animation */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[9999]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Routes rendered only after loading + fade out */}
      {showRoutes && (
        <Suspense fallback={null}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<ArticlePage />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="auth" element={<AuthPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<PublicLayout />}>
                <Route path="businessassistant" element={<BusinessAssistant />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      )}
    </AuthProvider>
  );
}
