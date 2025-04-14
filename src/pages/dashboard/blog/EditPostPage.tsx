
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import BlogPostForm from './BlogPostForm';

const EditPostPage = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div>
      <Helmet>
        <title>Editar Post | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <BlogPostForm />
    </div>
  );
};

export default EditPostPage;
