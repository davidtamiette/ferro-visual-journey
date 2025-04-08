
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SiteSettingsForm from '@/components/dashboard/settings/SiteSettingsForm';
import GoogleAnalyticsForm from '@/components/dashboard/settings/GoogleAnalyticsForm';
import { supabase } from '@/integrations/supabase/client';

const SettingsPage = () => {
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("site");

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching settings:', error);
      } else {
        setSettings(data || {});
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Configurações | Dashboard | Ferro Velho Toti</title>
      </Helmet>

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do seu site.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="site">Informações do Site</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>
        
        <TabsContent value="site" className="space-y-4 mt-4">
          <SiteSettingsForm initialData={settings} onUpdate={fetchSettings} />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4 mt-4">
          <GoogleAnalyticsForm 
            initialData={{ 
              google_analytics_id: settings?.google_analytics_id || null 
            }} 
            onUpdate={fetchSettings} 
          />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4 mt-4">
          <div className="p-6 bg-muted/20 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Configuração de Usuários</h3>
            <p className="text-muted-foreground">
              Esta funcionalidade será implementada em breve.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
