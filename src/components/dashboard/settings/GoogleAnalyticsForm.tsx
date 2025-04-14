
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  tracking_id: z
    .string()
    .min(1, { message: 'O ID do Google Analytics é obrigatório' })
    .regex(/^G-[A-Z0-9]+$/i, { 
      message: 'ID do Google Analytics inválido. Deve ter o formato G-XXXXXXXXXX' 
    }),
  enabled: z.boolean().default(true)
});

const GoogleAnalyticsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { trackingId, enabled, updateGASettings } = useGoogleAnalytics();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tracking_id: trackingId || '',
      enabled: enabled
    },
  });
  
  // Update form values when data is loaded
  useState(() => {
    if (trackingId) {
      form.setValue('tracking_id', trackingId);
      form.setValue('enabled', enabled);
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Only store the tracking ID if enabled is true
      const idToSave = values.enabled ? values.tracking_id : '';
      await updateGASettings(idToSave);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Analytics</CardTitle>
        <CardDescription>
          Configure o rastreamento do Google Analytics 4 para o seu site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tracking_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID do Google Analytics</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="G-XXXXXXXXXX" 
                      {...field} 
                      value={field.value || ''} 
                    />
                  </FormControl>
                  <FormDescription>
                    Digite o ID do Google Analytics 4 (formato G-XXXXXXXXXX)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Ativar rastreamento
                    </FormLabel>
                    <FormDescription>
                      Ative ou desative o rastreamento de análises no site
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar configurações"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GoogleAnalyticsForm;
