
import React, { useState, ReactNode } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    // Check if localStorage has a saved preference for sidebar state
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    return savedCollapsed === 'true' ? 70 : 250;
  });

  // Callback to update sidebar width when it's collapsed/expanded
  const handleSidebarToggle = (collapsed: boolean) => {
    const newWidth = collapsed ? 70 : 250;
    setSidebarWidth(newWidth);
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  };

  return (
    <div className="flex h-screen bg-muted/30">
      <DashboardSidebar onToggle={handleSidebarToggle} />
      <div 
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300" 
        style={{ marginLeft: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` }}
      >
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
