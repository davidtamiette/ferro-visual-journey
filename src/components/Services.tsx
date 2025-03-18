
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
      delay: 100
    },
    {
      title: 'Coleta e Transporte',
      subtitle: 'Logística Completa',
      description: 'Realizamos a coleta e transporte dos materiais com agilidade e segurança, utilizando veículos adequados e equipe especializada.',
      delay: 200
    },
    {
      title: 'Descaracterização',
      subtitle: 'Confidencialidade',
      description: 'Serviço especializado para empresas que precisam descaracterizar materiais, garantindo confidencialidade e segurança.',
      delay: 300
    },
    {
      title: 'Gestão de Resíduos',
      subtitle: 'Consultoria Ambiental',
      description: 'Assessoria e consultoria para gestão adequada de resíduos metálicos, com emissão de documentação ambiental necessária.',
      delay: 400
    },
    {
      title: 'Desmontagem Industrial',
      subtitle: 'Equipamentos Especializados',
      description: 'Desmontagem e remoção de estruturas metálicas, máquinas e equipamentos industriais com segurança e eficiência.',
      delay: 500
    },
    {
      title: 'Reciclagem de Metais',
      subtitle: 'Processo Sustentável',
      description: 'Processamento completo dos materiais metálicos, direcionando-os para o ciclo de reciclagem e contribuindo para a economia circular.',
      delay: 600
    }
  ];

  return (
    <section id="services" className="py-24 dark:bg-toti-navy/10">
      <div className="container mx-auto px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 opacity-0",
            isVisible && "animate-fade-in"
          )}
        >
          <span className="toti-subtitle mb-4">Nossos Serviços</span>
          <h2 className="toti-heading mb-6">Soluções <span className="text-toti-teal">Completas</span> em Reciclagem</h2>
          <p className="toti-subheading">
            Oferecemos um portfólio abrangente de serviços para atender às suas necessidades de reciclagem e 
            gestão de resíduos metálicos com responsabilidade ambiental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FeatureCard 
              key={index}
              title={service.title}
              subtitle={service.subtitle}
              delay={service.delay}
              className="h-full flex flex-col"
              glass={true}
            >
              <p className="text-toti-slate dark:text-gray-300 mb-6 flex-grow">{service.description}</p>
              <AnimatedButton variant="outline" size="sm" className="self-start mt-auto">
                Saiba Mais
              </AnimatedButton>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
