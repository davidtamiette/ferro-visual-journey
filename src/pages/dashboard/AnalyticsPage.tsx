
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  id: string;
  date: string;
  page_views: number;
  unique_visitors: number;
  bounce_rate: number | null;
  avg_session_duration: number | null;
  source: string | null;
}

// Sample data for demonstration purposes
const SAMPLE_DATA: AnalyticsData[] = [
  { id: '1', date: '2023-06-01', page_views: 120, unique_visitors: 85, bounce_rate: 45.2, avg_session_duration: 123.4, source: 'Google' },
  { id: '2', date: '2023-06-02', page_views: 145, unique_visitors: 97, bounce_rate: 42.8, avg_session_duration: 135.2, source: 'Direct' },
  { id: '3', date: '2023-06-03', page_views: 135, unique_visitors: 92, bounce_rate: 47.5, avg_session_duration: 118.9, source: 'Google' },
  { id: '4', date: '2023-06-04', page_views: 158, unique_visitors: 105, bounce_rate: 40.1, avg_session_duration: 142.6, source: 'Facebook' },
  { id: '5', date: '2023-06-05', page_views: 170, unique_visitors: 118, bounce_rate: 38.7, avg_session_duration: 156.3, source: 'Google' },
  { id: '6', date: '2023-06-06', page_views: 190, unique_visitors: 125, bounce_rate: 35.2, avg_session_duration: 162.7, source: 'Direct' },
  { id: '7', date: '2023-06-07', page_views: 210, unique_visitors: 142, bounce_rate: 33.8, avg_session_duration: 167.5, source: 'Instagram' },
  { id: '8', date: '2023-06-08', page_views: 205, unique_visitors: 138, bounce_rate: 36.2, avg_session_duration: 155.8, source: 'Google' },
  { id: '9', date: '2023-06-09', page_views: 195, unique_visitors: 130, bounce_rate: 39.5, avg_session_duration: 148.3, source: 'Direct' },
  { id: '10', date: '2023-06-10', page_views: 225, unique_visitors: 152, bounce_rate: 32.5, avg_session_duration: 171.2, source: 'Google' },
  { id: '11', date: '2023-06-11', page_views: 240, unique_visitors: 160, bounce_rate: 30.8, avg_session_duration: 182.6, source: 'Facebook' },
  { id: '12', date: '2023-06-12', page_views: 235, unique_visitors: 155, bounce_rate: 31.5, avg_session_duration: 178.3, source: 'Google' },
  { id: '13', date: '2023-06-13', page_views: 255, unique_visitors: 170, bounce_rate: 28.7, avg_session_duration: 191.5, source: 'Direct' },
  { id: '14', date: '2023-06-14', page_views: 270, unique_visitors: 180, bounce_rate: 27.2, avg_session_duration: 195.8, source: 'Instagram' },
];

const COLORS = ['#020249', '#1fbbad', '#404077', '#6c6d8d', '#8F91C7'];

