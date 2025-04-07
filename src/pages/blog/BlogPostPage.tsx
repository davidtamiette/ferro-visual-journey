
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, User, Tag } from 'lucide-react';
import { Post, Tag as TagType } from '@/types/blog';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postTags, setPostTags] = useState<TagType[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        // Fetch the post
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            profiles:author_id(full_name),
            blog_categories:category_id(name, slug)
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            // Post not found
            navigate('/blog');
            return;
          }
          throw error;
        }
        
        // Process the post data
        const formattedPost = {
          ...data,
          author_name: data?.profiles?.full_name || 'Autor Desconhecido',
          category_name: data?.blog_categories?.name || 'Sem Categoria',
          status: data?.status as 'draft' | 'published' | 'archived',
        } as Post;
        
        setPost(formattedPost);
        
        // Fetch tags for this post
        const { data: tagsData, error: tagsError } = await supabase
          .from('blog_posts_tags')
          .select(`
            tag_id,
            blog_tags:tag_id(id, name, slug, created_at)
          `)
          .eq('post_id', data?.id);
        
        if (!tagsError && tagsData) {
          // Fixed: Extract tag data correctly, handling the nested structure
          const tags: TagType[] = tagsData
            .filter(item => item.blog_tags) // Filter out any null entries
            .map(item => {
              // Extract the blog_tags object correctly
              const tagData = item.blog_tags as any;  
              return {
                id: tagData.id || "",
                name: tagData.name || "",
                slug: tagData.slug || "",
                created_at: tagData.created_at || new Date().toISOString()
              };
            });
          
          setPostTags(tags);
          
          // Update the post with tags
          setPost(prev => prev ? {...prev, tags} : null);
        }
        
        // Fetch related posts (posts with the same category)
        if (data?.category_id) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('blog_posts')
            .select(`
              *,
              profiles:author_id(full_name),
              blog_categories:category_id(name, slug)
            `)
            .eq('category_id', data.category_id)
            .eq('status', 'published')
            .neq('id', data.id)
            .order('published_at', { ascending: false })
            .limit(3);
          
          if (!relatedError && relatedData) {
            // Format related posts
            const formattedRelatedPosts = relatedData.map(post => ({
              ...post,
              author_name: post.profiles?.full_name || 'Autor Desconhecido',
              category_name: post.blog_categories?.name || 'Sem Categoria',
              status: post.status as 'draft' | 'published' | 'archived',
            })) as Post[];
            
            setRelatedPosts(formattedRelatedPosts);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchPost();
    }
  }, [slug, navigate]);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{post?.title ? `${post.title} | Blog | Ferro Velho Toti` : 'Carregando...'}</title>
        <meta name="description" content={post?.seo_description || post?.summary || ''} />
        <meta name="keywords" content={post?.seo_keywords || ''} />
        {post && (
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": "${post.title}",
                "description": "${post.summary || ''}",
                "image": "${post.featured_image || ''}",
                "author": {
                  "@type": "Person",
                  "name": "${post.author_name}"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Ferro Velho Toti",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://ferrovelhototi.com.br/logo.png"
                  }
                },
                "datePublished": "${post.published_at}",
                "dateModified": "${post.updated_at}"
              }
            `}
          </script>
        )}
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24">
        {isLoading ? (
          <div className="container mx-auto px-6 py-12">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
            <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-8" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-4/5 mb-3" />
            </div>
          </div>
        ) : post ? (
          <>
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-gray-50 to-white dark:from-toti-navy/20 dark:to-transparent py-12">
              <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                  <Link to="/blog" className="inline-flex items-center text-toti-slate hover:text-toti-teal transition-colors mb-6">
                    <ChevronLeft size={16} className="mr-1" />
                    Voltar para o Blog
                  </Link>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-toti-navy dark:text-white mb-4">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-toti-slate dark:text-gray-400 mb-8">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(post.published_at)}
                    </div>
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      {post.author_name}
                    </div>
                    {post.blog_categories && (
                      <Link 
                        to={`/blog/categoria/${post.blog_categories.slug}`}
                        className="flex items-center hover:text-toti-teal transition-colors"
                      >
                        <Tag size={16} className="mr-1" />
                        {post.category_name}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Image */}
            {post.featured_image && (
              <div className="container mx-auto px-6 -mt-6 mb-12">
                <div className="rounded-xl overflow-hidden max-w-4xl mx-auto h-[300px] md:h-[400px] lg:h-[500px]">
                  <img 
                    src={post.featured_image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="container mx-auto px-6 py-6">
              <div className="max-w-3xl mx-auto">
                {/* Post content */}
                <div 
                  className="prose prose-lg dark:prose-invert prose-headings:text-toti-navy dark:prose-headings:text-white prose-a:text-toti-teal max-w-none mb-12"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Tags */}
                {postTags && postTags.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-12">
                    <div className="flex flex-wrap gap-2">
                      {postTags.map(tag => (
                        <Link 
                          key={tag.id}
                          to={`/blog/tag/${tag.slug}`}
                          className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-toti-teal/10 hover:text-toti-teal dark:hover:bg-toti-teal/20 transition-colors rounded-full px-3 py-1"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Share buttons */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6">
                  <h3 className="text-lg font-medium text-toti-navy dark:text-white mb-4">Compartilhe este artigo</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                    >
                      Facebook
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, '_blank')}
                    >
                      Twitter
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                    >
                      LinkedIn
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://api.whatsapp.com/send?text=${post.title} ${window.location.href}`, '_blank')}
                    >
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-gray-50 dark:bg-toti-navy/10 py-16 mt-12">
                <div className="container mx-auto px-6">
                  <h2 className="text-2xl font-bold text-toti-navy dark:text-white text-center mb-10">
                    Artigos Relacionados
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {relatedPosts.map(relatedPost => (
                      <Link 
                        to={`/blog/${relatedPost.slug}`} 
                        key={relatedPost.id}
                        className="glass dark:glass-dark rounded-xl overflow-hidden flex flex-col transition-transform hover:scale-[1.02]"
                      >
                        <div className="h-48">
                          {relatedPost.featured_image ? (
                            <img 
                              src={relatedPost.featured_image} 
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-toti-navy/20 to-toti-teal/20 flex items-center justify-center">
                              <span className="text-toti-teal">Ferro Velho Toti</span>
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <h3 className="text-xl font-bold mb-2 text-toti-navy dark:text-white line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-xs text-toti-slate/80 dark:text-gray-400 mb-3">
                            {formatDate(relatedPost.published_at)}
                          </p>
                          <p className="text-sm text-toti-slate dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                            {relatedPost.summary}
                          </p>
                          <div className="text-toti-teal font-medium text-sm mt-auto">
                            Ler mais →
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="text-center mt-10">
                    <Link to="/blog">
                      <Button variant="default" size="lg">
                        <ChevronLeft size={16} className="mr-2" />
                        Ver todos os artigos
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="container mx-auto px-6 py-12 text-center">
            <h2 className="text-2xl font-bold text-toti-navy dark:text-white mb-4">
              Artigo não encontrado
            </h2>
            <p className="text-toti-slate dark:text-gray-300 mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Link to="/blog">
              <Button variant="default" size="lg">
                <ChevronLeft size={16} className="mr-2" />
                Voltar para o Blog
              </Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;

