
import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Index from './pages/Index'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'
import AuthPage from './pages/AuthPage'
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import AnalyticsPage from './pages/dashboard/AnalyticsPage'
import AppearancePage from './pages/dashboard/AppearancePage'
import ContentPage from './pages/dashboard/ContentPage'
import SettingsPage from './pages/dashboard/SettingsPage'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/servicos" element={<ServicesPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="appearance" element={
                  <ProtectedRoute adminOnly>
                    <AppearancePage />
                  </ProtectedRoute>
                } />
                <Route path="content" element={
                  <ProtectedRoute adminOnly>
                    <ContentPage />
                  </ProtectedRoute>
                } />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
