
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PlusCircle, Search, MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react';
import { Post } from '@/types/blog';

const BlogPostsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Fetch count separately
      const { count: totalCount, error: countError } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true });
      
      if (countError) throw countError;
      setTotalPosts(totalCount || 0);
      
      // Fetch the posts with pagination
      const from = (currentPage - 1) * postsPerPage;
      const to = from + postsPerPage - 1;
      
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id(full_name),
          blog_categories:category_id(name, slug)
        `)
        .order('created_at', { ascending: false })
        .range(from, to);
      
      // Apply search filter if provided
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Format the posts data
      const formattedPosts = data.map(post => ({
        ...post,
        author_name: post.profiles?.full_name || 'Autor Desconhecido',
        category_name: post.blog_categories?.name || 'Sem Categoria',
        status: post.status as 'draft' | 'published' | 'archived',
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
  }, [currentPage, searchQuery]);
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  
  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postToDelete);
      
      if (error) throw error;
      
      // Remove the post from the state
      setPosts(prev => prev.filter(post => post.id !== postToDelete));
      
      toast({
        title: "Post excluído",
        description: "O post foi excluído com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir post",
        description: "Não foi possível excluir o post. Tente novamente.",
      });
    } finally {
      setPostToDelete(null);
      setDeleteDialogOpen(false);
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
  };
  
  const getStatusBadge = (status: 'draft' | 'published' | 'archived') => {
    const statusConfig = {
      draft: {
        label: 'Rascunho',
        variant: 'outline' as const
      },
      published: {
        label: 'Publicado',
        variant: 'default' as const // Changed from 'success' to 'default'
      },
      archived: {
        label: 'Arquivado',
        variant: 'secondary' as const
      }
    };
    
    return (
      <Badge variant={statusConfig[status].variant}>
        {statusConfig[status].label}
      </Badge>
    );
  };
  
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Gerenciar Posts | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Posts</h1>
          <p className="text-muted-foreground">
            Crie, edite e gerencie os posts do blog.
          </p>
        </div>
        
        <Button onClick={() => navigate('/dashboard/blog/posts/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Post
        </Button>
      </div>
      
      <div className="flex items-center py-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-toti-teal"></div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Carregando posts...</p>
                </TableCell>
              </TableRow>
            ) : posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum post encontrado</p>
                  <Button 
                    variant="link" 
                    onClick={() => navigate('/dashboard/blog/posts/new')}
                    className="mt-2"
                  >
                    Criar seu primeiro post
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium max-w-[300px] truncate">
                    {post.title}
                  </TableCell>
                  <TableCell>{post.category_name}</TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>
                    {post.status === 'published' ? formatDate(post.published_at) : formatDate(post.created_at)}
                  </TableCell>
                  <TableCell>{post.author_name}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/blog/${post.slug}`} target="_blank" className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/blog/posts/edit/${post.id}`)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600" 
                          onClick={() => handleDeleteClick(post.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPosts > postsPerPage && (
        <div className="flex justify-center space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          
          {Array.from({ length: Math.ceil(totalPosts / postsPerPage) }).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
          >
            Próximo
          </Button>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente este post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogPostsPage;
