
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  // Check if user is already logged in
  useEffect(() => {
    if (user && !isLoading) {
      console.log("User is authenticated, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);
  
  const handleAuthSuccess = () => {
    // Navigation will happen automatically via the useEffect above
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-toti-teal"></div>
      </div>
    );
  }
  
  // If we're already logged in and not loading, the useEffect will redirect
  
  return (
    <AuthPageLayout
      loginForm={<LoginForm onLoginSuccess={handleAuthSuccess} />}
      registerForm={<RegisterForm onRegisterSuccess={handleAuthSuccess} />}
    />
  );
};

export default AuthPage;
