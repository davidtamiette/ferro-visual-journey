
import React, { useState } from 'react';
import AnimatedButton from '../ui/AnimatedButton';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form inputs
    if (!formState.name.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe seu nome.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!formState.email.trim() || !/\S+@\S+\.\S+/.test(formState.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, informe um email válido.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!formState.message.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, escreva sua mensagem.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate form submission with delay
    setTimeout(() => {
      console.log('Form submitted:', formState);
      // Here you would typically send the form data to a server
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
        variant: "default"
      });
      setFormState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-toti-slate dark:text-gray-300 mb-1">
          Nome completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          required
          className="toti-input focus:scale-[1.01] transition-transform"
          placeholder="Seu nome"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-toti-slate dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
            className="toti-input focus:scale-[1.01] transition-transform"
            placeholder="seu@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-toti-slate dark:text-gray-300 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formState.phone}
            onChange={handleInputChange}
            className="toti-input focus:scale-[1.01] transition-transform"
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-toti-slate dark:text-gray-300 mb-1">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleInputChange}
          required
          rows={5}
          className="toti-input resize-none focus:scale-[1.01] transition-transform"
          placeholder="Como podemos ajudar?"
        />
      </div>
      
      <AnimatedButton 
        type="submit" 
        className={cn(
          "w-full sm:w-auto relative overflow-hidden bg-toti-teal text-white hover:bg-toti-teal/90",
          isSubmitting && "pointer-events-none"
        )} 
      >
        <span className={cn(
          "flex items-center transition-transform duration-300",
          isSubmitting && "translate-y-10"
        )}>
          Enviar mensagem
          <Send className="ml-2 h-4 w-4" />
        </span>
        
        {isSubmitting && (
          <span className="absolute inset-0 flex items-center justify-center text-white">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
        )}
      </AnimatedButton>
    </form>
  );
};

export default ContactForm;
