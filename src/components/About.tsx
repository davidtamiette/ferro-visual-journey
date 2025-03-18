
import React from 'react';
import FeatureCard from './ui/FeatureCard';
import { useScrollAnimation } from '@/lib/animations';
import { Clock, Shield, Award, Recycle } from 'lucide-react';
import { cn } from '@/lib/utils';

const About = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation();
  
  const valueProps = [
    {
      icon: <Clock className="h-8 w-8 text-toti-teal" />,
      title: 'Agilidade',
      description: 'Garantimos rapidez desde o orçamento até a retirada do material.'
    },
    {
      icon: <Shield className="h-8 w-8 text-toti-teal" />,
      title: 'Segurança',
      description: 'Documentação e procedimentos em conformidade com as normas ambientais.'
    },
    {
      icon: <Award className="h-8 w-8 text-toti-teal" />,
      title: 'Excelência',
      description: 'Valorizamos ao máximo o material oferecendo os melhores preços do mercado.'
    },
    {
      icon: <Recycle className="h-8 w-8 text-toti-teal" />,
      title: 'Sustentabilidade',
      description: 'Promovemos a economia circular e a preservação do meio ambiente.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-toti-navy/20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left column - About text */}
          <div className="lg:w-1/2">
            <div 
              ref={ref as React.RefObject<HTMLDivElement>}
              className={cn(
                "transition-opacity duration-700",
                isVisible || true ? "opacity-100" : "opacity-0" // Always show content
              )}
            >
              <span className="toti-subtitle mb-4 inline-block relative">
                Sobre Nós
                <span className="absolute bottom-0 left-0 h-0.5 bg-toti-teal/30 w-full transform origin-left transition-transform duration-700 scale-x-0" 
                  style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}></span>
              </span>
              <h2 className="toti-heading mb-6">Expertise e <span className="text-toti-teal">Compromisso</span></h2>
              <p className="toti-subheading mb-8">
                Desde 2001, o Ferro Velho Toti tem sido referência na compra e venda de sucatas metálicas, 
                oferecendo soluções sustentáveis para empresas e indústrias.
              </p>
              
              <p className="text-toti-slate dark:text-gray-300 mb-6">
                Nossa equipe altamente qualificada trabalha com compromisso e transparência, 
                garantindo que todo o processo de reciclagem seja realizado com responsabilidade 
                ambiental e eficiência operacional.
              </p>
              
              <p className="text-toti-slate dark:text-gray-300">
                Atendemos indústrias, construções civis, condomínios e residências com a mesma 
                dedicação, adaptando nossos serviços às necessidades específicas de cada cliente.
              </p>
            </div>
          </div>
          
          {/* Right column - Value props */}
          <div 
            ref={ref2 as React.RefObject<HTMLDivElement>}
            className={cn(
              "lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-700",
              isVisible2 || true ? "opacity-100" : "opacity-0" // Always show content
            )}
          >
            {valueProps.map((prop, index) => (
              <FeatureCard 
                key={prop.title} 
                className="flex flex-col items-start" 
                delay={index * 100}
                animationDirection="none"
                glass={true}
              >
                <div className="bg-toti-navy/5 dark:bg-white/5 p-3 rounded-xl mb-4">
                  {prop.icon}
                </div>
                <h3 className="text-lg font-bold text-toti-navy dark:text-white mb-2">{prop.title}</h3>
                <p className="text-toti-slate dark:text-gray-300">{prop.description}</p>
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
