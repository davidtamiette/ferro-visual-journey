
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  company_name: string;
  logo_url: string | null;
}

const DashboardHeader = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    company_name: 'Dashboard Administrativo',
    logo_url: null
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('company_name, logo_url')
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching site settings:', error);
          return;
        }
        
        if (data) {
          setSiteSettings({
            company_name: data.company_name || 'Dashboard Administrativo',
            logo_url: data.logo_url
          });
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    };
    
    fetchSettings();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Use the provided logo URL
  const logoUrl = "https://oqcicjjjicazrfgdgynl.supabase.co/storage/v1/object/public/logo//logo-ferrovelhototi.png";

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <div className="flex-1 flex items-center">
        <div className="flex items-center gap-2">
          <img
            src={logoUrl}
            alt="Ferro Velho Toti"
            className="h-10 w-auto max-w-[125px] object-contain"
          />
          <span className="text-lg font-semibold hidden sm:inline-block">Dashboard</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuItem className="font-medium">
              {profile?.full_name || user?.email}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
