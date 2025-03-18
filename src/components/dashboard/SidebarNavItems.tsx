
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Settings, 
  LineChart, 
  Palette, 
  FileText,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  exact?: boolean;
  adminOnly?: boolean;
  subItems?: { title: string; href: string }[];
}

interface SidebarNavItemsProps {
  collapsed: boolean;
  currentPath: string;
}

const SidebarNavItems = ({ collapsed, currentPath }: SidebarNavItemsProps) => {
  const { isAdmin } = useAuth();

  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };
  
  const navItems: NavItem[] = [
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
      title: 'Blog',
      icon: BookOpen,
      href: '/dashboard/blog',
      adminOnly: true,
      subItems: [
        {
          title: 'Posts',
          href: '/dashboard/blog/posts',
        },
        {
          title: 'Categorias',
          href: '/dashboard/blog/categories',
        },
        {
          title: 'Tags',
          href: '/dashboard/blog/tags',
        }
      ]
    },
    {
      title: 'Aparência',
      icon: Palette,
      href: '/dashboard/appearance',
      adminOnly: true,
    },
    {
      title: 'Conteúdo',
      icon: FileText,
      href: '/dashboard/content',
      adminOnly: true,
    },
    {
      title: 'Configurações',
      icon: Settings,
      href: '/dashboard/settings',
    },
  ].filter(item => !item.adminOnly || isAdmin);

  return (
    <nav className="grid gap-1 px-2">
      {navItems.map((item, index) => {
        const IconComponent = item.icon;
        
        return (
          <React.Fragment key={index}>
            <NavLink
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
              <IconComponent className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
            
            {/* Render sub-items if they exist and sidebar is not collapsed */}
            {!collapsed && item.subItems && (
              <div className="ml-8 grid gap-1 mt-1">
                {item.subItems.map((subItem, subIndex) => (
                  <NavLink
                    key={subIndex}
                    to={subItem.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-all hover:bg-accent hover:text-accent-foreground",
                        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                      )
                    }
                  >
                    <span>{subItem.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default SidebarNavItems;
