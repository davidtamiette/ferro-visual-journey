
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import { Link } from 'react-router-dom';

const ContentPage = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Hero section content
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroButtonText, setHeroButtonText] = useState('');
  
  // About section content
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  
  // Services section content
  const [servicesTitle, setServicesTitle] = useState('');
  const [servicesDescription, setServicesDescription] = useState('');
  
  // Contact section content
  const [contactTitle, setContactTitle] = useState('');
  const [contactDescription, setContactDescription] = useState('');

  // Represents HTML content for About page
  const [aboutPageContent, setAboutPageContent] = useState('');
  
  // Represents HTML content for Services page
  const [servicesPageContent, setServicesPageContent] = useState('');
  
  useEffect(() => {
    // Fetch content from a 'site_content' table if it exists
    // For now, we're just setting default values as if they came from the database
    setHeroTitle('Especialistas em Reciclagem de Metais em São Paulo');
    setHeroSubtitle('Compra de sucatas metálicas com compromisso ambiental e melhores preços do mercado');
    setHeroButtonText('Solicite uma Avaliação');
    
    setAboutTitle('Sobre o Ferro Velho Toti');
    setAboutContent('Com mais de 15 anos de experiência, o Ferro Velho Toti se consolidou como referência na reciclagem de metais na região de São Paulo. Focados em sustentabilidade e valorização justa das sucatas, trabalhamos com diversos tipos de metais, oferecendo os melhores preços do mercado. NÃO trabalhamos com sucata automotiva.');
    
    setServicesTitle('Nossos Serviços');
    setServicesDescription('Oferecemos uma gama completa de serviços para atender todas as suas necessidades de reciclagem de metais, com foco em qualidade e sustentabilidade.');
    
    setContactTitle('Entre em Contato');
    setContactDescription('Estamos prontos para atender suas necessidades de reciclagem de metais e oferecer as melhores soluções para seu negócio. Entre em contato conosco hoje mesmo.');
    
    // Full page content (rich text)
    setAboutPageContent('<h2>Nossa História</h2><p>O Ferro Velho Toti iniciou suas atividades em 2005, quando seu fundador, João Toti, decidiu transformar sua paixão por reciclagem em um negócio.</p><h2>Nossa Missão</h2><p>Promover a sustentabilidade através da reciclagem de metais, oferecendo os melhores preços e um serviço de qualidade.</p>');
    
    setServicesPageContent('<h2>Compra de Metais</h2><p>Compramos diversos tipos de metais: cobre, alumínio, bronze, latão, etc.</p><h2>Coleta em Empresas</h2><p>Oferecemos serviço de coleta em empresas com grandes volumes de sucata.</p><h2>Separação e Processamento</h2><p>Temos equipamentos modernos para separação e processamento de diversos tipos de metais.</p>');
  }, []);
  
  const handleSaveContent = () => {
    setIsSaving(true);
    
    // In a real implementation, this would update a 'site_content' table in the database
    // For now, we're just simulating a successful save
    setTimeout(() => {
      toast({
        title: "Conteúdo salvo",
        description: "As alterações no conteúdo foram salvas com sucesso.",
      });
      setIsSaving(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Gerenciamento de Conteúdo | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Conteúdo</h1>
          <p className="text-muted-foreground">
            Edite os textos e conteúdos do seu site.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to="/dashboard/blog/manage">
              <FileText className="mr-2 h-4 w-4" />
              Gerenciar Blog
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="home" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="home">Página Inicial</TabsTrigger>
          <TabsTrigger value="about">Página Sobre</TabsTrigger>
          <TabsTrigger value="services">Página Serviços</TabsTrigger>
          <TabsTrigger value="contact">Página Contato</TabsTrigger>
        </TabsList>
        
        <TabsContent value="home" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Página Inicial</CardTitle>
              <CardDescription>
                Edite as seções principais da página inicial do site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hero">
                <TabsList className="w-full">
                  <TabsTrigger value="hero">Hero</TabsTrigger>
                  <TabsTrigger value="about">Sobre</TabsTrigger>
                  <TabsTrigger value="services">Serviços</TabsTrigger>
                  <TabsTrigger value="contact">Contato</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hero" className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-title">Título</Label>
                    <Input
                      id="hero-title"
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      placeholder="Título principal do site"
                    />
                    <p className="text-sm text-muted-foreground">
                      Este é o título principal que aparece em destaque no topo do site.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hero-subtitle">Subtítulo</Label>
                    <Textarea
                      id="hero-subtitle"
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      placeholder="Breve descrição dos serviços"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hero-button">Texto do Botão</Label>
                    <Input
                      id="hero-button"
                      value={heroButtonText}
                      onChange={(e) => setHeroButtonText(e.target.value)}
                      placeholder="Ex: Solicite um Orçamento"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="about" className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="about-title">Título</Label>
                    <Input
                      id="about-title"
                      value={aboutTitle}
                      onChange={(e) => setAboutTitle(e.target.value)}
                      placeholder="Título da seção Sobre"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="about-content">Conteúdo</Label>
                    <Textarea
                      id="about-content"
                      value={aboutContent}
                      onChange={(e) => setAboutContent(e.target.value)}
                      placeholder="Descreva sua empresa, história e valores"
                      rows={6}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="services-title">Título</Label>
                    <Input
                      id="services-title"
                      value={servicesTitle}
                      onChange={(e) => setServicesTitle(e.target.value)}
                      placeholder="Título da seção Serviços"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="services-description">Descrição</Label>
                    <Textarea
                      id="services-description"
                      value={servicesDescription}
                      onChange={(e) => setServicesDescription(e.target.value)}
                      placeholder="Descrição geral dos serviços oferecidos"
                      rows={3}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-title">Título</Label>
                    <Input
                      id="contact-title"
                      value={contactTitle}
                      onChange={(e) => setContactTitle(e.target.value)}
                      placeholder="Título da seção Contato"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-description">Descrição</Label>
                    <Textarea
                      id="contact-description"
                      value={contactDescription}
                      onChange={(e) => setContactDescription(e.target.value)}
                      placeholder="Mensagem introdutória da seção de contato"
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Página Sobre</CardTitle>
              <CardDescription>
                Edite o conteúdo completo da página "Sobre Nós".
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-page-content">Conteúdo da Página</Label>
                <RichTextEditor
                  value={aboutPageContent}
                  onChange={setAboutPageContent}
                  minHeight="300px"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Página Serviços</CardTitle>
              <CardDescription>
                Edite o conteúdo completo da página "Serviços".
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="services-page-content">Conteúdo da Página</Label>
                <RichTextEditor
                  value={servicesPageContent}
                  onChange={setServicesPageContent}
                  minHeight="300px"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Página Contato</CardTitle>
              <CardDescription>
                Edite o conteúdo da página "Contato".
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-title-page">Título da Página</Label>
                <Input
                  id="contact-title-page"
                  value={contactTitle}
                  onChange={(e) => setContactTitle(e.target.value)}
                  placeholder="Título da página de contato"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-description-page">Descrição</Label>
                <Textarea
                  id="contact-description-page"
                  value={contactDescription}
                  onChange={(e) => setContactDescription(e.target.value)}
                  placeholder="Texto introdutório da página de contato"
                  rows={3}
                />
              </div>
              
              <div className="pt-4">
                <p className="text-sm font-medium">Informações de Contato</p>
                <p className="text-sm text-muted-foreground mt-1">
                  As informações de contato (telefone, email e endereço) podem ser editadas na seção "Configurações".
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleSaveContent}
          disabled={isSaving}
        >
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  );
};

export default ContentPage;
