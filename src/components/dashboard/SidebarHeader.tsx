
import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

const SidebarHeader = () => {
  const { collapsed } = useSidebar();
  
  // Use the provided logo URL
  const logoUrl = "https://oqcicjjjicazrfgdgynl.supabase.co/storage/v1/object/public/logo//logo-ferrovelhototi.png";
  
  return (
    <div className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b bg-background px-4">
      <Link 
        to="/dashboard" 
        className={cn(
          "flex items-center gap-2 font-semibold transition-all",
          collapsed ? "justify-center w-full" : ""
        )}
      >
        {collapsed ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-primary-foreground text-xl font-bold">T</span>
          </div>
        ) : (
          <>
            <img
              src={logoUrl}
              alt="Ferro Velho Toti"
              className="h-6 w-auto max-w-[80px] object-contain"
            />
            <span className="text-lg font-semibold">Admin</span>
          </>
        )}
      </Link>
    </div>
  );
};

export default SidebarHeader;
