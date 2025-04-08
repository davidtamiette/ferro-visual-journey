
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useGoogleAnalytics = () => {
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoogleAnalyticsSettings = async () => {
      try {
        // First check if the column exists
        const { data: columnCheck, error: columnError } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1);
        
        // Check if the column exists by examining if it's in the returned data structure
        if (columnCheck && 
            columnCheck.length > 0 && 
            typeof columnCheck[0] === 'object' &&
            columnCheck[0] !== null &&
            'google_analytics_id' in columnCheck[0]) {
          // Column exists, fetch the value
          const { data, error } = await supabase
            .from('site_settings')
            .select('google_analytics_id')
            .single();
          
          if (error) {
            console.error('Error fetching Google Analytics ID:', error);
          } else if (data && 
                    typeof data === 'object' && 
                    data !== null &&
                    'google_analytics_id' in data && 
                    typeof data.google_analytics_id === 'string') {
            setTrackingId(data.google_analytics_id);
          }
        } else {
          console.log('google_analytics_id column not found in site_settings table');
          // Leave trackingId as null since the column doesn't exist yet
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
