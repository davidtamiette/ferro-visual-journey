
import React from 'react';
import { useSidebar } from '@/contexts/SidebarContext';

const SidebarBackdrop = () => {
  const { mobileOpen, closeMobileMenu } = useSidebar();
  
  if (!mobileOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
      onClick={closeMobileMenu}
    />
  );
};

export default SidebarBackdrop;
