
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Category, Tag } from '@/types/blog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

export type BlogFormValues = z.infer<typeof formSchema>;

export const useBlogForm = (postId?: string) => {
  const isEditMode = !!postId;
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const form = useForm<BlogFormValues>({
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
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('blog_categories')
          .select('*')
          .order('name', { ascending: true });
        
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
        
        const { data: tagsData, error: tagsError } = await supabase
          .from('blog_tags')
          .select('*')
          .order('name', { ascending: true });
        
        if (tagsError) throw tagsError;
        setAllTags(tagsData || []);
        
        if (isEditMode && postId) {
          const { data: post, error: postError } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', postId)
            .single();
          
          if (postError) throw postError;
          
          if (post) {
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
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    
    if (!isEditMode || !form.getValues('slug')) {
      const slug = generateSlug(title);
      form.setValue('slug', slug);
    }
  };
  
  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };
  
  const onSubmit = async (data: BlogFormValues) => {
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
      let published_at = null;
      if (data.status === 'published') {
        published_at = new Date().toISOString();
      }
      
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
      
      if (newPostId) {
        await supabase
          .from('blog_posts_tags')
          .delete()
          .eq('post_id', newPostId);
        
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

  return {
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
  };
};
