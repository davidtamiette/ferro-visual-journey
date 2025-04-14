
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Post } from '@/types/blog';

export const useBlogPosts = (postsPerPage = 10) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Base count query
      let countQuery = supabase.from('blog_posts').select('*', { count: 'exact', head: true });
      
      // Apply filters to count query
      if (searchQuery) {
        countQuery = countQuery.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }
      
      if (statusFilter) {
        countQuery = countQuery.eq('status', statusFilter);
      }
      
      // Execute count query
      const { count: totalCount, error: countError } = await countQuery;
      
      if (countError) throw countError;
      setTotalPosts(totalCount || 0);
      
      // Fetch the posts with pagination
      const from = (currentPage - 1) * postsPerPage;
      const to = from + postsPerPage - 1;
      
      // Modificamos a consulta para primeiro obter os posts básicos
      let query = supabase
        .from('blog_posts')
        .select(`*`)
        .order('created_at', { ascending: false })
        .range(from, to);
      
      // Apply search filter if provided
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }
      
      // Apply status filter if provided
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Para cada post obtido, buscamos informações adicionais separadamente
      const formattedPosts = await Promise.all(data.map(async post => {
        // Buscar autor (se existir author_id)
        let author_name = 'Autor Desconhecido';
        if (post.author_id) {
          const { data: authorData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', post.author_id)
            .maybeSingle();
          
          if (authorData && authorData.full_name) {
            author_name = authorData.full_name;
          }
        }
        
        // Buscar categoria (se existir category_id)
        let category_name = 'Sem Categoria';
        if (post.category_id) {
          const { data: categoryData } = await supabase
            .from('blog_categories')
            .select('name')
            .eq('id', post.category_id)
            .maybeSingle();
          
          if (categoryData && categoryData.name) {
            category_name = categoryData.name;
          }
        }
        
        // Ensure status is one of the allowed values or default to "draft"
        let typedStatus: 'draft' | 'published' | 'archived' = 'draft';
        if (post.status === 'published' || post.status === 'archived') {
          typedStatus = post.status as 'published' | 'archived';
        }
        
        return {
          ...post,
          author_name,
          category_name,
          status: typedStatus
        };
      })) as Post[];
      
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar posts",
        description: "Não foi possível carregar a lista de posts.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchQuery, statusFilter]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      
      // Remove the post from the state
      setPosts(prev => prev.filter(post => post.id !== postId));
      
      toast({
        title: "Post excluído",
        description: "O post foi excluído com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir post",
        description: "Não foi possível excluir o post. Tente novamente.",
      });
      return false;
    }
  };

  return {
    posts,
    isLoading,
    totalPosts,
    currentPage,
    searchQuery,
    statusFilter,
    setSearchQuery,
    setStatusFilter,
    handlePageChange,
    deletePost,
    postsPerPage,
    fetchPosts
  };
};
