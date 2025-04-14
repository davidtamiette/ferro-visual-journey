
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { FormDescription, FormMessage } from '@/components/ui/form';
import { Trash2, Upload, Image } from 'lucide-react';

interface ImageUploaderProps {
  initialImage: string | null;
  onImageChange: (imageUrl: string | null) => void;
}

const ImageUploader = ({ initialImage, onImageChange }: ImageUploaderProps) => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `post-cover-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('blog')
        .upload(fileName, file);
      
      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }
      
      const { data: urlData } = supabase.storage
        .from('blog')
        .getPublicUrl(fileName);
      
      const imageUrl = urlData.publicUrl;
      onImageChange(imageUrl);
      setImagePreview(imageUrl);
      
      toast({
        title: "Imagem enviada com sucesso",
        description: "A imagem de capa foi adicionada ao post."
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erro ao enviar imagem",
        description: "Ocorreu um erro ao enviar a imagem. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleImageRemove = () => {
    onImageChange(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-4">
      {imagePreview ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleImageRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-48 rounded-lg border border-dashed">
          <div className="flex flex-col items-center">
            <Image className="w-10 h-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Nenhuma imagem selecionada</p>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <label htmlFor="image-upload">
          <Button
            type="button"
            variant="outline"
            asChild
            disabled={isUploading}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <Upload className="h-4 w-4" />
              {isUploading ? 'Enviando...' : 'Enviar Imagem'}
            </div>
          </Button>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
      </div>
      <FormDescription>
        A imagem de capa será exibida no topo do post e nas listagens do blog.
      </FormDescription>
      <FormMessage />
    </div>
  );
};

export default ImageUploader;
