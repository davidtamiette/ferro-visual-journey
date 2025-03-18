
import React from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';

const SidebarHeader = () => {
  const { collapsed, toggleCollapsed, closeMobileMenu } = useSidebar();
  
  return (
    <div className="flex h-14 items-center justify-between px-4 border-b">
      <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
        <img
          src="/placeholder.svg"
          alt="Logo"
          className="h-8 w-8"
        />
        {!collapsed && (
          <span className="ml-2 text-lg font-semibold">Toti Admin</span>
        )}
      </div>
      
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:flex hidden"
          onClick={toggleCollapsed}
        >
          <ArrowLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={closeMobileMenu}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarHeader;
