
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface SiteSettings {
  id: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  company_name: string;
  company_description: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
}

const AppearancePage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          throw error;
        }

        setSettings(data);
        if (data.logo_url) {
          setLogoPreview(data.logo_url);
        }
        
        // Apply colors to CSS variables
        if (data.primary_color) {
          document.documentElement.style.setProperty('--primary-color', data.primary_color);
        }
        if (data.secondary_color) {
          document.documentElement.style.setProperty('--secondary-color', data.secondary_color);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar configurações",
          description: "Não foi possível carregar as configurações do site.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [toast]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "A imagem deve ter menos de 2MB.",
      });
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update CSS variables immediately for color changes
    if (name === 'primary_color' || name === 'secondary_color') {
      document.documentElement.style.setProperty(`--${name.replace('_', '-')}`, value);
    }
    
    setSettings((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      let logoUrl = settings.logo_url;

      // Upload new logo if provided
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `logo-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('site-assets')
          .upload(filePath, logoFile, {
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('site-assets')
          .getPublicUrl(filePath);

        logoUrl = urlData.publicUrl;
      }

      // Update settings in the database
      const { error } = await supabase
        .from('site_settings')
        .update({
          logo_url: logoUrl,
          primary_color: settings.primary_color,
          secondary_color: settings.secondary_color,
          company_name: settings.company_name,
          company_description: settings.company_description,
          contact_email: settings.contact_email,
          contact_phone: settings.contact_phone,
          address: settings.address,
          updated_at: new Date().toISOString(),
        })
        .eq('id', settings.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Configurações salvas",
        description: "As configurações do site foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar configurações",
        description: error.message || "Ocorreu um erro ao salvar as configurações.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-toti-teal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Aparência | Dashboard | Ferro Velho Toti</title>
      </Helmet>

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Personalização do Site</h1>
        <p className="text-muted-foreground">
          Personalize a aparência e informações do seu site sem precisar editar o código.
        </p>
      </div>

      <Tabs defaultValue="branding" className="space-y-4">
        <TabsList>
          <TabsTrigger value="branding">Identidade Visual</TabsTrigger>
          <TabsTrigger value="info">Informações</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo</CardTitle>
              <CardDescription>
                Faça o upload da logo da sua empresa. Recomendamos um formato PNG com fundo transparente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-start">
                <div className="w-32 h-32 flex items-center justify-center border rounded-lg overflow-hidden bg-white">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <div className="text-center text-muted-foreground text-sm p-2">Sem logo</div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="logo-upload">Selecione uma imagem</Label>
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    PNG ou JPG, máximo 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cores</CardTitle>
              <CardDescription>
                Defina as cores principais do seu site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primary-color"
                      name="primary_color"
                      type="color"
                      value={settings?.primary_color || '#0f1d52'}
                      onChange={handleInputChange}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={settings?.primary_color || '#0f1d52'}
                      name="primary_color"
                      onChange={handleInputChange}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Usada em elementos principais, como cabeçalhos e botões.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      name="secondary_color"
                      value={settings?.secondary_color || '#22bfcb'}
                      onChange={handleInputChange}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      name="secondary_color"
                      value={settings?.secondary_color || '#22bfcb'}
                      onChange={handleInputChange}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Usada em destaques e elementos de suporte.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4 mt-6">
                <p className="font-medium">Pré-visualização</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: settings?.primary_color || '#0f1d52' }}>
                    <p className="text-white font-medium">Cor Primária</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: settings?.secondary_color || '#22bfcb' }}>
                    <p className="text-black font-medium">Cor Secundária</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>
                Preencha os detalhes básicos da sua empresa.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input
                  id="company-name"
                  name="company_name"
                  value={settings?.company_name || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: Ferro Velho Toti"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-description">Descrição</Label>
                <Input
                  id="company-description"
                  name="company_description"
                  value={settings?.company_description || ''}
                  onChange={handleInputChange}
                  placeholder="Breve descrição da sua empresa"
                />
                <p className="text-sm text-muted-foreground">
                  Uma breve descrição que aparecerá em destaque no site.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>
                Defina os principais meios de contato da sua empresa.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    name="contact_email"
                    type="email"
                    value={settings?.contact_email || ''}
                    onChange={handleInputChange}
                    placeholder="contato@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Telefone</Label>
                  <Input
                    id="contact-phone"
                    name="contact_phone"
                    value={settings?.contact_phone || ''}
                    onChange={handleInputChange}
                    placeholder="(00) 0000-0000"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={settings?.address || ''}
                  onChange={handleInputChange}
                  placeholder="Rua, número, bairro, cidade - UF"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  );
};

export default AppearancePage;
