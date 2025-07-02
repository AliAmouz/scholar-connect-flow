
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
    if (!loading) {
      // If no user is authenticated, redirect to auth page
      if (!user) {
        console.log('No authenticated user, redirecting to auth');
        navigate('/auth');
        return;
      }

      // If user is authenticated but role is not loaded yet, wait
      if (user && !userRole) {
        console.log('User authenticated but role not loaded, waiting...');
        return;
      }

      // If specific roles are required and user doesn't have permission
      if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        console.log('User role not authorized:', userRole, 'Required:', allowedRoles);
        
        // Redirect to appropriate dashboard based on user's actual role
        switch (userRole) {
          case 'admin':
            navigate('/admin');
            break;
          case 'teacher':
            navigate('/teacher');
            break;
          case 'parent':
            navigate('/student/1');
            break;
          default:
            navigate('/auth');
            break;
        }
        return;
      }

      console.log('Access granted for role:', userRole);
    }
  }, [user, userRole, loading, navigate, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Verifying your access permissions</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, don't render children (redirect will happen in useEffect)
  if (!user) {
    return null;
  }

  // If role is still loading, show loading state
  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Preparing your workspace...</p>
          <p className="text-gray-500 text-sm mt-2">Loading user permissions</p>
        </div>
      </div>
    );
  }

  // If role check fails, don't render children (redirect will happen in useEffect)
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
