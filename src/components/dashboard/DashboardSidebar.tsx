
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import SidebarHeader from './SidebarHeader';
import SidebarNavItems from './SidebarNavItems';
import SidebarFooter from './SidebarFooter';

interface DashboardSidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

const DashboardSidebar = ({ onToggle }: DashboardSidebarProps) => {
  const [collapsed, setCollapsed] = useState(() => {
    // Check if localStorage has a saved preference
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
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
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Mobile sidebar backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
          collapsed ? "w-[70px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <SidebarHeader 
          collapsed={collapsed} 
          toggleCollapsed={toggleCollapsed} 
          closeMobileMenu={closeMobileMenu}
        />
        
        <ScrollArea className="flex-1 py-4">
          <SidebarNavItems collapsed={collapsed} currentPath={location.pathname} />
        </ScrollArea>
        
        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
};

export default DashboardSidebar;
