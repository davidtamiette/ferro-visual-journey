import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import RecentBlogPosts from '@/components/RecentBlogPosts';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
              top: element.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'services', 'blog', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.15;
  
  return (
    <div className={cn(
      "flex flex-col min-h-screen overflow-hidden transition-opacity duration-1000",
      loaded ? "opacity-100" : "opacity-0"
    )}>
      <Helmet>
        <title>Ferro Velho Toti - Especialistas em Reciclagem de Metais em Betim</title>
        <meta name="description" content="A Ferro Velho Toti é especialista em compra de sucatas metálicas, oferecendo serviços de coleta, transporte e gestão de resíduos com compromisso ambiental em Betim, MG." />
        <meta name="keywords" content="ferro velho, sucata metálica, reciclagem, compra de sucata, metais, Betim, Minas Gerais" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute w-4 h-4 bg-toti-teal/20 rounded-full top-1/4 left-1/4 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute w-6 h-6 bg-toti-navy/10 rounded-full top-1/3 right-1/4 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute w-3 h-3 bg-toti-teal/15 rounded-full bottom-1/4 right-1/3 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute w-5 h-5 bg-toti-navy/10 rounded-full bottom-1/3 left-1/3 animate-float" style={{ animationDelay: '4.5s' }}></div>
        
        <div 
          className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-toti-teal/10 to-transparent blur-3xl"
          style={{ 
            top: `calc(20% + ${parallaxOffset * 0.3}px)`, 
            right: `calc(10% + ${parallaxOffset * -0.2}px)` 
          }}
        ></div>
        <div 
          className="absolute w-[35vw] h-[35vw] rounded-full bg-gradient-to-tl from-toti-navy/10 to-transparent blur-3xl"
          style={{ 
            bottom: `calc(15% + ${parallaxOffset * -0.4}px)`, 
            left: `calc(5% + ${parallaxOffset * 0.1}px)` 
          }}
        ></div>
      </div>
      
      <Navbar activeSection={activeSection} />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="blog">
          <RecentBlogPosts />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
