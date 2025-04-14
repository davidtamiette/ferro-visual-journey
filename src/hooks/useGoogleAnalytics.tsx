
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useGoogleAnalytics = () => {
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGASettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching Google Analytics settings:', error);
          setIsLoading(false);
          return;
        }

        // Check if the data has a 'google_analytics_id' field
        if (data) {
          // Get the tracking ID from the data
          const gaId = data.google_analytics_id || null;
          setTrackingId(gaId);
          setEnabled(!!gaId);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to parse Google Analytics settings:', error);
        setIsLoading(false);
      }
    };

    fetchGASettings();
  }, []);

  const updateGASettings = async (trackingId: string) => {
    try {
      // Get existing settings first
      const { data: existingData } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1);

      let result;
      
      if (existingData && existingData.length > 0) {
        // Update existing settings
        result = await supabase
          .from('site_settings')
          .update({ 
            google_analytics_id: trackingId,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData[0].id);
      } else {
        // Create new settings if none exist
        result = await supabase
          .from('site_settings')
          .insert({
            google_analytics_id: trackingId,
            company_name: 'Ferro Velho Toti', // Default value for required field
            updated_at: new Date().toISOString()
          });
      }

      if (result.error) {
        console.error('Error updating Google Analytics settings:', result.error);
        toast({
          title: 'Erro',
          description: 'Não foi possível salvar as configurações do Google Analytics.',
          variant: 'destructive',
        });
        return false;
      }

      setTrackingId(trackingId);
      setEnabled(!!trackingId);
      
      toast({
        title: 'Sucesso',
        description: 'Configurações do Google Analytics atualizadas com sucesso.',
      });
      
      return true;
    } catch (error) {
      console.error('Failed to update Google Analytics settings:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as configurações do Google Analytics.',
        variant: 'destructive',
      });
      return false;
    }
  };

  return { trackingId, enabled, isLoading, updateGASettings };
};
