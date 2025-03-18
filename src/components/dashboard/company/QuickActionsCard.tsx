
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const QuickActionsCard = () => {
  return (
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
  );
};

export default QuickActionsCard;
