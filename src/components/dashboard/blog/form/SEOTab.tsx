
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

interface SEOTabProps {
  form: UseFormReturn<any>;
}

const SEOTab = ({ form }: SEOTabProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="seo_title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título SEO</FormLabel>
            <FormControl>
              <Input 
                placeholder="Título otimizado para SEO"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Título otimizado para mecanismos de busca. Se vazio, o título do post será usado.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="seo_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição SEO</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Descrição otimizada para SEO"
                {...field}
                rows={3}
              />
            </FormControl>
            <FormDescription>
              Descrição que aparecerá nos resultados de busca. Se vazio, o resumo do post será usado.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="seo_keywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Palavras-chave SEO</FormLabel>
            <FormControl>
              <Input 
                placeholder="palavra1, palavra2, palavra3"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Lista de palavras-chave separadas por vírgula.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SEOTab;
