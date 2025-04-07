
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/ThemeProvider';

// Main pages
import Index from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ContactPage from '@/pages/ContactPage';
import AuthPage from '@/pages/AuthPage';
import NotFound from '@/pages/NotFound';

// Blog pages
import BlogIndexPage from '@/pages/blog/BlogIndexPage';
import BlogPostPage from '@/pages/blog/BlogPostPage';

// Dashboard
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import AnalyticsPage from '@/pages/dashboard/AnalyticsPage';
import ContentPage from '@/pages/dashboard/ContentPage';
import BlogPostsPage from '@/pages/dashboard/blog/BlogPostsPage'; 

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="toti-theme">
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="content" element={<ContentPage />} />
              <Route path="blog/posts" element={<BlogPostsPage />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
