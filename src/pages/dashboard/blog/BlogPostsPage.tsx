
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Post } from '@/types/blog';
import { 
  PlusCircle, 
  Pencil, 
  Trash2, 
  Eye, 
  Search,
  ChevronDown,
  Filter,
  Check,
  XCircle,
  CircleCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BlogPostsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10;
  
  useEffect(() => {
    fetchPosts();
  }, [searchQuery, filterStatus, currentPage]);
  
  const fetchPosts = async () => {
    setIsLoading(true);
    
    try {
      // Calculate offset for pagination
      const offset = (currentPage - 1) * postsPerPage;
      
      // Start building the query
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id(full_name),
          blog_categories:category_id(name)
        `)
        .order('created_at', { ascending: false });
      
      // Apply search filter if provided
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }
      
      // Apply status filter if provided
      if (filterStatus) {
        query = query.eq('status', filterStatus);
      }
      
      // Get total count for pagination
      const { count } = await query.count();
      setTotalPages(Math.ceil((count || 0) / postsPerPage));
      
      // Get the actual data with pagination
      const { data, error } = await query
        .range(offset, offset + postsPerPage - 1);
      
      if (error) throw error;
      
      // Transform the data to include author_name and category_name
      const transformedData = data?.map(post => ({
        ...post,
        author_name: post.profiles?.full_name || 'Anonymous',
        category_name: post.blog_categories?.name || 'Uncategorized'
      })) || [];
      
      setPosts(transformedData);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Erro ao carregar posts",
        description: "Ocorreu um erro ao carregar os posts do blog.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeletePost = async () => {
    if (!postToDelete) return;
    
    try {
      // Delete the post
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postToDelete.id);
      
      if (error) throw error;
      
      toast({
        title: "Post excluído com sucesso",
        description: "O post foi excluído permanentemente."
      });
      
      // Refresh the posts list
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Erro ao excluir post",
        description: "Ocorreu um erro ao excluir o post.",
        variant: "destructive"
      });
    } finally {
      setPostToDelete(null);
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CircleCheck className="w-3 h-3 mr-1" />
            Publicado
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            <Pencil className="w-3 h-3 mr-1" />
            Rascunho
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            <XCircle className="w-3 h-3 mr-1" />
            Arquivado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Gerenciar Posts | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Posts</h1>
          <p className="text-muted-foreground">
            Crie, edite e gerencie os posts do blog.
          </p>
        </div>
        
        <Button onClick={() => navigate('/dashboard/blog/posts/new')}>
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Post
        </Button>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar posts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              {filterStatus ? (
                filterStatus === 'published' ? 'Publicados' : 
                filterStatus === 'draft' ? 'Rascunhos' : 
                filterStatus === 'archived' ? 'Arquivados' : 'Filtrar'
              ) : 'Filtrar'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => setFilterStatus(null)}>
              {!filterStatus && <Check className="mr-2 h-4 w-4" />}
              <span className={!filterStatus ? "font-medium" : ""}>Todos os Posts</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterStatus('published')}>
              {filterStatus === 'published' && <Check className="mr-2 h-4 w-4" />}
              <span className={filterStatus === 'published' ? "font-medium" : ""}>Publicados</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('draft')}>
              {filterStatus === 'draft' && <Check className="mr-2 h-4 w-4" />}
              <span className={filterStatus === 'draft' ? "font-medium" : ""}>Rascunhos</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('archived')}>
              {filterStatus === 'archived' && <Check className="mr-2 h-4 w-4" />}
              <span className={filterStatus === 'archived' ? "font-medium" : ""}>Arquivados</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Posts table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Título</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead className="hidden md:table-cell">Data de Criação</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/3"></div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>{post.category_name}</TableCell>
                  <TableCell>{post.author_name}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(post.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/dashboard/blog/posts/edit/${post.id}`)}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPostToDelete(post)}
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum post encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              
              // Display first page, last page, and pages around current page
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      
      {/* Delete confirmation dialog */}
      <Dialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Você está prestes a excluir o post "{postToDelete?.title}". Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPostToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPostsPage;
