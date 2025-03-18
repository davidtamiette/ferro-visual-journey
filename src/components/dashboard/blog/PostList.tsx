
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MoreHorizontal, Pencil, Trash, Eye, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '@/types/blog';

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  onDeleteClick: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading, onDeleteClick }) => {
  const navigate = useNavigate();

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
        variant: 'default' as const
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

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center py-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-toti-teal"></div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando posts...</p>
        </TableCell>
      </TableRow>
    );
  }

  if (posts.length === 0) {
    return (
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
    );
  }

  return (
    <>
      {posts.map((post) => (
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
                  onClick={() => onDeleteClick(post.id)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default PostList;
