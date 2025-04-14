
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import RichTextEditor from '@/components/RichTextEditor';

interface ContentTabProps {
  form: UseFormReturn<any>;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContentTab = ({ form, handleTitleChange }: ContentTabProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título</FormLabel>
            <FormControl>
              <Input 
                placeholder="Digite o título do post"
                {...field}
                onChange={handleTitleChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input 
                placeholder="url-amigavel-do-post"
                {...field}
              />
            </FormControl>
            <FormDescription>
              O slug é a parte da URL que identifica o post de forma única. Use apenas letras minúsculas, números e hífens.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resumo</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Digite um breve resumo do post"
                {...field}
                rows={3}
              />
            </FormControl>
            <FormDescription>
              Um resumo conciso do conteúdo do post. Será exibido na listagem do blog.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conteúdo</FormLabel>
            <FormControl>
              <RichTextEditor 
                value={field.value}
                onChange={field.onChange}
                placeholder="Digite o conteúdo do post..."
                minHeight="500px"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContentTab;
