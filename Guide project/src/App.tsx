import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import VoiceflowChat from './components/VoiceflowChat';
import ParallaxBackground from './components/ParallaxBackground';
import CircularPath from './components/animations/CircularPath';
import BackgroundElements from './components/BackgroundElements';

/* -------------------------------------------------------------------------- */
/*                        Lazy‑loaded page modules                            */
/* -------------------------------------------------------------------------- */
const LandingPage   = lazy(() => import('./pages/LandingPage'));
const Blog          = lazy(() => import('./pages/Blog'));
const ArticlePage   = lazy(() => import('./pages/ArticlePage'));
const AuthPage      = lazy(() => import('./pages/Auth'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage'));

const Loading = () => <div>Loading...</div>;

/* -------------------------------------------------------------------------- */
/*                               Layouts                                      */
/* -------------------------------------------------------------------------- */
/**
 * PublicLayout wraps pages that are visible to everyone (landing, blog, etc.).
 */
function PublicLayout() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-dark-background/80">
      {/* Static decorative layers */}
      <ParallaxBackground />
      <CircularPath />
      <BackgroundElements />

      {/* Chrome */}
      <Navbar />
      <main className="flex-grow relative container mx-auto px-6 py-8">
        <Outlet />
      </main>
      <Footer />
      <VoiceflowChat />
    </div>
  );
}

/**
 * AuthLayout keeps the navbar minimal (or none) – replace as desired.
 */
function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-dark-background">
      <Outlet />
    </div>
  );
}

/* ───────────── App Router ───────────── */
export default function App() {
  return (
    /* 2.  Envuelve TODO con AuthProvider */
    <AuthProvider>
      <Suspense fallback={<LoadingScreen onLoadingComplete={() => console.log('Loading complete')} />}>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<Suspense fallback={<Loading />}> <LandingPage /> </Suspense>} />
            <Route path="blog" element={<Suspense fallback={<Loading />}> <Blog /> </Suspense>} />
            <Route path="blog/:slug" element={<Suspense fallback={<Loading />}> <ArticlePage /> </Suspense>} />
          </Route>

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="auth" element={<Suspense fallback={<Loading />}> <AuthPage /> </Suspense>} />
            <Route path="verify-email" element={<Suspense fallback={<Loading />}> <VerifyEmailPage /> </Suspense>} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Suspense fallback={<Loading />}> <DashboardPage /> </Suspense>} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
