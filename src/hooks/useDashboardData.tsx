
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  company_name: string;
  company_description: string;
  contact_email: string;
  contact_phone: string;
  address: string;
}

interface AnalyticsData {
  id: string;
  date: string;
  page_views: number;
  unique_visitors: number;
}

interface DashboardData {
  settings: SiteSettings | null;
  analyticsData: AnalyticsData[];
  isLoading: boolean;
}

export const useDashboardData = (): DashboardData => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch site settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single();
          
        if (settingsError) {
          console.error('Error fetching settings:', settingsError);
        } else {
          setSettings(settingsData);
        }
        
        // Fetch analytics data (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { data: analyticsData, error: analyticsError } = await supabase
          .from('analytics')
          .select('*')
          .gte('date', sevenDaysAgo.toISOString().split('T')[0])
          .order('date', { ascending: true });
          
        if (analyticsError) {
          console.error('Error fetching analytics:', analyticsError);
        } else {
          setAnalyticsData(analyticsData || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { settings, analyticsData, isLoading };
};
