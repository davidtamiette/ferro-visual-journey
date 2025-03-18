
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/blog';
import PostTableRow from './PostTableRow';

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  onDeleteClick: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading, onDeleteClick }) => {
  const navigate = useNavigate();

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
        <PostTableRow 
          key={post.id} 
          post={post} 
          onDeleteClick={onDeleteClick} 
        />
      ))}
    </>
  );
};

export default PostList;
