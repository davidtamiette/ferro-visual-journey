
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GASettings {
  trackingId: string;
  enabled: boolean;
}

export const useGoogleAnalytics = () => {
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGASettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'google_analytics')
          .single();

        if (error) {
          console.error('Error fetching Google Analytics settings:', error);
          setIsLoading(false);
          return;
        }

        if (data && data.value) {
          const settings = JSON.parse(data.value) as GASettings;
          setTrackingId(settings.trackingId || null);
          setEnabled(settings.enabled || false);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to parse Google Analytics settings:', error);
        setIsLoading(false);
      }
    };

    fetchGASettings();
  }, []);

  const updateGASettings = async (settings: GASettings) => {
    try {
      const { error } = await supabase
        .from('settings')
        .update({ value: JSON.stringify(settings) })
        .eq('key', 'google_analytics');

      if (error) {
        console.error('Error updating Google Analytics settings:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível salvar as configurações do Google Analytics.',
          variant: 'destructive',
        });
        return false;
      }

      setTrackingId(settings.trackingId);
      setEnabled(settings.enabled);
      
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
