
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/ui/FeatureCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Helmet } from 'react-helmet';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();
  
  const handleRequestQuote = () => {
    navigate('/contact', { state: { subject: 'Orçamento' } });
  };
  
  const detailedServices = [
    {
      id: 'compra-sucatas',
      title: 'Compra de Sucatas',
      subtitle: 'Metais Diversos',
      description: 'Adquirimos sucatas metálicas de diversos tipos, como ferro, alumínio, cobre, bronze, latão, inox, entre outros. Oferecemos avaliação justa e pagamento imediato, com opções de coleta no local.',
      benefits: [
        'Avaliação precisa e transparente',
        'Pagamento imediato ou por transferência',
        'Atendimento a empresas e indústrias',
        'Possibilidade de contratos contínuos'
      ],
      excluded: 'Consulte-nos sobre os tipos específicos de materiais que trabalhamos.'
    },
    {
      id: 'coleta-transporte',
      title: 'Coleta e Transporte',
      subtitle: 'Logística Completa',
      description: 'Realizamos a coleta e transporte dos materiais com agilidade e segurança, utilizando veículos adequados e equipe especializada. Oferecemos serviços especializados no transporte de resíduos de classes I e II, assegurando a destinação correta desses materiais em áreas devidamente licenciadas para transbordo, triagem e aterros.',
      benefits: [
        'Frota própria e especializada',
        'Equipe treinada e uniformizada',
        'Transporte de resíduos classes I e II',
        'Atendimento em toda a região'
      ],
      excluded: 'Operamos com todas as licenças e autorizações necessárias, incluindo registro na ANTT.'
    },
    {
      id: 'descaracterizacao',
      title: 'Descaracterização',
      subtitle: 'Confidencialidade',
      description: 'Serviço especializado para empresas que precisam descaracterizar materiais, garantindo confidencialidade e segurança. Ideal para descarte de equipamentos, produtos defeituosos ou obsoletos.',
      benefits: [
        'Processo seguro e documentado',
        'Certificado de descaracterização',
        'Proteção de marca e imagem',
        'Conformidade com normas ambientais'
      ],
      excluded: 'Garantimos a descaracterização completa e segura dos materiais, com documentação adequada.'
    },
    {
      id: 'gestao-residuos',
      title: 'Gestão de Resíduos',
      subtitle: 'Consultoria Ambiental',
      description: 'Assessoria e consultoria para gestão adequada de resíduos metálicos, com emissão de documentação ambiental necessária. Asseguramos a destinação correta em áreas licenciadas para transbordo, triagem e aterros, sempre em conformidade com a legislação ambiental vigente.',
      benefits: [
        'Consultoria ambiental especializada',
        'Emissão de relatórios e certificados',
        'Planos de gerenciamento de resíduos',
        'Conformidade com legislação ambiental'
      ],
      excluded: 'Todas as nossas operações são realizadas de acordo com as normas e regulamentações ambientais.'
    },
    {
      id: 'reciclagem-metais',
      title: 'Reciclagem de Metais',
      subtitle: 'Processo Sustentável',
      description: 'Processamento completo dos materiais metálicos, direcionando-os para o ciclo de reciclagem e contribuindo para a economia circular. Transformamos resíduos em matéria-prima de forma responsável.',
      benefits: [
        'Redução de impacto ambiental',
        'Economia de recursos naturais',
        'Contribuição para a economia circular',
        'Soluções completas e sustentáveis'
      ],
      excluded: 'Nossa reciclagem segue processos certificados, garantindo o máximo aproveitamento dos materiais.'
    }
  ];
  
  const certifications = [
    'Alvará de localização e funcionamento',
    'Licença ambiental',
    'Licença de transporte',
    'Cadastro no IBAMA',
    'AVCB (Auto de Vistoria do Corpo de Bombeiros)',
    'Registro na ANTT'
  ];
  
  const faq = [
    {
      question: 'Quais tipos de metais vocês compram?',
      answer: 'Compramos diversos tipos de metais, como ferro, alumínio, cobre, bronze, latão, inox, entre outros. Entre em contato conosco para consultar sobre materiais específicos.'
    },
    {
      question: 'Como é feita a avaliação do material?',
      answer: 'A avaliação é realizada por profissionais experientes, que verificam o tipo, quantidade e qualidade do material. Utilizamos balanças calibradas e certificadas para garantir a precisão da pesagem.'
    },
    {
      question: 'Vocês emitem certificado de destinação correta?',
      answer: 'Sim, emitimos toda a documentação necessária para comprovar a destinação ambientalmente correta dos materiais, incluindo certificados e relatórios conforme exigências legais.'
    },
    {
      question: 'Qual a área de atendimento para coleta?',
      answer: 'Atendemos toda a região de Betim e cidades vizinhas em Minas Gerais. Para outras localidades, consulte-nos sobre disponibilidade e condições.'
    },
    {
      question: 'Qual o volume mínimo para coleta?',
      answer: 'O volume mínimo para coleta varia conforme o tipo de material e a distância. Entre em contato conosco para uma avaliação personalizada.'
    },
    {
      question: 'Quais licenças e autorizações vocês possuem?',
      answer: 'Possuímos todas as licenças e autorizações necessárias para nossa operação, incluindo alvará de funcionamento, licença ambiental, licença de transporte, cadastro no IBAMA, AVCB e registro na ANTT, garantindo total conformidade legal.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Serviços | Ferro Velho Toti - Reciclagem de Metais</title>
        <meta name="description" content="Conheça nossos serviços de compra de sucatas metálicas, coleta e transporte, descaracterização, gestão de resíduos, desmontagem industrial e reciclagem." />
        <meta name="keywords" content="reciclagem metais, sucata metálica, coleta de sucata, descaracterização materiais, gestão resíduos, desmontagem industrial, Betim, Minas Gerais" />
        <link rel="canonical" href="https://ferrovelhototi.com.br/servicos" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Reciclagem de Metais",
              "provider": {
                "@type": "Organization",
                "name": "Ferro Velho Toti",
                "url": "https://ferrovelhototi.com.br"
              },
              "description": "Serviços de reciclagem de metais, incluindo compra de sucatas, coleta e transporte, descaracterização, gestão de resíduos e desmontagem industrial.",
              "areaServed": {
                "@type": "City",
                "name": "Betim"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Serviços de Reciclagem",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Compra de Sucatas Metálicas"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Coleta e Transporte"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Descaracterização"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Gestão de Resíduos"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Reciclagem de Metais"
                    }
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section for Services Page */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white dark:from-toti-navy/30 dark:to-black transition-colors duration-700">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="toti-subtitle mb-4 animate-fade-in-down">Nossos Serviços</span>
              <h1 className="toti-heading mb-6 animate-fade-in">Soluções em <span className="text-toti-teal">Reciclagem</span> de Metais</h1>
              <p className="toti-subheading animate-fade-in-up">
                Oferecemos um portfólio completo de serviços para atender às suas necessidades
                de reciclagem e gestão de resíduos metálicos com responsabilidade ambiental.
              </p>
              
              <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <CheckCircle className="h-6 w-6 text-toti-teal dark:text-toti-teal flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700 dark:text-blue-300 text-left">
                  <strong>Certificações e Licenças:</strong> Operamos com todas as autorizações necessárias, 
                  incluindo alvará de localização e funcionamento, licença ambiental, licença de transporte, 
                  cadastro no IBAMA, AVCB e registro na ANTT.
                </p>
              </div>
            </div>
          </div>
          
          {/* Abstract shape */}
          <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-toti-teal/10 rounded-full blur-3xl -z-10"></div>
        </section>
        
        {/* Brief overview of services */}
        <Services />
        
        {/* Certifications Section */}
        <section className="py-16 bg-gray-50 dark:bg-toti-navy/20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="toti-subtitle mb-4">Nossas Credenciais</span>
              <h2 className="toti-heading mb-6">Certificações e <span className="text-toti-teal">Licenças</span></h2>
              <p className="toti-subheading">
                Operamos em total conformidade com as exigências legais e ambientais, garantindo 
                segurança e confiabilidade em todos os nossos serviços.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification, index) => (
                <div key={index} className="glass dark:glass-dark p-6 flex items-center gap-4">
                  <div className="bg-toti-teal/10 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-toti-teal" />
                  </div>
                  <span className="text-lg font-medium text-toti-navy dark:text-white">{certification}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-10 glass dark:glass-dark p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full flex-shrink-0 mt-1">
                  <AlertCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-toti-navy dark:text-white mb-2">Transporte de Resíduos Especializado</h3>
                  <p className="text-toti-slate dark:text-gray-300">
                    Oferecemos serviços especializados no transporte de resíduos de classes I e II, assegurando 
                    a destinação correta desses materiais em áreas devidamente licenciadas para transbordo, 
                    triagem e aterros. Nossa operação segue rigorosamente as normas da ANTT e legislação ambiental.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Detailed Services Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="toti-subtitle mb-4">Detalhamento</span>
              <h2 className="toti-heading mb-6">Conheça <span className="text-toti-teal">Detalhadamente</span> Nossos Serviços</h2>
              <p className="toti-subheading">
                Saiba mais sobre como cada serviço funciona e como podemos atender às necessidades 
                específicas da sua empresa ou projeto.
              </p>
            </div>
            
            <div className="space-y-16">
              {detailedServices.map((service, index) => (
                <div key={service.id} id={service.id} className="scroll-mt-32">
                  <div className="glass dark:glass-dark p-8 rounded-2xl">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/2">
                        <span className="toti-subtitle mb-2">{service.subtitle}</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-toti-navy dark:text-white mb-4">{service.title}</h3>
                        <p className="text-toti-slate dark:text-gray-300 mb-6">
                          {service.description}
                        </p>
                        
                        {service.excluded && (
                          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-toti-teal dark:text-toti-teal flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              {service.excluded}
                            </p>
                          </div>
                        )}
                        
                        <AnimatedButton glass onClick={handleRequestQuote}>
                          <span className="flex items-center">
                            Solicitar Orçamento
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </AnimatedButton>
                      </div>
                      
                      <div className="md:w-1/2">
                        <div className="bg-toti-navy/5 dark:bg-white/5 rounded-xl p-6">
                          <h4 className="text-lg font-bold text-toti-navy dark:text-white mb-4">Benefícios</h4>
                          <ul className="space-y-3">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <svg className="h-5 w-5 text-toti-teal mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-toti-slate dark:text-gray-300">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-24 bg-gray-50 dark:bg-toti-navy/20 transition-colors duration-500">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="toti-subtitle mb-4">Perguntas Frequentes</span>
              <h2 className="toti-heading mb-6">Dúvidas <span className="text-toti-teal">Comuns</span></h2>
              <p className="toti-subheading">
                Respostas para as perguntas mais frequentes sobre nossos serviços de reciclagem de metais.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="glass dark:glass-dark p-8 rounded-2xl divide-y divide-gray-100 dark:divide-gray-700/30">
                {faq.map((item, index) => (
                  <div key={index} className="py-6 first:pt-0 last:pb-0">
                    <h3 className="text-xl font-bold text-toti-navy dark:text-white mb-3">{item.question}</h3>
                    <p className="text-toti-slate dark:text-gray-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
