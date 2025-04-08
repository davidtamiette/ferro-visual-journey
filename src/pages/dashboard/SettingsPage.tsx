
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import SiteSettingsForm from '@/components/dashboard/settings/SiteSettingsForm';

const SettingsPage = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // Update profile in the database
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);
        
      if (error) throw error;
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao atualizar suas informações.",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Senhas não coincidem",
        description: "A nova senha e a confirmação devem ser iguais.",
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      // For Supabase, we need to update the password directly
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      // Clear fields after successful update
      setNewPassword('');
      setConfirmPassword('');
      
      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso.",
      });
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast({
        variant: "destructive",
        title: "Erro ao alterar senha",
        description: error.message || "Ocorreu um erro ao alterar sua senha.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Configurações | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas configurações de conta e preferências.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="site">Site</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <form onSubmit={handleUpdateProfile}>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    O email não pode ser alterado.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Função</Label>
                  <Input
                    id="role"
                    value={profile?.role === 'admin' ? 'Administrador' : 'Usuário'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <form onSubmit={handleChangePassword}>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>
                  Atualize sua senha para manter sua conta segura.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? "Alterando..." : "Alterar Senha"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="site" className="space-y-4">
          <SiteSettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
