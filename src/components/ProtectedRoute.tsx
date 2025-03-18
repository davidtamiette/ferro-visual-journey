
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  // Effect to ensure we're not stuck in loading state
  useEffect(() => {
    // If loading takes more than 3 seconds and user isn't authenticated, redirect
    const timeoutId = setTimeout(() => {
      if (isLoading && !user) {
        console.log("Protection timeout reached, redirecting to auth");
        navigate('/auth', { replace: true });
      }
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  }, [isLoading, user, navigate]);
  
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
    console.log("User not authenticated, redirecting to auth");
    return <Navigate to="/auth" replace />;
  }
  
  if (adminOnly && !isAdmin) {
    // Redirect to dashboard if not admin
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
