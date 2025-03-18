
import React from 'react';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-toti-navy text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Ferro Velho <span className="text-toti-teal">Toti</span></h3>
            <p className="text-white/70 mb-6 max-w-xs">
              Especialistas em reciclagem de metais, oferecendo soluções sustentáveis para 
              empresas e indústrias desde 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-toti-teal transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-toti-teal transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-toti-teal transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contato@ferrovelhototi.com.br" className="text-white/70 hover:text-toti-teal transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Links Rápidos</h4>
            <nav className="space-y-3">
              <a href="/" className="block text-white/70 hover:text-toti-teal transition-colors">Home</a>
              <a href="/sobre" className="block text-white/70 hover:text-toti-teal transition-colors">Sobre Nós</a>
              <a href="/servicos" className="block text-white/70 hover:text-toti-teal transition-colors">Serviços</a>
              <a href="/contato" className="block text-white/70 hover:text-toti-teal transition-colors">Contato</a>
              <a href="/blog" className="block text-white/70 hover:text-toti-teal transition-colors">Blog</a>
              <a href="/privacidade" className="block text-white/70 hover:text-toti-teal transition-colors">Política de Privacidade</a>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-6">Contato</h4>
            <address className="not-italic space-y-3 text-white/70">
              <p>R. do Rosário, 1165 - Angola</p>
              <p>Betim - MG</p>
              <p>CEP: 32604-115</p>
              <p className="pt-2">Telefone: (31) 99946-0492</p>
              <p>Email: contato@ferrovelhototi.com.br</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {currentYear} Ferro Velho Toti. Todos os direitos reservados.
          </p>
          <p className="text-white/60 text-sm mt-4 md:mt-0">
            Desenvolvido com ♥ por <a href="#" className="text-toti-teal hover:underline">Lovable</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
