
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';

// Component imports
import StatsCards from '@/components/dashboard/analytics/StatsCards';
import AnalyticsChart from '@/components/dashboard/analytics/AnalyticsChart';
import CompanyInfoCard from '@/components/dashboard/company/CompanyInfoCard';
import QuickActionsCard from '@/components/dashboard/company/QuickActionsCard';

const DashboardPage = () => {
  const { profile } = useAuth();
  const { settings, analyticsData, isLoading } = useDashboardData();
  
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
      
      <StatsCards analyticsData={analyticsData} isLoading={isLoading} />
      
      <AnalyticsChart analyticsData={analyticsData} isLoading={isLoading} />
      
      <div className="grid gap-4 md:grid-cols-2">
        <CompanyInfoCard settings={settings} isLoading={isLoading} />
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default DashboardPage;
