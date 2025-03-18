
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
  
  useEffect(() => {
    // In a real implementation, this would fetch content from a 'content' table
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
  }, []);
  
  const handleSaveContent = () => {
    setIsSaving(true);
    
    // In a real implementation, this would update a 'content' table in the database
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
      
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Conteúdo</h1>
        <p className="text-muted-foreground">
          Edite os textos e conteúdos do seu site.
        </p>
      </div>
      
      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">Sobre</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seção Principal (Hero)</CardTitle>
              <CardDescription>
                Edite o conteúdo da seção principal do site, que é a primeira coisa que os visitantes veem.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seção Sobre</CardTitle>
              <CardDescription>
                Edite o conteúdo da seção "Sobre Nós" do site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <p className="text-sm text-muted-foreground">
                  Conte a história da sua empresa e destaque que NÃO trabalha com sucata automotiva.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seção Serviços</CardTitle>
              <CardDescription>
                Edite o conteúdo da seção de Serviços do site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              
              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Serviços Individuais</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Para adicionar, editar ou remover serviços específicos, use a seção "Gerenciamento de Serviços" 
                  (Esta funcionalidade seria implementada em uma fase posterior).
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seção Contato</CardTitle>
              <CardDescription>
                Edite o conteúdo da seção de Contato do site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              
              <div className="pt-4">
                <p className="text-sm font-medium">Informações de Contato</p>
                <p className="text-sm text-muted-foreground mt-1 mb-2">
                  As informações de contato como telefone, email e endereço podem ser editadas na seção "Aparência" > "Informações".
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
