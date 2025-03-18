import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo
} from 'lucide-react';

// Define the props for the RichTextEditor component
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = 'Comece a escrever...', minHeight = '400px' }: RichTextEditorProps) => {
  const { toast } = useToast();
  const editorRef = React.useRef<HTMLDivElement>(null);
  
  // Initialize the editor content with the initial value
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, []);
  
  // Handle content changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  // Execute a command on the editor
  const execCommand = (command: string, showUI = false, value?: string) => {
    document.execCommand(command, showUI, value);
    handleInput();
    editorRef.current?.focus();
  };
  
  // Handle image upload
  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      
      if (!file) return;
      
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O tamanho máximo permitido é 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      // Show loading indicator
      toast({
        title: "Enviando imagem...",
        description: "Por favor, aguarde enquanto enviamos sua imagem."
      });
      
      try {
        // Upload the file to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { data, error } = await supabase.storage
          .from('blog')
          .upload(filePath, file);
        
        if (error) throw error;
        
        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('blog')
          .getPublicUrl(filePath);
        
        // Insert the image at cursor position
        const imageUrl = urlData.publicUrl;
        execCommand('insertImage', false, imageUrl);
        
        toast({
          title: "Imagem enviada com sucesso",
          description: "A imagem foi adicionada ao seu conteúdo."
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Erro ao enviar imagem",
          description: "Ocorreu um erro ao enviar a imagem. Tente novamente.",
          variant: "destructive"
        });
      }
    };
    
    input.click();
  };
  
  // Handle link insertion
  const handleLinkInsert = () => {
    const url = prompt('Insira o URL do link:');
    if (url) {
      execCommand('createLink', false, url);
    }
  };
  
  return (
    <div className="border rounded-lg bg-background">
      <div className="border-b p-2 flex flex-wrap gap-1">
        <div className="flex gap-1 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('undo')}
            title="Desfazer"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('redo')}
            title="Refazer"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="border-l mx-2 h-full" />
        
        <div className="flex gap-1 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('bold')}
            title="Negrito"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('italic')}
            title="Itálico"
          >
            <Italic className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="border-l mx-2 h-full" />
        
        <div className="flex gap-1 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('formatBlock', false, '<h1>')}
            title="Título 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('formatBlock', false, '<h2>')}
            title="Título 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('formatBlock', false, '<h3>')}
            title="Título 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('formatBlock', false, '<blockquote>')}
            title="Citação"
          >
            <Quote className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="border-l mx-2 h-full" />
        
        <div className="flex gap-1 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('insertUnorderedList')}
            title="Lista com marcadores"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('insertOrderedList')}
            title="Lista numerada"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="border-l mx-2 h-full" />
        
        <div className="flex gap-1 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('justifyLeft')}
            title="Alinhar à esquerda"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('justifyCenter')}
            title="Centralizar"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => execCommand('justifyRight')}
            title="Alinhar à direita"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="border-l mx-2 h-full" />
        
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleLinkInsert}
            title="Inserir link"
          >
            <Link className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleImageUpload}
            title="Inserir imagem"
          >
            <Image className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div
        ref={editorRef}
        className="p-4 outline-none"
        contentEditable
        style={{ minHeight }}
        onInput={handleInput}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
