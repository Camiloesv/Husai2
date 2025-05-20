// File: src/components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import LoadingScreen from '../components/LoadingScreen';

/**
 * Route wrapper that blocks access unless the user is authenticated.
 *
 * Usage in <Routes>:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<DashboardPage />} />
 *   </Route>
 */
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />; // waiting for AuthProvider

  if (!user) {
    // Not logged in → bounce to /auth and remember intended URL
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <Outlet />; // Auth OK → render child route(s)
}
