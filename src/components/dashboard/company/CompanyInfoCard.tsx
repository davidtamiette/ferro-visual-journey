
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface SiteSettings {
  company_name: string;
  company_description: string;
  contact_email: string;
  contact_phone: string;
  address: string;
}

interface CompanyInfoCardProps {
  settings: SiteSettings | null;
  isLoading: boolean;
}

const CompanyInfoCard = ({ settings, isLoading }: CompanyInfoCardProps) => {
  return (
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
  );
};

export default CompanyInfoCard;
