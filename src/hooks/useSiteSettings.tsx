
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSettings {
  id: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  company_name: string;
  company_description: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          throw error;
        }

        setSettings(data);
      } catch (err) {
        console.error('Error fetching site settings:', err);
        setError(err instanceof Error ? err : new Error('Unknown error fetching site settings'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, isLoading, error };
};
