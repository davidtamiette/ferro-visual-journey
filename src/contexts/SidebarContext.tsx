
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextProps {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapsed: () => void;
  setMobileOpen: (open: boolean) => void;
  closeMobileMenu: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children, onToggle }: { children: React.ReactNode, onToggle?: (collapsed: boolean) => void }) => {
  const [collapsed, setCollapsed] = useState(() => {
    // Check if localStorage has a saved preference
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    // Call onToggle when collapsed changes
    if (onToggle) {
      onToggle(collapsed);
    }
  }, [collapsed, onToggle]);
  
  const toggleCollapsed = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };
  
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <SidebarContext.Provider value={{
      collapsed,
      mobileOpen,
      toggleCollapsed,
      setMobileOpen,
      closeMobileMenu,
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
