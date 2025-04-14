
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';
import { Category, Tag } from '@/types/blog';
import TagSelector from './TagSelector';
import ImageUploader from './ImageUploader';

interface SettingsTabProps {
  form: UseFormReturn<any>;
  categories: Category[];
  allTags: Tag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
}

const SettingsTab = ({ 
  form, 
  categories, 
  allTags, 
  selectedTags, 
  onTagToggle 
}: SettingsTabProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status do post" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Rascunhos não são visíveis para o público. Posts arquivados não aparecem na listagem.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="category_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value || undefined}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Categorize o post para ajudar na organização e navegação.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="space-y-2">
        <FormLabel>Tags</FormLabel>
        <TagSelector 
          allTags={allTags} 
          selectedTags={selectedTags} 
          onTagToggle={onTagToggle} 
        />
      </div>
      
      <FormField
        control={form.control}
        name="featured_image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Imagem de Capa</FormLabel>
            <ImageUploader 
              initialImage={field.value} 
              onImageChange={field.onChange} 
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SettingsTab;
