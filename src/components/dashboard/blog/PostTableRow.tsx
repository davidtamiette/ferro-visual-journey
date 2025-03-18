
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@/components/ui/table';
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
import { MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react';
import { Post } from '@/types/blog';

interface PostTableRowProps {
  post: Post;
  onDeleteClick: (postId: string) => void;
}

const PostTableRow: React.FC<PostTableRowProps> = ({ post, onDeleteClick }) => {
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

  return (
    <TableRow>
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
  );
};

export default PostTableRow;
