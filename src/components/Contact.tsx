
import React from 'react';
import { useScrollAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import BusinessHours from './contact/BusinessHours';

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();

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
            <ContactForm />
          </div>
          
          {/* Contact information */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8 animate-fade-in-left" style={{ animationDelay: '400ms' }}>
              <ContactInfo />
            </div>
            
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <BusinessHours />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
