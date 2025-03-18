
import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfiguration } from './SiteConfigurationProvider';
import AnimatedButton from './ui/AnimatedButton';

const Hero = () => {
  const { settings, isLoading } = useSiteConfiguration();

  // Definir valores padrão que serão usados caso o carregamento esteja em andamento
  // ou se as configurações ainda não foram carregadas
  const heroTitle = settings?.company_description || 'Especialistas em Reciclagem de Metais em São Paulo';
  const heroSubtitle = settings?.company_description || 'Compra de sucatas metálicas com compromisso ambiental e melhores preços do mercado';
  const buttonText = 'Solicite uma Avaliação';

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/hero-bg.jpg')"
      }}
    >
      <div className="container mx-auto px-6 py-32 md:py-48 text-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
          {heroSubtitle}
        </p>
        <AnimatedButton
          as={Link}
          to="/contact"
          variant="default"
          className="bg-toti-teal text-white hover:bg-toti-teal-dark px-8 py-4 rounded-md text-lg font-medium transition-all"
        >
          {buttonText}
        </AnimatedButton>
      </div>
    </section>
  );
};

export default Hero;
