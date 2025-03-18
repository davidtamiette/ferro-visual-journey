
import React, { useEffect, useState } from 'react';
import AnimatedButton from './ui/AnimatedButton';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollIndicator, setScrollIndicator] = useState(true);

  useEffect(() => {
    // Trigger animations after component mount
    setIsLoaded(true);
    
    // Hide scroll indicator when user scrolls
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-6"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10"></div>
      <div 
        className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-10 -z-10"
      ></div>
      
      {/* Abstract shape */}
      <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-toti-teal/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-toti-navy/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Subtitle */}
          <span 
            className={cn(
              "toti-subtitle mb-4 opacity-0", 
              isLoaded && "animate-fade-in-down"
            )}
            style={{ animationDelay: "200ms" }}
          >
            Especialistas em Reciclagem de Metais
          </span>
          
          {/* Main heading */}
          <h1 
            className={cn(
              "toti-heading mb-6 opacity-0", 
              isLoaded && "animate-fade-in"
            )}
            style={{ animationDelay: "400ms" }}
          >
            Transformando Metais em <span className="text-toti-teal">Novas Oportunidades</span>
          </h1>
          
          {/* Subheading */}
          <p 
            className={cn(
              "toti-subheading mb-8 opacity-0", 
              isLoaded && "animate-fade-in-up"
            )}
            style={{ animationDelay: "600ms" }}
          >
            Com mais de 20 anos de experiência, somos referência em compra e venda de sucatas metálicas com compromisso ambiental e atendimento personalizado.
          </p>
          
          {/* CTA Buttons */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4 mt-2 opacity-0", 
              isLoaded && "animate-fade-in-up"
            )}
            style={{ animationDelay: "800ms" }}
          >
            <AnimatedButton>Solicitar Orçamento</AnimatedButton>
            <AnimatedButton variant="outline">Conheça Nossos Serviços</AnimatedButton>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500",
          scrollIndicator ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-xs text-toti-navy/60 mb-2">Rolar para mais</span>
        <ArrowDown className="text-toti-navy/60 animate-bounce h-5 w-5" />
      </div>
    </section>
  );
};

export default Hero;
