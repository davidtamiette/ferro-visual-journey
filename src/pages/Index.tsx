
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import RecentBlogPosts from '@/components/RecentBlogPosts';
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
        <title>Ferro Velho Toti - Especialistas em Reciclagem de Metais em Betim</title>
        <meta name="description" content="A Ferro Velho Toti é especialista em compra de sucatas metálicas, oferecendo serviços de coleta, transporte e gestão de resíduos com compromisso ambiental em Betim, MG." />
        <meta name="keywords" content="ferro velho, sucata metálica, reciclagem, compra de sucata, metais, Betim, Minas Gerais" />
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
              "telephone": "+5531999460492",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "R. do Rosário, 1165 - Angola",
                "addressLocality": "Betim",
                "addressRegion": "MG",
                "postalCode": "32604-115",
                "addressCountry": "BR"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "17:00"
                }
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
        <RecentBlogPosts />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
