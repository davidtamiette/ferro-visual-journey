
import BlogForm from '@/components/dashboard/blog/form/BlogForm';
import { useParams } from 'react-router-dom';

const BlogPostForm = () => {
  const { postId } = useParams<{ postId: string }>();
  
  return <BlogForm postId={postId} pageTitle={postId ? 'Editar Post' : 'Novo Post'} />;
};

export default BlogPostForm;
