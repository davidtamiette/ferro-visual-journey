
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter = ({ collapsed }: SidebarFooterProps) => {
  const { signOut } = useAuth();

  return (
    <div className="border-t p-4">
      <div className="flex flex-col space-y-2">
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
        
        <button
          onClick={signOut}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
        >
          {!collapsed ? (
            <>
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </>
          ) : (
            <LogOut className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SidebarFooter;
