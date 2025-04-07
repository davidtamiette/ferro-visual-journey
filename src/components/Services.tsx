
import React from 'react';
import FeatureCard from './ui/FeatureCard';
import AnimatedButton from './ui/AnimatedButton';
import { useScrollAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';

const Services = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const services = [
    {
      title: 'Compra de Sucatas',
      subtitle: 'Metais Diversos',
      description: 'Compramos diversos tipos de sucatas metálicas como ferro, alumínio, cobre, bronze, latão e outros, com avaliação justa e pagamento imediato.',
      delay: 100,
      icon: '🔧'
    },
    {
      title: 'Coleta e Transporte',
      subtitle: 'Logística Completa',
      description: 'Realizamos a coleta e transporte dos materiais com agilidade e segurança, utilizando veículos adequados e equipe especializada. Prestamos serviços especializados no transporte de resíduos classes I e II.',
      delay: 200,
      icon: '🚚'
    },
    {
      title: 'Descaracterização',
      subtitle: 'Confidencialidade',
      description: 'Serviço especializado para empresas que precisam descaracterizar materiais, garantindo confidencialidade e segurança.',
      delay: 300,
      icon: '🔒'
    },
    {
      title: 'Gestão de Resíduos',
      subtitle: 'Consultoria Ambiental',
      description: 'Assessoria e consultoria para gestão adequada de resíduos metálicos, com emissão de documentação ambiental necessária. Garantimos a destinação correta em áreas licenciadas para transbordo, triagem e aterros.',
      delay: 400,
      icon: '♻️'
    },
    {
      title: 'Reciclagem de Metais',
      subtitle: 'Processo Sustentável',
      description: 'Processamento completo dos materiais metálicos, direcionando-os para o ciclo de reciclagem e contribuindo para a economia circular.',
      delay: 500,
      icon: '🌱'
    }
  ];

  return (
    <section id="services" className="py-24 dark:bg-toti-navy/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-toti-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-toti-navy/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-opacity duration-700",
            isVisible || true ? "opacity-100" : "opacity-0" // Always show content
          )}
        >
          <span className="toti-subtitle mb-4 inline-block relative">
            Nossos Serviços
            <span className="absolute -bottom-1 left-0 h-0.5 bg-toti-teal/30 w-full transform origin-left transition-transform duration-700" 
              style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}></span>
          </span>
          <h2 className="toti-heading mb-6">Soluções <span className="text-toti-teal">Completas</span> em Reciclagem</h2>
          <p className="toti-subheading mb-8">
            Oferecemos um portfólio abrangente de serviços para atender às suas necessidades de reciclagem e 
            gestão de resíduos metálicos com responsabilidade ambiental.
          </p>
          <p className="text-toti-slate dark:text-gray-300 text-base">
            Operamos com todas as autorizações e certificações necessárias, incluindo alvará de localização e funcionamento, 
            licença ambiental, licença de transporte, cadastro no IBAMA, AVCB e registro na ANTT. 
            Esses atributos reafirmam nosso compromisso com a conformidade legal e a proteção ambiental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FeatureCard 
              key={index}
              title={service.title}
              subtitle={service.subtitle}
              delay={service.delay}
              className="h-full flex flex-col group hover:scale-[1.02] transition-all duration-300"
              glass={true}
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3 transition-transform duration-300 group-hover:translate-x-2">
                  {service.icon}
                </div>
              </div>
              <p className="text-toti-slate dark:text-gray-300 mb-6 flex-grow">{service.description}</p>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
