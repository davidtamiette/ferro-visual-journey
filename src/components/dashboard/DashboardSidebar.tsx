
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import SidebarHeader from './SidebarHeader';
import SidebarNavItems from './SidebarNavItems';
import SidebarFooter from './SidebarFooter';
import SidebarMobileToggle from './SidebarMobileToggle';
import SidebarBackdrop from './SidebarBackdrop';

interface DashboardSidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

const DashboardSidebar = ({ onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  
  return (
    <SidebarProvider onToggle={onToggle}>
      <SidebarMobileToggle />
      <SidebarBackdrop />
      
      <SidebarContent currentPath={location.pathname} />
    </SidebarProvider>
  );
};

const SidebarContent = ({ currentPath }: { currentPath: string }) => {
  const { collapsed, mobileOpen } = useSidebar();
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[250px]",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <SidebarHeader />
      
      <ScrollArea className="flex-1 py-4">
        <SidebarNavItems currentPath={currentPath} />
      </ScrollArea>
      
      <SidebarFooter />
    </aside>
  );
};

export default DashboardSidebar;
