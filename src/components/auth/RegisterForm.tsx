
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CardContent, CardFooter } from '@/components/ui/card';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!fullName) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, insira seu nome completo.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Por favor, verifique seu email para confirmar o cadastro.",
      });
      setLoading(false);
      onRegisterSuccess();
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium">Nome Completo</label>
          <Input
            id="fullName"
            placeholder="Seu Nome Completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="signupEmail" className="text-sm font-medium">Email</label>
          <Input
            id="signupEmail"
            type="email"
            placeholder="seunome@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="signupPassword" className="text-sm font-medium">Senha</label>
          <Input
            id="signupPassword"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
      </CardContent>
      
      <CardFooter>
        <AnimatedButton
          type="submit"
          className="w-full"
          variant="secondary"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </AnimatedButton>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
