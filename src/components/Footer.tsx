
import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfiguration } from './SiteConfigurationProvider';

const Footer = () => {
  const { settings } = useSiteConfiguration();

  // Valores padrão
  const companyName = settings?.company_name || 'Ferro Velho Toti';
  const contactEmail = settings?.contact_email || 'contato@ferrovelhometal.com.br';
  const contactPhone = settings?.contact_phone || '(11) 3456-7890';
  const address = settings?.address || 'Av. da Sucata, 123 - São Paulo/SP';

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">{companyName}</h3>
            <p className="mb-4 text-gray-300 max-w-sm">
              Especialistas em reciclagem de metais, oferecendo os melhores preços do mercado com compromisso ambiental.
            </p>
            <p className="text-sm text-gray-400">
              © {currentYear} {companyName}. Todos os direitos reservados.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-toti-teal transition-colors">Início</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-toti-teal transition-colors">Sobre</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-toti-teal transition-colors">Serviços</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-toti-teal transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-toti-teal transition-colors">Contato</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-toti-teal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{address}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-toti-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{contactPhone}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-toti-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