const AnalyticsPage = () => {
  const { toast } = useToast();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [pageViews, setPageViews] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [bounceRate, setBounceRate] = useState(0);
  const [avgSessionDuration, setAvgSessionDuration] = useState(0);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      try {
        let startDate;
        const now = new Date();
        
        if (timeRange === '7d') {
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 7);
        } else if (timeRange === '30d') {
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 30);
        }
        
        // Try to fetch real data from Supabase
        let { data, error } = await supabase
          .from('analytics')
          .select('*')
          .order('date', { ascending: true });
          
        if (startDate && data) {
          data = data.filter(item => new Date(item.date) >= startDate);
        }
        
        if (error) {
          console.error('Error fetching analytics data:', error);
          // Use sample data in case of error
          setAnalyticsData(SAMPLE_DATA);
        } else if (data && data.length > 0) {
          setAnalyticsData(data);
        } else {
          // No data or empty array, use sample data
          setAnalyticsData(SAMPLE_DATA);
        }
      } catch (error) {
        console.error('Error in analytics data fetch:', error);
        setAnalyticsData(SAMPLE_DATA);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [timeRange]);
  
  useEffect(() => {
    if (analyticsData.length > 0) {
      // Calculate summary metrics
      const totalPageViews = analyticsData.reduce((sum, item) => sum + item.page_views, 0);
      const totalVisitors = analyticsData.reduce((sum, item) => sum + item.unique_visitors, 0);
      
      // Calculate average bounce rate from non-null values
      const bounceRates = analyticsData
        .filter(item => item.bounce_rate !== null)
        .map(item => item.bounce_rate as number);
      const avgBounceRate = bounceRates.length > 0
        ? bounceRates.reduce((sum, rate) => sum + rate, 0) / bounceRates.length
        : 0;
      
      // Calculate average session duration from non-null values
      const sessionDurations = analyticsData
        .filter(item => item.avg_session_duration !== null)
        .map(item => item.avg_session_duration as number);
      const avgDuration = sessionDurations.length > 0
        ? sessionDurations.reduce((sum, duration) => sum + duration, 0) / sessionDurations.length
        : 0;
      
      setPageViews(totalPageViews);
      setUniqueVisitors(totalVisitors);
      setBounceRate(avgBounceRate);
      setAvgSessionDuration(avgDuration);
    }
  }, [analyticsData]);
  
  // Prepare data for source pie chart
  const getSourceData = () => {
    const sourceMap = new Map<string, number>();
    
    analyticsData.forEach(item => {
      const source = item.source || 'Desconhecido';
      const currentCount = sourceMap.get(source) || 0;
      sourceMap.set(source, currentCount + item.unique_visitors);
    });
    
    return Array.from(sourceMap.entries()).map(([name, value]) => ({ name, value }));
  };
  
  const sourceData = getSourceData();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  // Function to simulate data import
  const handleImportData = async () => {
    setIsLoading(true);
    
    try {
      // Generate a random data point for today
      const today = new Date().toISOString().split('T')[0];
      const newDataPoint = {
        date: today,
        page_views: Math.floor(Math.random() * 100) + 150,
        unique_visitors: Math.floor(Math.random() * 70) + 100,
        bounce_rate: Math.floor(Math.random() * 20) + 30,
        avg_session_duration: Math.floor(Math.random() * 100) + 120,
        source: ['Google', 'Direct', 'Facebook', 'Instagram'][Math.floor(Math.random() * 4)]
      };
      
      // Insert the data point into the database
      const { error } = await supabase
        .from('analytics')
        .insert([newDataPoint]);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Dados importados",
        description: "Os dados de análise foram importados com sucesso.",
      });
      
      // Refresh data
      setTimeRange(prev => prev);
    } catch (error: any) {
      console.error('Error importing analytics data:', error);
      toast({
        variant: "destructive",
        title: "Erro na importação",
        description: error.message || "Não foi possível importar os dados de análise.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Analytics | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Acompanhe o desempenho do seu site com dados detalhados.
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={handleImportData}
              disabled={isLoading}
            >
              Importar Dados
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Tabs 
          value={timeRange} 
          onValueChange={(value) => setTimeRange(value as '7d' | '30d' | 'all')}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="7d">7 dias</TabsTrigger>
            <TabsTrigger value="30d">30 dias</TabsTrigger>
            <TabsTrigger value="all">Tudo</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                pageViews.toLocaleString()
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                uniqueVisitors.toLocaleString()
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                `${bounceRate.toFixed(1)}%`
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                formatDuration(avgSessionDuration)
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Visualizações de Página e Visitantes</CardTitle>
            <CardDescription>
              Comparação de visualizações e visitantes ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {isLoading ? (
                <div className="h-full w-full animate-pulse rounded bg-muted"></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate}
                      stroke="#888" 
                      fontSize={12} 
                    />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="page_views"
                      name="Visualizações de página"
                      stroke="#020249"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="unique_visitors"
                      name="Visitantes únicos"
                      stroke="#1fbbad"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Fontes de Tráfego</CardTitle>
            <CardDescription>
              De onde vêm seus visitantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {isLoading ? (
                <div className="h-full w-full animate-pulse rounded bg-muted"></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Rejeição</CardTitle>
            <CardDescription>
              Porcentagem de visitantes que saem após ver apenas uma página
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {isLoading ? (
                <div className="h-full w-full animate-pulse rounded bg-muted"></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate}
                      stroke="#888" 
                      fontSize={12} 
                    />
                    <YAxis stroke="#888" fontSize={12} domain={[0, 100]} />
                    <Tooltip />
                    <Bar 
                      dataKey="bounce_rate" 
                      name="Taxa de Rejeição (%)" 
                      fill="#404077" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
