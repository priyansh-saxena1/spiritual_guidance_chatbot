import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/auth/login');
    }
  }, [loading, user, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sacred-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🕉️</div>
          <p className="text-sacred-maroon font-semibold">Loading your spiritual journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};