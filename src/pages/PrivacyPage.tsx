
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Política de Privacidade | Ferro Velho Toti</title>
        <meta name="description" content="Política de Privacidade da Ferro Velho Toti - Saiba como utilizamos seus dados e protegemos sua privacidade." />
      </Helmet>

      <Navbar activeSection="privacy" />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg mb-6">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Introdução</h2>
              <p>
                A Ferro Velho Toti está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais quando você visita nosso site ou utiliza nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Coleta de Informações</h2>
              <p>
                Podemos coletar os seguintes tipos de informações:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Informações de contato (como nome, e-mail, telefone e endereço)</li>
                <li>Informações técnicas sobre seu dispositivo e conexão com a internet</li>
                <li>Informações de uso e navegação em nosso site</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Uso das Informações</h2>
              <p>
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Processar solicitações de orçamento e atender às suas demandas</li>
                <li>Melhorar nossos serviços e a experiência do usuário em nosso site</li>
                <li>Enviar comunicações sobre nossos serviços e ofertas (apenas com seu consentimento)</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookies e Tecnologias Semelhantes</h2>
              <p>
                Nosso site utiliza cookies para melhorar sua experiência de navegação. Você pode configurar seu navegador para recusar cookies, mas isso pode limitar algumas funcionalidades do site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Compartilhamento de Informações</h2>
              <p>
                Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing sem seu consentimento explícito. Podemos compartilhar informações com:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Prestadores de serviços que nos auxiliam na operação do site e negócio</li>
                <li>Autoridades governamentais quando exigido por lei</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Seus Direitos</h2>
              <p>
                Você tem direito a:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Acessar os dados pessoais que possuímos sobre você</li>
                <li>Solicitar a correção de informações imprecisas</li>
                <li>Solicitar a exclusão de seus dados (sujeito às obrigações legais)</li>
                <li>Retirar seu consentimento a qualquer momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Segurança</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda ou alteração.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Alterações na Política de Privacidade</h2>
              <p>
                Podemos atualizar esta política periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre nossas práticas de privacidade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contato</h2>
              <p>
                Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre o tratamento de seus dados, entre em contato conosco pelo e-mail: comercial@ferrovelhototi.com.br ou pelo telefone (31) 3532-5072.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
