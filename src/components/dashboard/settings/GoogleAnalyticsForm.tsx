
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { Loader2 } from 'lucide-react';

export interface GoogleAnalyticsFormProps {
  onUpdate?: () => Promise<void>;
}

const GoogleAnalyticsForm: React.FC<GoogleAnalyticsFormProps> = ({ onUpdate }) => {
  const { trackingId: initialTrackingId, isLoading, updateGASettings } = useGoogleAnalytics();
  const [trackingId, setTrackingId] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Update the input field when we get the initial trackingId
  useEffect(() => {
    if (initialTrackingId !== null) {
      setTrackingId(initialTrackingId);
    }
  }, [initialTrackingId]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const result = await updateGASettings(trackingId);
      if (result && onUpdate) {
        await onUpdate();
      }
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Analytics</CardTitle>
        <CardDescription>
          Configure o Google Analytics para rastrear visitantes no seu site.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-2">
            <label htmlFor="tracking-id" className="text-sm font-medium">
              ID de Rastreamento
            </label>
            <Input
              id="tracking-id"
              placeholder="Exemplo: G-XXXXXXXXXX"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              O ID de rastreamento do Google Analytics 4 começa com "G-".
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Configurações'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default GoogleAnalyticsForm;
