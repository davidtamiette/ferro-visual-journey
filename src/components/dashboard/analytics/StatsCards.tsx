
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface AnalyticsData {
  id?: string;
  date: string;
  page_views: number;
  unique_visitors: number;
}

interface StatsCardsProps {
  analyticsData: AnalyticsData[];
  isLoading: boolean;
}

const StatsCards = ({ analyticsData, isLoading }: StatsCardsProps) => {
  return (
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
              analyticsData.reduce((sum, item) => sum + item.unique_visitors, 0)
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
              analyticsData.reduce((sum, item) => sum + item.page_views, 0)
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
  );
};

export default StatsCards;
