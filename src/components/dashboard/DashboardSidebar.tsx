
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Settings, 
  LineChart, 
  Palette, 
  FileText,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const navItems = [
    {
      title: 'Visão Geral',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard',
      exact: true,
    },
    {
      title: 'Analytics',
      icon: <LineChart className="h-5 w-5" />,
      href: '/dashboard/analytics',
    },
    {
      title: 'Aparência',
      icon: <Palette className="h-5 w-5" />,
      href: '/dashboard/appearance',
      adminOnly: true,
    },
    {
      title: 'Conteúdo',
      icon: <FileText className="h-5 w-5" />,
      href: '/dashboard/content',
      adminOnly: true,
    },
    {
      title: 'Configurações',
      icon: <Settings className="h-5 w-5" />,
      href: '/dashboard/settings',
    },
  ].filter(item => !item.adminOnly || isAdmin);
  
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
          onClick={() => setMobileOpen(false)}
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
              onClick={() => setCollapsed(!collapsed)}
            >
              <ArrowLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    collapsed && "justify-center px-0"
                  )
                }
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
        
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
      </aside>
    </>
  );
};

export default DashboardSidebar;
