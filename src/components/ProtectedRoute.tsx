import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // AUTHENTICATION DISABLED FOR DEBUGGING
    // All routes are now accessible without authentication
    console.log('ProtectedRoute - Auth disabled, allowing access');
    console.log('Current user role:', userRole);
    console.log('Allowed roles:', allowedRoles);
  }, [user, userRole, loading, navigate, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // BYPASS ALL AUTHENTICATION CHECKS
  // Simply render the children without any restrictions
  return <>{children}</>;
};

export default ProtectedRoute;