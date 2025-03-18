
import React from 'react';
import { useSiteConfiguration } from './SiteConfigurationProvider';

const About = () => {
  const { settings, isLoading } = useSiteConfiguration();

  // Valores padrão caso as configurações ainda não tenham sido carregadas
  const aboutTitle = settings?.company_name ? `Sobre o ${settings.company_name}` : 'Sobre o Ferro Velho Toti';
  const aboutContent = settings?.company_description || 'Com mais de 15 anos de experiência, o Ferro Velho Toti se consolidou como referência na reciclagem de metais na região de São Paulo. Focados em sustentabilidade e valorização justa das sucatas, trabalhamos com diversos tipos de metais, oferecendo os melhores preços do mercado. NÃO trabalhamos com sucata automotiva.';

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{aboutTitle}</h2>
          <div className="w-20 h-1 bg-toti-teal mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
            {aboutContent}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-toti-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-toti-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Preços Justos</h3>
              <p className="text-gray-600">Garantimos a melhor valorização da sua sucata metálica no mercado de São Paulo.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-toti-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-toti-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pesagem Transparente</h3>
              <p className="text-gray-600">Utilizamos balanças certificadas e você acompanha todo o processo de pesagem.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-toti-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-toti-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compromisso Ambiental</h3>
              <p className="text-gray-600">Seguimos todas as normas ambientais, contribuindo para a sustentabilidade e economia circular.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
