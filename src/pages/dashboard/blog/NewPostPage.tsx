
import React from 'react';
import { Helmet } from 'react-helmet';
import BlogPostForm from './BlogPostForm';

const NewPostPage = () => {
  return (
    <div>
      <Helmet>
        <title>Novo Post | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <BlogPostForm />
    </div>
  );
};

export default NewPostPage;
