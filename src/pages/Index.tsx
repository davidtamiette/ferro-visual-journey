
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';

const Index = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href && target.href.includes('#')) {
        const hash = target.href.split('#')[1];
        if (hash) {
          const element = document.getElementById(hash);
          if (element) {
            e.preventDefault();
            window.scrollTo({
              top: element.offsetTop - 80, // Offset for fixed header
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Ferro Velho Toti - Especialistas em Reciclagem de Metais em São Paulo</title>
        <meta name="description" content="O Ferro Velho Toti é especialista em compra de sucatas metálicas, oferecendo serviços de coleta, transporte e gestão de resíduos com compromisso ambiental. Não trabalhamos com sucata automotiva." />
        <meta name="keywords" content="ferro velho, sucata metálica, reciclagem, compra de sucata, metais, São Paulo" />
        <link rel="canonical" href="https://ferrovelhototi.com.br/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Ferro Velho Toti",
              "image": "https://ferrovelhototi.com.br/logo.png",
              "description": "Especialistas em reciclagem de metais, oferecendo serviços de compra de sucatas, coleta, transporte e gestão de resíduos.",
              "@id": "https://ferrovelhototi.com.br",
              "url": "https://ferrovelhototi.com.br",
              "telephone": "+551140351413",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Antônio Blasques Romeiro, 120",
                "addressLocality": "São Paulo",
                "addressRegion": "SP",
                "postalCode": "04763-030",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -23.611326,
                "longitude": -46.707419
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "08:00",
                  "closes": "12:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/ferrovelhototi",
                "https://www.instagram.com/ferrovelhototi"
              ]
            }
          `}
        </script>
      </Helmet>
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
