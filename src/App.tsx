import { Suspense, lazy } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppContact from './components/WhatsAppContact';
import BrandTransition from './components/BrandTransition';
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Blog = lazy(() => import('./pages/Blog'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const AuthPage = lazy(() => import('./pages/Auth'));
const BusinessAssistant = lazy(() => import('./pages/BusinessAssistant'));
function PublicLayout() {
  const { pathname } = useLocation();
  return <div className="min-h-screen flex flex-col bg-dark-background"><Navbar /><main id="main-content" className={pathname === '/' ? 'flex-grow' : 'flex-grow container mx-auto px-6 pt-36 pb-8'}><Outlet /></main><Footer /><WhatsAppContact /></div>;
}
export default function App() {
  return <AuthProvider><BrandTransition /><Suspense fallback={<div className="route-loading" role="status" aria-label="Loading"><img src="/husai_logo_svg.svg" alt="HusAI" width="40" height="40" /></div>}><Routes>
    <Route element={<PublicLayout />}><Route index element={<LandingPage />} /><Route path="blog" element={<Blog />} /><Route path="blog/:slug" element={<ArticlePage />} /></Route>
    <Route path="auth" element={<div className="min-h-screen flex items-center justify-center bg-dark-background"><AuthPage /></div>} />
    <Route element={<ProtectedRoute />}><Route element={<PublicLayout />}><Route path="businessassistant" element={<BusinessAssistant />} /></Route></Route>
  </Routes></Suspense></AuthProvider>;
}
