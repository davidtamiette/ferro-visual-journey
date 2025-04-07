
import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

const SidebarHeader = () => {
  const { collapsed } = useSidebar();
  
  return (
    <div className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b bg-background px-4">
      <Link 
        to="/dashboard" 
        className={cn(
          "flex items-center gap-2 font-semibold transition-all",
          collapsed ? "justify-center w-full" : ""
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
          <span className="text-primary-foreground text-xl font-bold">T</span>
        </div>
        
        {!collapsed && (
          <span className="text-xl font-semibold">Toti Admin</span>
        )}
      </Link>
    </div>
  );
};

export default SidebarHeader;
