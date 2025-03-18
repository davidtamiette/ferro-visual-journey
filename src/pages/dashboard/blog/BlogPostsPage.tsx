
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import PostList from '@/components/dashboard/blog/PostList';
import DeletePostDialog from '@/components/dashboard/blog/DeletePostDialog';
import PostsPagination from '@/components/dashboard/blog/PostsPagination';

const BlogPostsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  
  const { 
    posts, 
    isLoading, 
    totalPosts, 
    currentPage, 
    searchQuery, 
    setSearchQuery, 
    handlePageChange, 
    deletePost,
    postsPerPage
  } = useBlogPosts();
  
  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    const success = await deletePost(postToDelete);
    
    if (success) {
      setPostToDelete(null);
      setDeleteDialogOpen(false);
    }
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
            <PostList 
              posts={posts} 
              isLoading={isLoading} 
              onDeleteClick={handleDeleteClick} 
            />
          </TableBody>
        </Table>
      </div>
      
      <PostsPagination
        currentPage={currentPage}
        totalItems={totalPosts}
        itemsPerPage={postsPerPage}
        onPageChange={handlePageChange}
      />
      
      <DeletePostDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default BlogPostsPage;
