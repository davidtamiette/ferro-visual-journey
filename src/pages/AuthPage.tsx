
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  // Check if user is already logged in
  useEffect(() => {
    if (user && !isLoading) {
      console.log("User is authenticated, redirecting to dashboard");
      navigate('/dashboard', { replace: true });
    }
  }, [user, isLoading, navigate]);
  
  const handleAuthSuccess = () => {
    // Explicitly navigate to dashboard on successful auth
    console.log("Auth success callback called");
    navigate('/dashboard', { replace: true });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-toti-teal"></div>
      </div>
    );
  }
  
  // Only show login form if not authenticated
  if (user) {
    return null; // The useEffect will handle redirection
  }
  
  return (
    <AuthPageLayout
      loginForm={<LoginForm onLoginSuccess={handleAuthSuccess} />}
      registerForm={null} // Removendo o formulário de registro
      loginOnly={true} // Adicionando uma prop para indicar que é apenas login
    />
  );
};

export default AuthPage;
