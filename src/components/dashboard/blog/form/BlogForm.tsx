
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlogForm } from '@/hooks/useBlogForm';
import ContentTab from './ContentTab';
import SettingsTab from './SettingsTab';
import SEOTab from './SEOTab';

interface BlogFormProps {
  postId?: string;
  pageTitle?: string;
}

const BlogForm = ({ postId, pageTitle = 'Post' }: BlogFormProps) => {
  const navigate = useNavigate();
  const {
    form,
    isLoading,
    isSaving,
    categories,
    allTags,
    selectedTags,
    isEditMode,
    handleTitleChange,
    handleTagToggle,
    onSubmit
  } = useBlogForm(postId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-muted rounded animate-pulse w-1/4"></div>
          <div className="h-10 bg-muted rounded animate-pulse w-1/6"></div>
        </div>
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
          <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
          <div className="h-40 bg-muted rounded animate-pulse w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>{pageTitle} | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? 'Editar Post' : 'Novo Post'}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode 
              ? 'Edite o conteúdo e as configurações do post existente.' 
              : 'Crie um novo post para o blog.'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/blog/posts')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
          <Button disabled={isSaving} onClick={form.handleSubmit(onSubmit)}>
            <Save className="mr-2 h-4 w-4" /> {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="content">
            <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <ContentTab form={form} handleTitleChange={handleTitleChange} />
            </TabsContent>
            
            <TabsContent value="settings">
              <SettingsTab 
                form={form}
                categories={categories}
                allTags={allTags}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
              />
            </TabsContent>
            
            <TabsContent value="seo">
              <SEOTab form={form} />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
