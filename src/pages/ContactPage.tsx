
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Helmet } from 'react-helmet';
import { Phone, Mail, MapPin, Clock, Send, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      errors.name = "Nome é obrigatório";
    }
    
    if (!formState.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email inválido";
    }
    
    if (!formState.subject.trim()) {
      errors.subject = "Assunto é obrigatório";
    }
    
    if (!formState.message.trim()) {
      errors.message = "Mensagem é obrigatória";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formState);
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
        variant: "default"
      });
      
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Contato | Ferro Velho Toti - Reciclagem de Metais</title>
        <meta name="description" content="Entre em contato com o Ferro Velho Toti para orçamentos, dúvidas ou informações sobre nossos serviços de reciclagem de metais. Atendimento personalizado e ágil." />
        <meta name="keywords" content="contato ferro velho, reciclagem metais contato, orçamento sucata, coleta sucata, São Paulo" />
        <link rel="canonical" href="https://ferrovelhototi.com.br/contato" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "url": "https://ferrovelhototi.com.br/contato",
              "mainEntity": {
                "@type": "Organization",
                "name": "Ferro Velho Toti",
                "telephone": "+551140351413",
                "email": "contato@ferrovelhototi.com.br",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Rua Antônio Blasques Romeiro, 120",
                  "addressLocality": "São Paulo",
                  "addressRegion": "SP",
                  "postalCode": "04763-030",
                  "addressCountry": "BR"
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
                ]
              }
            }
          `}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section for Contact Page */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white dark:from-toti-navy/30 dark:to-black transition-colors duration-700">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="toti-subtitle mb-4 animate-fade-in-down">Contato</span>
              <h1 className="toti-heading mb-6 animate-fade-in">Fale <span className="text-toti-teal">Conosco</span></h1>
              <p className="toti-subheading animate-fade-in-up">
                Estamos à disposição para esclarecer dúvidas, fazer orçamentos e proporcionar um 
                atendimento personalizado às suas necessidades.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <a href="tel:+551140351413" className="flex items-center gap-2 bg-white dark:bg-toti-navy/50 px-4 py-2 rounded-lg text-toti-navy dark:text-white hover:bg-toti-navy/5 dark:hover:bg-toti-navy/70 transition-colors">
                  <Phone className="h-5 w-5 text-toti-teal" />
                  <span>(11) 4035-1413</span>
                </a>
                
                <a href="mailto:contato@ferrovelhototi.com.br" className="flex items-center gap-2 bg-white dark:bg-toti-navy/50 px-4 py-2 rounded-lg text-toti-navy dark:text-white hover:bg-toti-navy/5 dark:hover:bg-toti-navy/70 transition-colors">
                  <Mail className="h-5 w-5 text-toti-teal" />
                  <span>contato@ferrovelhototi.com.br</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Abstract shape */}
          <div className="absolute top-0 right-1/4 w-1/4 h-1/4 bg-toti-teal/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-1/3 w-1/5 h-1/5 bg-toti-navy/10 rounded-full blur-3xl -z-10"></div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact form */}
              <div className="glass dark:glass-dark p-8 animate-fade-in-right">
                <h2 className="text-2xl font-bold text-toti-navy dark:text-white mb-6">Envie uma mensagem</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-toti-slate dark:text-gray-300 mb-1">
                      Nome completo<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className={`toti-input ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
                      placeholder="Seu nome"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-toti-slate dark:text-gray-300 mb-1">
                        Email<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className={`toti-input ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
                        placeholder="seu@email.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-toti-slate dark:text-gray-300 mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="toti-input"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-toti-slate dark:text-gray-300 mb-1">
                      Assunto<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      className={`toti-input ${formErrors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
                    >
                      <option value="" disabled>Selecione um assunto</option>
                      <option value="Orçamento">Solicitar orçamento</option>
                      <option value="Coleta">Agendar coleta</option>
                      <option value="Informações">Solicitar informações</option>
                      <option value="Parceria">Proposta de parceria</option>
                      <option value="Outro">Outro assunto</option>
                    </select>
                    {formErrors.subject && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-toti-slate dark:text-gray-300 mb-1">
                      Mensagem<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`toti-input resize-none ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
                      placeholder="Como podemos ajudar?"
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4">
                    <AlertCircle className="h-5 w-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>Nota:</strong> O Ferro Velho Toti não trabalha com sucata automotiva. 
                      Por favor, considere isso ao solicitar nossos serviços.
                    </p>
                  </div>
                  
                  <AnimatedButton type="submit" className="w-full sm:w-auto" glass disabled={isSubmitting}>
                    <span className="flex items-center">
                      {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  </AnimatedButton>
                </form>
              </div>
              
              {/* Contact information and map */}
              <div className="flex flex-col">
                <div className="glass dark:glass-dark p-8 mb-8 animate-fade-in-left">
                  <h2 className="text-2xl font-bold text-toti-navy dark:text-white mb-6">Informações de Contato</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-toti-navy/5 dark:bg-white/5 p-3 rounded-xl mr-4">
                        <Phone className="h-5 w-5 text-toti-teal" />
                      </div>
                      <div>
                        <h3 className="font-medium text-toti-navy dark:text-white">Telefone</h3>
                        <p className="text-toti-slate dark:text-gray-300">(11) 4035-1413</p>
                        <p className="text-toti-slate dark:text-gray-300">(11) 98765-4321</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-toti-navy/5 dark:bg-white/5 p-3 rounded-xl mr-4">
                        <Mail className="h-5 w-5 text-toti-teal" />
                      </div>
                      <div>
                        <h3 className="font-medium text-toti-navy dark:text-white">Email</h3>
                        <p className="text-toti-slate dark:text-gray-300">contato@ferrovelhototi.com.br</p>
                        <p className="text-toti-slate dark:text-gray-300">comercial@ferrovelhototi.com.br</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-toti-navy/5 dark:bg-white/5 p-3 rounded-xl mr-4">
                        <MapPin className="h-5 w-5 text-toti-teal" />
                      </div>
                      <div>
                        <h3 className="font-medium text-toti-navy dark:text-white">Endereço</h3>
                        <p className="text-toti-slate dark:text-gray-300">
                          Rua Antônio Blasques Romeiro, 120 - Socorro
                        </p>
                        <p className="text-toti-slate dark:text-gray-300">
                          São Paulo - SP, 04763-030
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-toti-navy/5 dark:bg-white/5 p-3 rounded-xl mr-4">
                        <Clock className="h-5 w-5 text-toti-teal" />
                      </div>
                      <div>
                        <h3 className="font-medium text-toti-navy dark:text-white">Horário de Atendimento</h3>
                        <p className="text-toti-slate dark:text-gray-300">Segunda - Sexta: 8:00 - 18:00</p>
                        <p className="text-toti-slate dark:text-gray-300">Sábados: 8:00 - 12:00</p>
                        <p className="text-toti-slate dark:text-gray-300">Domingos e Feriados: Fechado</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Google Maps embed */}
                <div className="flex-grow glass dark:glass-dark p-4 animate-fade-in-up h-80 md:h-96">
                  <div className="h-full w-full rounded-xl overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.7731866806135!2d-46.7074188!3d-23.6113257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5712e8f8f0c1%3A0x52a13bbe5a7bc34a!2sR.%20Ant%C3%B4nio%20Blasques%20Romeiro%2C%20120%20-%20Jardim%20Sao%20Luis%20(Zona%20Sul)%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004763-030!5e0!3m2!1sen!2sbr!4v1673963200274!5m2!1sen!2sbr" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização Ferro Velho Toti"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
