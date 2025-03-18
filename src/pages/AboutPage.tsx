
import React from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Sobre Nós | Ferro Velho Toti - Reciclagem de Metais</title>
        <meta name="description" content="Conheça a história do Ferro Velho Toti, empresa especializada em reciclagem de metais desde 1995. Compromisso com sustentabilidade e excelência no atendimento." />
        <meta name="keywords" content="ferro velho, reciclagem metais, sucata metálica, história empresa reciclagem, sustentabilidade, Betim, Minas Gerais" />
        <link rel="canonical" href="https://ferrovelhototi.com.br/sobre" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ferro Velho Toti",
              "url": "https://ferrovelhototi.com.br",
              "logo": "https://ferrovelhototi.com.br/logo.png",
              "description": "Empresa especializada em reciclagem de metais com mais de 25 anos de experiência.",
              "foundingDate": "1995",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "R. do Rosário, 1165 - Angola",
                "addressLocality": "Betim",
                "addressRegion": "MG",
                "postalCode": "32604-115",
                "addressCountry": "BR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+5531999460492",
                "contactType": "customer service"
              }
            }
          `}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section for About Page */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white dark:from-toti-navy/30 dark:to-black transition-colors duration-700">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="toti-subtitle mb-4 animate-fade-in-down">Nossa História</span>
              <h1 className="toti-heading mb-6 animate-fade-in">Conheça o <span className="text-toti-teal">Ferro Velho Toti</span></h1>
              <p className="toti-subheading animate-fade-in-up">
                Desde 1995, somos referência na reciclagem de metais em Minas Gerais,
                com foco em sustentabilidade e excelência no atendimento.
              </p>
            </div>
          </div>
          
          {/* Abstract shape */}
          <div className="absolute bottom-0 right-1/4 w-1/4 h-1/4 bg-toti-navy/10 dark:bg-toti-teal/10 rounded-full blur-3xl -z-10"></div>
        </section>
        
        <About />
        
        {/* Timeline Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="toti-subtitle mb-4">Nossa Trajetória</span>
              <h2 className="toti-heading mb-6">Mais de <span className="text-toti-teal">25 Anos</span> de Experiência</h2>
              <p className="toti-subheading">
                Conheça os principais marcos da nossa história e como nos tornamos referência 
                no mercado de reciclagem de metais.
              </p>
            </div>
            
            <div className="relative">
              {/* Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-toti-navy/10 dark:bg-white/10"></div>
              
              {/* Timeline items */}
              <div className="space-y-20">
                {/* 1995 */}
                <div className="relative flex items-center">
                  <div className="flex-1 pr-10 md:pr-16 text-right">
                    <div className="glass dark:glass-dark p-6 ml-auto max-w-md animate-fade-in-right">
                      <h3 className="text-2xl font-bold text-toti-navy dark:text-white mb-2">1995</h3>
                      <p className="text-toti-slate dark:text-gray-300">
                        Fundação do Ferro Velho Toti, com o objetivo principal de comercializar sucatas ferrosas, 
                        não ferrosas, containers, tambores e materiais diversos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="bg-toti-teal rounded-full h-5 w-5 animate-pulse"></div>
                  </div>
                  
                  <div className="flex-1 pl-10 md:pl-16">
                    {/* Empty for layout */}
                  </div>
                </div>
                
                {/* 2008 */}
                <div className="relative flex items-center">
                  <div className="flex-1 pr-10 md:pr-16">
                    {/* Empty for layout */}
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="bg-toti-teal rounded-full h-5 w-5 animate-pulse"></div>
                  </div>
                  
                  <div className="flex-1 pl-10 md:pl-16">
                    <div className="glass dark:glass-dark p-6 max-w-md animate-fade-in-left">
                      <h3 className="text-2xl font-bold text-toti-navy dark:text-white mb-2">2008</h3>
                      <p className="text-toti-slate dark:text-gray-300">
                        Expansão das operações, com aquisição de equipamentos modernos e ampliação 
                        do espaço físico para melhor atender nossos clientes.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 2018 */}
                <div className="relative flex items-center">
                  <div className="flex-1 pr-10 md:pr-16 text-right">
                    <div className="glass dark:glass-dark p-6 ml-auto max-w-md animate-fade-in-right">
                      <h3 className="text-2xl font-bold text-toti-navy dark:text-white mb-2">2018</h3>
                      <p className="text-toti-slate dark:text-gray-300">
                        Após anos de atuação no mercado e consolidando vasta experiência na movimentação de sucatas 
                        metálicas e resíduos industriais, a empresa passou por uma importante transformação. 
                        A razão social foi alterada para Transporte e Comércio de Sucatas Toti.
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="bg-toti-teal rounded-full h-5 w-5 animate-pulse"></div>
                  </div>
                  
                  <div className="flex-1 pl-10 md:pl-16">
                    {/* Empty for layout */}
                  </div>
                </div>
                
                {/* 2021 */}
                <div className="relative flex items-center">
                  <div className="flex-1 pr-10 md:pr-16">
                    {/* Empty for layout */}
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="bg-toti-teal rounded-full h-5 w-5 animate-pulse"></div>
                  </div>
                  
                  <div className="flex-1 pl-10 md:pl-16">
                    <div className="glass dark:glass-dark p-6 max-w-md animate-fade-in-left">
                      <h3 className="text-2xl font-bold text-toti-navy dark:text-white mb-2">2021</h3>
                      <p className="text-toti-slate dark:text-gray-300">
                        Ampliação das licenças ambientais e autorizações, incluindo registro na ANTT 
                        e licenças para transporte de resíduos de classes I e II, reforçando 
                        nosso compromisso com a conformidade legal.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Today */}
                <div className="relative flex items-center">
                  <div className="flex-1 pr-10 md:pr-16 text-right">
                    <div className="glass dark:glass-dark p-6 ml-auto max-w-md animate-fade-in-right">
                      <h3 className="text-2xl font-bold text-toti-navy dark:text-white mb-2">Hoje</h3>
                      <p className="text-toti-slate dark:text-gray-300">
                        Referência no mercado de reciclagem de metais, com foco em soluções 
                        sustentáveis e atendimento personalizado para empresas e indústrias de Minas Gerais.
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="bg-toti-teal rounded-full h-5 w-5 animate-pulse"></div>
                  </div>
                  
                  <div className="flex-1 pl-10 md:pl-16">
                    {/* Empty for layout */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission and Vision Section */}
        <section className="py-24 bg-gray-50 dark:bg-toti-navy/20 transition-colors duration-500">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="glass dark:glass-dark p-8 animate-fade-in-right">
                <div className="bg-toti-navy/5 dark:bg-white/5 p-3 rounded-xl mb-4 inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-toti-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-toti-navy dark:text-white mb-4">Nossa Missão</h3>
                <p className="text-toti-slate dark:text-gray-300">
                  Promover a reciclagem de metais com excelência e responsabilidade ambiental, 
                  oferecendo soluções sustentáveis que contribuam para a economia circular 
                  e a preservação do meio ambiente.
                </p>
                <p className="text-toti-slate dark:text-gray-300 mt-4">
                  Atuamos com todas as licenças e certificações necessárias, comprometidos 
                  com as melhores práticas e com a conformidade legal em todas as etapas 
                  de nossos processos.
                </p>
              </div>
              
              <div className="glass dark:glass-dark p-8 animate-fade-in-left">
                <div className="bg-toti-navy/5 dark:bg-white/5 p-3 rounded-xl mb-4 inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-toti-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-toti-navy dark:text-white mb-4">Nossa Visão</h3>
                <p className="text-toti-slate dark:text-gray-300">
                  Ser reconhecida como empresa líder no segmento de reciclagem de metais, 
                  referência em práticas sustentáveis e inovadoras, contribuindo para 
                  um futuro mais limpo e consciente.
                </p>
                <p className="text-toti-slate dark:text-gray-300 mt-4">
                  Buscamos constantemente aprimorar nossos processos e serviços, 
                  investindo em tecnologia e capacitação para oferecer sempre 
                  as melhores soluções aos nossos clientes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
