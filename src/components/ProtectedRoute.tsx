
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  
  // For debugging
  console.log("ProtectedRoute status:", { isLoading, user: !!user, isAdmin, path: location.pathname });
  
  if (isLoading) {
    // Show a loading spinner or placeholder
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-toti-teal"></div>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to login if not authenticated
    console.log("User not authenticated, redirecting to /auth");
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }
  
  if (adminOnly && !isAdmin) {
    // Redirect to dashboard if not admin
    console.log("User not admin, redirecting to /dashboard");
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
