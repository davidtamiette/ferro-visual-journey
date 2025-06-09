
import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-toti-navy text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white selection:bg-toti-teal/70 selection:text-toti-navy">Ferro Velho <span className="text-toti-teal">Toti</span></h3>
            <p className="text-white mb-6 max-w-xs selection:bg-toti-teal/70 selection:text-toti-navy">
              Especialistas em reciclagem de metais, oferecendo soluções sustentáveis para 
              empresas e indústrias desde 1995.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:comercial@ferrovelhototi.com.br" className="text-white hover:text-toti-teal transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white selection:bg-toti-teal/70 selection:text-toti-navy">Links Rápidos</h4>
            <nav className="space-y-3">
              <a href="/" className="block text-white hover:text-toti-teal transition-colors selection:bg-toti-teal/70 selection:text-toti-navy">Home</a>
              <a href="/about" className="block text-white hover:text-toti-teal transition-colors selection:bg-toti-teal/70 selection:text-toti-navy">Sobre Nós</a>
              <a href="/services" className="block text-white hover:text-toti-teal transition-colors selection:bg-toti-teal/70 selection:text-toti-navy">Serviços</a>
              <a href="/contact" className="block text-white hover:text-toti-teal transition-colors selection:bg-toti-teal/70 selection:text-toti-navy">Contato</a>
              <a href="/blog" className="block text-white hover:text-toti-teal transition-colors selection:bg-toti-teal/70 selection:text-toti-navy">Blog</a>
              <a href="/privacidade" className="block text-white hover:text-toti-teal transition-colors selection:bg-toti-teal/70 selection:text-toti-navy">Política de Privacidade</a>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white selection:bg-toti-teal/70 selection:text-toti-navy">Contato</h4>
            <address className="not-italic space-y-3 text-white">
              <p className="selection:bg-toti-teal/70 selection:text-toti-navy">R. do Rosário, 1165 - Angola</p>
              <p className="selection:bg-toti-teal/70 selection:text-toti-navy">Betim - MG</p>
              <p className="selection:bg-toti-teal/70 selection:text-toti-navy">CEP: 32604-115</p>
              <p className="pt-2 selection:bg-toti-teal/70 selection:text-toti-navy">Telefone: (31) 3532-5072</p>
              <p className="selection:bg-toti-teal/70 selection:text-toti-navy">Email: comercial@ferrovelhototi.com.br</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm selection:bg-toti-teal/70 selection:text-toti-navy">
            &copy; {currentYear} Ferro Velho Toti. Todos os direitos reservados.
          </p>
          <p className="text-white text-sm mt-4 md:mt-0 selection:bg-toti-teal/70 selection:text-toti-navy">
            Desenvolvido por <a href="https://cognitivaai.com.br" target="_blank" rel="noopener noreferrer" className="text-toti-teal hover:underline selection:bg-toti-teal/70 selection:text-toti-navy">Cognitiva AI</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
