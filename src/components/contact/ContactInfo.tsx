
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

type ContactInfoItem = {
  icon: React.ReactNode;
  title: string;
  details: string;
};

const ContactInfo = () => {
  const contactInfo: ContactInfoItem[] = [
    {
      icon: <Phone className="h-5 w-5 text-toti-teal" />,
      title: 'Telefone',
      details: '(31) 99946-0492',
    },
    {
      icon: <Mail className="h-5 w-5 text-toti-teal" />,
      title: 'Email',
      details: 'contato@ferrovelhototi.com.br',
    },
    {
      icon: <MapPin className="h-5 w-5 text-toti-teal" />,
      title: 'Endereço',
      details: 'R. do Rosário, 1165 - Angola, Betim - MG',
    },
  ];

  return (
    <div className="space-y-8">
      {contactInfo.map((item, index) => (
        <div key={index} className="flex items-start group">
          <div className="bg-toti-navy/5 dark:bg-white/5 p-3 rounded-xl mr-4 group-hover:bg-toti-teal/10 transition-colors duration-300">
            {item.icon}
          </div>
          <div>
            <h4 className="font-medium text-toti-navy dark:text-white">{item.title}</h4>
            <p className="text-toti-slate dark:text-gray-300">{item.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
