
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

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-toti-teal" />,
      title: 'Telefone',
      details: '(11) 4035-1413',
    },
    {
      icon: <Mail className="h-5 w-5 text-toti-teal" />,
      title: 'Email',
      details: 'contato@ferrovelhototi.com.br',
    },
    {
      icon: <MapPin className="h-5 w-5 text-toti-teal" />,
      title: 'Endereço',
      details: 'Rua Antônio Blasques Romeiro, 120 - Socorro, São Paulo',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // Here you would typically send the form data to a server
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormState({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 opacity-0",
            isVisible && "animate-fade-in"
          )}
        >
          <span className="toti-subtitle mb-4">Contato</span>
          <h2 className="toti-heading mb-6">Fale <span className="text-toti-teal">Conosco</span></h2>
          <p className="toti-subheading">
            Estamos à disposição para esclarecer dúvidas, fazer orçamentos e proporcionar um atendimento 
            personalizado às suas necessidades.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="bg-white rounded-2xl shadow-subtle p-8 animate-fade-in-right" style={{ animationDelay: '200ms' }}>
            <h3 className="text-2xl font-bold text-toti-navy mb-6">Envie uma mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-toti-slate mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  className="toti-input"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-toti-slate mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="toti-input"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-toti-slate mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="toti-input"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-toti-slate mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="toti-input resize-none"
                  placeholder="Como podemos ajudar?"
                />
              </div>
              
              <AnimatedButton type="submit" className="w-full sm:w-auto">
                <span className="flex items-center">
                  Enviar mensagem
                  <Send className="ml-2 h-4 w-4" />
                </span>
              </AnimatedButton>
            </form>
          </div>
          
          {/* Contact information */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8 animate-fade-in-left" style={{ animationDelay: '400ms' }}>
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-toti-navy/5 p-3 rounded-xl mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-toti-navy">{item.title}</h4>
                    <p className="text-toti-slate">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="bg-toti-navy rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Horário de Atendimento</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Segunda - Sexta:</span>
                    <span>8:00 - 18:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sábados:</span>
                    <span>8:00 - 12:00</span>
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
