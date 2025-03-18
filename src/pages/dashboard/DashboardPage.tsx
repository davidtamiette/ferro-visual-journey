
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
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

const DashboardPage = () => {
  const { profile } = useAuth();
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
  
  // Generate some placeholder data if none is available
  const placeholderData = [
    { date: '2023-06-01', page_views: 120, unique_visitors: 85 },
    { date: '2023-06-02', page_views: 145, unique_visitors: 97 },
    { date: '2023-06-03', page_views: 135, unique_visitors: 92 },
    { date: '2023-06-04', page_views: 158, unique_visitors: 105 },
    { date: '2023-06-05', page_views: 170, unique_visitors: 118 },
    { date: '2023-06-06', page_views: 190, unique_visitors: 125 },
    { date: '2023-06-07', page_views: 210, unique_visitors: 142 },
  ];
  
  const chartData = analyticsData.length > 0 ? analyticsData : placeholderData;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };
  
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo, {profile?.full_name || 'Administrador'}!</h1>
        <p className="text-muted-foreground">
          Aqui está um resumo do seu site e do desempenho recente.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Totais</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                chartData.reduce((sum, item) => sum + item.unique_visitors, 0)
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Visualizações de Página</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                chartData.reduce((sum, item) => sum + item.page_views, 0)
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <CardDescription>Estimativa baseada em visitas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                '2.4%'
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Análise de Tráfego</CardTitle>
          <CardDescription>
            Visualizações de página e visitantes únicos nos últimos 7 dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {isLoading ? (
              <div className="h-full w-full animate-pulse rounded bg-muted"></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                    stroke="#888" 
                    fontSize={12} 
                  />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="page_views"
                    name="Visualizações de página"
                    stroke="#020249"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="unique_visitors"
                    name="Visitantes únicos"
                    stroke="#1fbbad"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
            <CardDescription>
              Detalhes básicos do seu negócio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                <div className="h-5 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted"></div>
                <div className="h-5 w-2/3 animate-pulse rounded bg-muted"></div>
              </>
            ) : (
              <>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Nome:</span>
                  <p>{settings?.company_name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Email:</span>
                  <p>{settings?.contact_email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Telefone:</span>
                  <p>{settings?.contact_phone}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Endereço:</span>
                  <p>{settings?.address}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Atalhos para tarefas comuns
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button className="w-full" onClick={() => window.location.href = '/dashboard/appearance'}>
              Personalizar Aparência
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/dashboard/content'}>
              Gerenciar Conteúdo
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/dashboard/analytics'}>
              Ver Estatísticas Completas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
