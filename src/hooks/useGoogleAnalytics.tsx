
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useGoogleAnalytics = () => {
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoogleAnalyticsSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('google_analytics_id')
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching Google Analytics ID:', error);
        } else if (data && data.google_analytics_id) {
          setTrackingId(data.google_analytics_id);
        }
      } catch (error) {
        console.error('Failed to fetch Google Analytics settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGoogleAnalyticsSettings();
  }, []);

  return { trackingId, isLoading };
};
