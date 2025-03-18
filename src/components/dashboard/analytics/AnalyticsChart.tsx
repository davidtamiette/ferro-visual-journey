
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

interface AnalyticsChartProps {
  analyticsData: AnalyticsData[];
  isLoading: boolean;
}

const AnalyticsChart = ({ analyticsData, isLoading }: AnalyticsChartProps) => {
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
  );
};

export default AnalyticsChart;
