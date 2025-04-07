
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthPageLayoutProps {
  loginForm: React.ReactNode;
  registerForm: React.ReactNode | null;
  loginOnly?: boolean;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ loginForm, registerForm, loginOnly = false }) => {
  const [activeTab, setActiveTab] = useState<string>("login");
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-toti-navy to-toti-teal/20 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img
              src="/placeholder.svg"
              alt="Ferro Velho Toti"
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold mt-4">Área Administrativa</h1>
          <p className="text-muted-foreground">
            {loginOnly 
              ? "Entre com sua conta para acessar o painel" 
              : "Entre ou crie sua conta para acessar o painel"}
          </p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            {!loginOnly && (
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Cadastro</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </CardHeader>
          
          {!loginOnly ? (
            // Versão com abas se registerForm existir
            <>
              <TabsContent value="login" className="m-0">
                {loginForm}
              </TabsContent>
              
              <TabsContent value="register" className="m-0">
                {registerForm}
              </TabsContent>
              
              <CardFooter className="flex justify-center border-t pt-4 text-sm text-muted-foreground">
                {activeTab === "login" ? (
                  <p>
                    Não tem uma conta?{' '}
                    <button 
                      onClick={() => setActiveTab("register")} 
                      className="underline text-toti-teal hover:text-toti-teal/80"
                    >
                      Cadastre-se
                    </button>
                  </p>
                ) : (
                  <p>
                    Já tem uma conta?{' '}
                    <button 
                      onClick={() => setActiveTab("login")} 
                      className="underline text-toti-teal hover:text-toti-teal/80"
                    >
                      Faça login
                    </button>
                  </p>
                )}
              </CardFooter>
            </>
          ) : (
            // Versão simplificada só com login
            <>
              {loginForm}
              <CardFooter className="flex justify-center border-t pt-4 text-sm text-muted-foreground">
                <p>Para obter acesso, entre em contato com o administrador</p>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AuthPageLayout;
