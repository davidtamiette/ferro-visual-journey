
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter = ({ collapsed }: SidebarFooterProps) => {
  return (
    <div className="border-t p-4">
      <NavLink
        to="/"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
      >
        {!collapsed ? (
          <>
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao site</span>
          </>
        ) : (
          <ArrowLeft className="h-5 w-5" />
        )}
      </NavLink>
    </div>
  );
};

export default SidebarFooter;
