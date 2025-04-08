
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, Upload, Trash2 } from 'lucide-react';

interface SiteSettings {
  id?: string;
  company_name: string;
  company_description: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  logo_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
}

const SiteSettingsForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    company_name: 'Ferro Velho Toti',
    company_description: null,
    primary_color: '#10B981', // toti-teal default
    secondary_color: '#0F172A', // toti-navy default
    logo_url: null,
    contact_email: null,
    contact_phone: null,
    address: null,
  });
  
  // Fetch existing settings
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();
        
        if (error && error.code !== 'PGRST116') {
          // PGRST116 is the "no rows returned" error code
          throw error;
        }
        
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar configurações",
          description: "Ocorreu um erro ao carregar as configurações do site."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Check if settings already exist
      const { data: existingSettings } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1);
      
      let result;
      
      if (existingSettings && existingSettings.length > 0) {
        // Update existing settings
        result = await supabase
          .from('site_settings')
          .update(settings)
          .eq('id', existingSettings[0].id);
      } else {
        // Insert new settings
        result = await supabase
          .from('site_settings')
          .insert(settings)
          .select();
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: "Configurações salvas",
        description: "As configurações do site foram salvas com sucesso."
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar configurações",
        description: "Ocorreu um erro ao salvar as configurações do site."
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 2MB."
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('site')
        .upload(filePath, file);
      
      if (error) throw error;
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('site')
        .getPublicUrl(filePath);
      
      const logoUrl = urlData.publicUrl;
      setSettings(prev => ({ ...prev, logo_url: logoUrl }));
      
      toast({
        title: "Logo enviado",
        description: "O logo foi enviado com sucesso."
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar logo",
        description: "Ocorreu um erro ao enviar o logo."
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleLogoRemove = () => {
    setSettings(prev => ({ ...prev, logo_url: null }));
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse w-1/4"></div>
        <div className="space-y-2">
          <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
          <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
          <div className="h-40 bg-muted rounded animate-pulse w-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Configurações do Site</CardTitle>
          <CardDescription>
            Configure as informações gerais do site que são exibidas em todas as páginas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company_name">Nome da Empresa</Label>
            <Input
              id="company_name"
              name="company_name"
              value={settings.company_name}
              onChange={handleChange}
              placeholder="Nome da sua empresa"
              required
            />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="company_description">Descrição</Label>
            <Textarea
              id="company_description"
              name="company_description"
              value={settings.company_description || ''}
              onChange={handleChange}
              placeholder="Breve descrição sobre a empresa"
              rows={3}
            />
          </div>
          
          {/* Logo */}
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="space-y-4">
              {settings.logo_url ? (
                <div className="relative w-full h-24 rounded-lg overflow-hidden border">
                  <img 
                    src={settings.logo_url} 
                    alt="Logo" 
                    className="w-auto h-full object-contain mx-auto"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleLogoRemove}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-24 rounded-lg border border-dashed">
                  <div className="flex flex-col items-center">
                    <Image className="w-10 h-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Nenhum logo selecionado</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <label htmlFor="logo-upload">
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    disabled={isUploading}
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Upload className="h-4 w-4" />
                      {isUploading ? 'Enviando...' : 'Enviar Logo'}
                    </div>
                  </Button>
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>
          
          {/* Theme Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary_color">Cor Primária</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border" 
                  style={{ backgroundColor: settings.primary_color || '#10B981' }}
                />
                <Input
                  id="primary_color"
                  name="primary_color"
                  type="color"
                  value={settings.primary_color || '#10B981'}
                  onChange={handleChange}
                  className="w-20 h-10 p-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary_color">Cor Secundária</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border" 
                  style={{ backgroundColor: settings.secondary_color || '#0F172A' }}
                />
                <Input
                  id="secondary_color"
                  name="secondary_color"
                  type="color"
                  value={settings.secondary_color || '#0F172A'}
                  onChange={handleChange}
                  className="w-20 h-10 p-1"
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-2">
            <Label htmlFor="contact_email">Email de Contato</Label>
            <Input
              id="contact_email"
              name="contact_email"
              type="email"
              value={settings.contact_email || ''}
              onChange={handleChange}
              placeholder="contato@empresa.com.br"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact_phone">Telefone de Contato</Label>
            <Input
              id="contact_phone"
              name="contact_phone"
              value={settings.contact_phone || ''}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Textarea
              id="address"
              name="address"
              value={settings.address || ''}
              onChange={handleChange}
              placeholder="Endereço completo da empresa"
              rows={2}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SiteSettingsForm;
