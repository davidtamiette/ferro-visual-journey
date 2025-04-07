import React, { useState } from 'react';
import AnimatedButton from './ui/AnimatedButton';
import { useScrollAnimation } from '@/lib/animations';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-toti-teal" />,
      title: 'Telefone',
      details: '(31) 99946-0492',
    },
    {
      icon: <Mail className="h-5 w-5 text-toti-teal" />,
      title: 'Email',
      details: 'contato@ferrovelhototi.com.br',
    },
    {
      icon: <MapPin className="h-5 w-5 text-toti-teal" />,
      title: 'Endereço',
      details: 'R. do Rosário, 1165 - Angola, Betim - MG',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with delay
    setTimeout(() => {
      console.log('Form submitted:', formState);
      // Here you would typically send the form data to a server
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
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
    <section id="contact" className="py-24 bg-gray-50 dark:bg-toti-navy/20 transition-colors duration-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-toti-teal/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-toti-navy/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-opacity duration-700",
            isVisible || true ? "opacity-100" : "opacity-0" // Always show content
          )}
        >
          <span className="toti-subtitle mb-4 inline-block relative">
            Contato
            <span className="absolute -bottom-1 left-0 h-0.5 bg-toti-teal/30 w-full transform origin-left transition-transform duration-700" 
              style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}></span>
          </span>
          <h2 className="toti-heading mb-6">Fale <span className="text-toti-teal">Conosco</span></h2>
          <p className="toti-subheading">
            Estamos à disposição para esclarecer dúvidas, fazer orçamentos e proporcionar um atendimento 
            personalizado às suas necessidades.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="glass dark:glass-dark p-8 animate-fade-in-right hover:shadow-elevated transition-all duration-300" style={{ animationDelay: '200ms' }}>
            <h3 className="text-2xl font-bold text-toti-navy dark:text-white mb-6">Envie uma mensagem</h3>
            
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
                  "w-full sm:w-auto relative overflow-hidden",
                  isSubmitting && "pointer-events-none"
                )} 
                glass
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
          </div>
          
          {/* Contact information */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8 animate-fade-in-left" style={{ animationDelay: '400ms' }}>
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="bg-toti-navy/5 dark:bg-white/5 p-3 rounded-xl mr-4 group-hover:bg-toti-teal/10 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-toti-navy dark:text-white">{item.title}</h4>
                    <p className="text-toti-slate dark:text-gray-300">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="glass dark:glass-dark bg-toti-navy dark:bg-toti-navy/70 p-8 text-white transform hover:scale-[1.02] transition-transform duration-300 hover:shadow-elevated">
                <h3 className="text-xl font-bold mb-4">Horário de Atendimento</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Segunda - Sexta:</span>
                    <span>08:00 - 18:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sábados:</span>
                    <span>08:00 - 12:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Domingos e Feriados:</span>
                    <span>Fechado</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
