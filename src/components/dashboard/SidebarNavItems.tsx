
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  LineChart,
  Settings,
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  exact?: boolean;
  adminOnly?: boolean;
}

interface SidebarNavItemsProps {
  currentPath: string;
}

const SidebarNavItems = ({ currentPath }: SidebarNavItemsProps) => {
  const { isAdmin } = useAuth();
  const { collapsed } = useSidebar();

  const mainNavItems: NavItem[] = [
    {
      title: 'Visão Geral',
      icon: LayoutDashboard,
      href: '/dashboard',
      exact: true,
    },
    {
      title: 'Analytics',
      icon: LineChart,
      href: '/dashboard/analytics',
    },
    {
      title: 'Configurações',
      icon: Settings,
      href: '/dashboard/settings',
    },
  ].filter(item => !item.adminOnly || isAdmin);

  const bottomNavItems: NavItem[] = [
    {
      title: 'Voltar ao site',
      icon: ArrowLeft,
      href: '/',
    },
    {
      title: 'Sair',
      icon: LogOut,
      href: '#logout', // Special handling for logout
    },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <nav className="grid gap-1 px-2 pt-4">
        {mainNavItems.map((item, index) => {
          const IconComponent = item.icon;
          
          return (
            <NavLink
              key={index}
              to={item.href}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
                  collapsed && "justify-center px-0"
                )
              }
            >
              <IconComponent className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>
      
      <nav className="grid gap-1 px-2 py-4 mt-auto">
        {bottomNavItems.map((item, index) => {
          const IconComponent = item.icon;
          
          return item.href === "#logout" ? (
            <button
              key={index}
              onClick={() => {
                const event = new CustomEvent('sidebar-logout');
                window.dispatchEvent(event);
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground w-full text-left",
                "text-muted-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              <IconComponent className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.href}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
                  collapsed && "justify-center px-0"
                )
              }
            >
              <IconComponent className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarNavItems;
