
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteConfigurationProvider } from './components/SiteConfigurationProvider';
import { SidebarProvider } from './components/SidebarProvider';

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
import AppearancePage from '@/pages/dashboard/AppearancePage';
import ContentPage from '@/pages/dashboard/ContentPage';

// Dashboard Blog Management
import BlogPostsPage from '@/pages/dashboard/blog/BlogPostsPage';
import BlogPostForm from '@/pages/dashboard/blog/BlogPostForm';
import BlogCategoriesPage from '@/pages/dashboard/blog/BlogCategoriesPage';
import BlogTagsPage from '@/pages/dashboard/blog/BlogTagsPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <AuthProvider>
          <SiteConfigurationProvider>
            <SidebarProvider>
              <Toaster />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogIndexPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/auth" element={<AuthPage />} />
                
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <SettingsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <AnalyticsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/appearance" element={
                  <ProtectedRoute adminOnly>
                    <DashboardLayout>
                      <AppearancePage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/content" element={
                  <ProtectedRoute adminOnly>
                    <DashboardLayout>
                      <ContentPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/blog/posts" element={
                  <ProtectedRoute adminOnly>
                    <DashboardLayout>
                      <BlogPostsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/blog/posts/new" element={
                  <ProtectedRoute adminOnly>
                    <DashboardLayout>
                      <BlogPostForm />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/blog/posts/edit/:postId" element={
                  <ProtectedRoute adminOnly>
                    <DashboardLayout>
                      <BlogPostForm />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/blog/categories" element={
                  <ProtectedRoute adminOnly>
                    <DashboardLayout>
                      <BlogCategoriesPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/blog/tags" element={
                  <ProtectedRoute adminOnly>
                    <DashboardLayout>
                      <BlogTagsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SidebarProvider>
          </SiteConfigurationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
