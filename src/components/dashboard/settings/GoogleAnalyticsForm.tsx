
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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

const formSchema = z.object({
  google_analytics_id: z
    .string()
    .min(1, { message: 'O ID do Google Analytics é obrigatório' })
    .regex(/^G-[A-Z0-9]+$/i, { 
      message: 'ID do Google Analytics inválido. Deve ter o formato G-XXXXXXXXXX' 
    }),
});

interface GoogleAnalyticsFormProps {
  initialData: {
    google_analytics_id: string | null;
  };
  onUpdate: () => void;
}

const GoogleAnalyticsForm = ({ initialData, onUpdate }: GoogleAnalyticsFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      google_analytics_id: initialData?.google_analytics_id || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Check if settings already exist
      const { data: existingSettings } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1);
      
      let result;
      
      if (existingSettings && existingSettings.length > 0) {
        // Update existing settings
        result = await supabase
          .from('site_settings')
          .update({
            google_analytics_id: values.google_analytics_id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingSettings[0].id);
      } else {
        // Insert new settings
        result = await supabase
          .from('site_settings')
          .insert({
            google_analytics_id: values.google_analytics_id,
            company_name: 'Ferro Velho Toti', // Default value for required field
            updated_at: new Date().toISOString(),
          })
          .select();
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: "Configurações atualizadas",
        description: "As configurações do Google Analytics foram salvas com sucesso.",
      });
      
      onUpdate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: error.message || "Ocorreu um erro ao salvar as configurações.",
      });
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
              name="google_analytics_id"
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
