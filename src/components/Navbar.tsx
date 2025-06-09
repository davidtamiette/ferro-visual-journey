
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';
import { Button } from '@/components/ui/button';

import { useAuth } from '@/contexts/AuthContext'; 
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';

interface NavbarProps {
  activeSection?: string;
}

interface SiteSettings {
  company_name: string;
  logo_url: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    company_name: 'Ferro Velho Toti',
    logo_url: null
  });
  
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Fetch site settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('company_name, logo_url')
          .single();
        
        if (error && error.code !== 'PGRST116') {
          // PGRST116 is the "no rows returned" error code
          console.error('Error fetching site settings:', error);
          return;
        }
        
        if (data) {
          setSiteSettings({
            company_name: data.company_name || 'Ferro Velho Toti',
            logo_url: data.logo_url
          });
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    };
    
    fetchSettings();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
    navigate('/');
  };
  
  // Use the provided logo URL
  const logoUrl = "https://oqcicjjjicazrfgdgynl.supabase.co/storage/v1/object/public/logo//logo-ferrovelhototi.png";
  
  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-toti-navy/80 backdrop-blur-md shadow-subtle'
          : ''
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={logoUrl}
                alt="Ferro Velho Toti"
                className="h-10 w-auto max-w-[130px] sm:h-13 sm:max-w-[156px] object-contain"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-toti-teal ${
                activeSection === 'home' ? 'text-toti-teal' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-toti-teal ${
                activeSection === 'about' ? 'text-toti-teal' : ''
              }`}
            >
              Sobre
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors hover:text-toti-teal ${
                activeSection === 'services' ? 'text-toti-teal' : ''
              }`}
            >
              Serviços
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-toti-teal ${
                activeSection === 'contact' ? 'text-toti-teal' : ''
              }`}
            >
              Contato
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors hover:text-toti-teal ${
                activeSection === 'blog' ? 'text-toti-teal' : ''
              }`}
            >
              Blog
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDashboardClick}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link to="/auth">
                  Acessar
                </Link>
              </Button>
            )}
            
            <ThemeToggle />
          </nav>

          <div className="flex md:hidden items-center space-x-2">
            {user && (
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full mr-1" 
                size="icon"
                onClick={handleDashboardClick}
              >
                <User className="h-5 w-5" />
              </Button>
            )}
          
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="h-8 w-8"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 space-y-2 bg-white dark:bg-toti-navy shadow-md">
          <Link
            to="/"
            className={`block py-2 text-sm font-medium ${
              activeSection === 'home' ? 'text-toti-teal' : ''
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block py-2 text-sm font-medium ${
              activeSection === 'about' ? 'text-toti-teal' : ''
            }`}
            onClick={closeMenu}
          >
            Sobre
          </Link>
          <Link
            to="/services"
            className={`block py-2 text-sm font-medium ${
              activeSection === 'services' ? 'text-toti-teal' : ''
            }`}
            onClick={closeMenu}
          >
            Serviços
          </Link>
          <Link
            to="/contact"
            className={`block py-2 text-sm font-medium ${
              activeSection === 'contact' ? 'text-toti-teal' : ''
            }`}
            onClick={closeMenu}
          >
            Contato
          </Link>
          <Link
            to="/blog"
            className={`block py-2 text-sm font-medium ${
              activeSection === 'blog' ? 'text-toti-teal' : ''
            }`}
            onClick={closeMenu}
          >
            Blog
          </Link>
          {!user && (
            <Link
              to="/auth"
              className="block py-2 text-sm font-medium"
              onClick={closeMenu}
            >
              Acessar
            </Link>
          )}
          {user && (
            <button
              className="block w-full text-left py-2 text-sm font-medium"
              onClick={(e) => {
                handleSignOut(e);
                closeMenu();
              }}
            >
              Sair
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
