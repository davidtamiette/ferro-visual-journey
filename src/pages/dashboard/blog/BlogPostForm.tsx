import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Post, PostFormData, Category, Tag } from '@/types/blog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Save,
  Eye, 
  Trash2, 
  Upload,
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextEditor from '@/components/RichTextEditor';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Create a schema for form validation
const formSchema = z.object({
  title: z.string().min(2, 'O título deve ter pelo menos 2 caracteres'),
  slug: z.string().min(2, 'O slug deve ter pelo menos 2 caracteres')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'O slug deve conter apenas letras minúsculas, números e hífens'),
  summary: z.string().optional(),
  content: z.string().min(10, 'O conteúdo deve ter pelo menos 10 caracteres'),
  status: z.enum(['draft', 'published', 'archived']),
  category_id: z.string().optional().nullable(),
  featured_image: z.string().optional().nullable(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
});

const BlogPostForm = () => {
  const { postId } = useParams();
  const isEditMode = !!postId;
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      content: '',
      status: 'draft',
      category_id: null,
      featured_image: null,
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
    }
  });
  
  // Load post data if in edit mode
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('blog_categories')
          .select('*')
          .order('name', { ascending: true });
        
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
        
        // Fetch all tags
        const { data: tagsData, error: tagsError } = await supabase
          .from('blog_tags')
          .select('*')
          .order('name', { ascending: true });
        
        if (tagsError) throw tagsError;
        setAllTags(tagsData || []);
        
        // If in edit mode, fetch the post data
        if (isEditMode && postId) {
          const { data: post, error: postError } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', postId)
            .single();
          
          if (postError) throw postError;
          
          if (post) {
            // Set form values
            form.reset({
              title: post.title,
              slug: post.slug,
              summary: post.summary || '',
              content: post.content,
              status: post.status as 'draft' | 'published' | 'archived',
              category_id: post.category_id,
              featured_image: post.featured_image,
              seo_title: post.seo_title || '',
              seo_description: post.seo_description || '',
              seo_keywords: post.seo_keywords || '',
            });
            
            setImagePreview(post.featured_image);
            
            // Fetch tags associated with this post
            const { data: postTags, error: postTagsError } = await supabase
              .from('blog_posts_tags')
              .select('tag_id')
              .eq('post_id', postId);
            
            if (!postTagsError && postTags) {
              const tagIds = postTags.map(item => item.tag_id);
              setSelectedTags(tagIds);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Ocorreu um erro ao carregar os dados do post.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isEditMode, postId, form]);
  
  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };
  
  // Handle title change to auto-generate slug if slug is empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    
    // Only auto-generate slug if it's empty or if we're creating a new post
    if (!isEditMode || !form.getValues('slug')) {
      const slug = generateSlug(title);
      form.setValue('slug', slug);
    }
  };
  
  // Handle image upload
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
      // Upload the file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `post-cover-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('blog')
        .upload(filePath, file);
      
      if (error) throw error;
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('blog')
        .getPublicUrl(filePath);
      
      const imageUrl = urlData.publicUrl;
      form.setValue('featured_image', imageUrl);
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
  
  // Handle image removal
  const handleImageRemove = () => {
    form.setValue('featured_image', null);
    setImagePreview(null);
  };
  
  // Handle tag selection
  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };
  
  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Acesso negado",
        description: "Você precisa estar logado para salvar um post.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Check if the status was changed to 'published' and set published_at if it was
      let published_at = null;
      if (data.status === 'published') {
        published_at = new Date().toISOString();
      }
      
      // Prepare post data
      const postData = {
        title: data.title,
        slug: data.slug,
        summary: data.summary || null,
        content: data.content,
        featured_image: data.featured_image,
        author_id: user.id,
        status: data.status,
        category_id: data.category_id || null,
        published_at,
        seo_title: data.seo_title || null,
        seo_description: data.seo_description || null,
        seo_keywords: data.seo_keywords || null,
      };
      
      let newPostId;
      
      if (isEditMode) {
        // Update existing post
        const { data: updatedPost, error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', postId)
          .select()
          .single();
        
        if (error) throw error;
        newPostId = updatedPost.id;
        
        toast({
          title: "Post atualizado com sucesso",
          description: "As alterações no post foram salvas com sucesso."
        });
      } else {
        // Create new post
        const { data: newPost, error } = await supabase
          .from('blog_posts')
          .insert(postData)
          .select()
          .single();
        
        if (error) throw error;
        newPostId = newPost.id;
        
        toast({
          title: "Post criado com sucesso",
          description: "O novo post foi criado com sucesso."
        });
      }
      
      // Update tags for the post
      if (newPostId) {
        // First, delete all existing tag associations
        await supabase
          .from('blog_posts_tags')
          .delete()
          .eq('post_id', newPostId);
        
        // Then, add the new tag associations
        if (selectedTags.length > 0) {
          const tagAssociations = selectedTags.map(tagId => ({
            post_id: newPostId,
            tag_id: tagId
          }));
          
          const { error: tagsError } = await supabase
            .from('blog_posts_tags')
            .insert(tagAssociations);
          
          if (tagsError) throw tagsError;
        }
      }
      
      // Redirect to posts list
      navigate('/dashboard/blog/posts');
    } catch (error: any) {
      console.error('Error saving post:', error);
      
      let errorMessage = "Ocorreu um erro ao salvar o post.";
      if (error.code === '23505') {
        errorMessage = "Já existe um post com esse slug. Por favor, escolha outro.";
      }
      
      toast({
        title: "Erro ao salvar post",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
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
        <title>{isEditMode ? 'Editar Post' : 'Novo Post'} | Dashboard | Ferro Velho Toti</title>
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
            
            <TabsContent value="content" className="space-y-6">
              {/* Title */}
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
              
              {/* Slug */}
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
              
              {/* Summary */}
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
              
              {/* Content */}
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
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              {/* Status */}
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
              
              {/* Category */}
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
              
              {/* Tags */}
              <div className="space-y-2">
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-wrap gap-2 p-4 border rounded-md">
                  {allTags.length > 0 ? (
                    allTags.map(tag => (
                      <Button
                        key={tag.id}
                        type="button"
                        variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTagToggle(tag.id)}
                      >
                        {tag.name}
                      </Button>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Nenhuma tag disponível.</p>
                  )}
                </div>
                <FormDescription>
                  Selecione uma ou mais tags relacionadas ao conteúdo do post.
                </FormDescription>
              </div>
              
              {/* Featured Image */}
              <FormField
                control={form.control}
                name="featured_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem de Capa</FormLabel>
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
                    </div>
                    <FormDescription>
                      A imagem de capa será exibida no topo do post e nas listagens do blog.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="seo" className="space-y-6">
              {/* SEO Title */}
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
              
              {/* SEO Description */}
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
              
              {/* SEO Keywords */}
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
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default BlogPostForm;
