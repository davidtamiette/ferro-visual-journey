
import React, { createContext, useContext, ReactNode } from 'react';
import { useSiteSettings, SiteSettings } from '@/hooks/useSiteSettings';

interface SiteConfigurationContextType {
  settings: SiteSettings | null;
  isLoading: boolean;
  error: Error | null;
}

const SiteConfigurationContext = createContext<SiteConfigurationContextType | undefined>(undefined);

export const useSiteConfiguration = () => {
  const context = useContext(SiteConfigurationContext);
  if (context === undefined) {
    throw new Error('useSiteConfiguration must be used within a SiteConfigurationProvider');
  }
  return context;
};

interface SiteConfigurationProviderProps {
  children: ReactNode;
}

export const SiteConfigurationProvider: React.FC<SiteConfigurationProviderProps> = ({ children }) => {
  const { settings, isLoading, error } = useSiteSettings();

  // Apply site colors to CSS variables
  React.useEffect(() => {
    if (settings) {
      document.documentElement.style.setProperty('--primary-color', settings.primary_color);
      document.documentElement.style.setProperty('--secondary-color', settings.secondary_color);
    }
  }, [settings]);

  return (
    <SiteConfigurationContext.Provider value={{ settings, isLoading, error }}>
      {children}
    </SiteConfigurationContext.Provider>
  );
};
