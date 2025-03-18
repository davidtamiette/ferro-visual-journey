
import React from 'react';
import { Helmet } from 'react-helmet';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

interface AuthPageLayoutProps {
  loginForm: React.ReactNode;
  registerForm: React.ReactNode;
}

const AuthPageLayout = ({ loginForm, registerForm }: AuthPageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Login | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Área Administrativa</CardTitle>
            <CardDescription>
              Faça login para acessar o painel de controle
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              {loginForm}
            </TabsContent>
            
            <TabsContent value="register">
              {registerForm}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AuthPageLayout;
