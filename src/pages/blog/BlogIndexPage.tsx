
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/blog';

const BlogIndexPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // Fetch the total count first
        const { count, error: countError } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published');
        
        if (countError) throw countError;
        setTotalPosts(count || 0);
        
        // Fetch the actual posts with pagination
        const from = (currentPage - 1) * postsPerPage;
        const to = from + postsPerPage - 1;
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            profiles:author_id(full_name),
            blog_categories:category_id(name, slug)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .range(from, to);
        
        if (error) throw error;
        
        // Process the data to match our expected structure
        const formattedPosts = data.map(post => ({
          ...post,
          author_name: post.profiles?.full_name || 'Autor Desconhecido',
          category_name: post.blog_categories?.name || 'Sem Categoria',
          status: post.status as 'draft' | 'published' | 'archived',
        })) as Post[];
        
        setPosts(formattedPosts);
        
        // Set the first post as featured if we're on the first page
        if (currentPage === 1 && formattedPosts.length > 0) {
          setFeaturedPost(formattedPosts[0]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [currentPage]);
  
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Blog | Ferro Velho Toti</title>
        <meta name="description" content="Leia nossos artigos sobre reciclagem de metais, sustentabilidade e gestão de resíduos." />
        <meta name="keywords" content="blog reciclagem, artigos sustentabilidade, ferro velho, reciclagem metais, gestão resíduos" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="toti-subtitle mb-4">Blog</span>
            <h1 className="toti-heading mb-6">Conteúdo <span className="text-toti-teal">Especializado</span></h1>
            <p className="toti-subheading">
              Artigos e informações sobre reciclagem de metais, sustentabilidade 
              e boas práticas ambientais.
            </p>
          </div>
          
          {isLoading ? (
            // Loading skeletons
            <>
              <div className="mb-12">
                <Skeleton className="h-[400px] w-full rounded-2xl mb-4" />
                <Skeleton className="h-8 w-2/3 mb-2" />
                <Skeleton className="h-6 w-1/3 mb-8" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="mb-8">
                    <Skeleton className="h-[200px] w-full rounded-xl mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-16">
                  <div className="glass dark:glass-dark rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="order-2 lg:order-1 p-8 flex flex-col">
                        <div>
                          <span className="text-sm font-medium bg-toti-teal/10 text-toti-teal px-3 py-1 rounded-full">
                            {featuredPost.category_name}
                          </span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold mt-4 mb-2 text-toti-navy dark:text-white">
                          {featuredPost.title}
                        </h2>
                        <p className="text-sm text-toti-slate/80 dark:text-gray-400 mb-4">
                          Por {featuredPost.author_name} • {formatDate(featuredPost.published_at)}
                        </p>
                        <p className="text-toti-slate dark:text-gray-300 mb-6 line-clamp-3">
                          {featuredPost.summary}
                        </p>
                        <Link 
                          to={`/blog/${featuredPost.slug}`}
                          className="mt-auto"
                        >
                          <Button variant="default">Ler artigo completo</Button>
                        </Link>
                      </div>
                      <div className="order-1 lg:order-2 h-[300px] lg:h-auto">
                        {featuredPost.featured_image ? (
                          <img 
                            src={featuredPost.featured_image} 
                            alt={featuredPost.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-toti-navy/20 to-toti-teal/20 flex items-center justify-center">
                            <span className="text-toti-teal text-lg font-medium">Ferro Velho Toti</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Post grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(featuredPost ? 1 : 0).map((post) => (
                  <Link 
                    to={`/blog/${post.slug}`} 
                    key={post.id}
                    className="glass dark:glass-dark rounded-xl overflow-hidden flex flex-col transition-transform hover:scale-[1.02]"
                  >
                    <div className="h-48">
                      {post.featured_image ? (
                        <img 
                          src={post.featured_image} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-toti-navy/20 to-toti-teal/20 flex items-center justify-center">
                          <span className="text-toti-teal">Ferro Velho Toti</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="mb-2">
                        <span className="text-xs font-medium bg-toti-teal/10 text-toti-teal px-2 py-1 rounded-full">
                          {post.category_name}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-toti-navy dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-xs text-toti-slate/80 dark:text-gray-400 mb-3">
                        {formatDate(post.published_at)}
                      </p>
                      <p className="text-sm text-toti-slate dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                        {post.summary}
                      </p>
                      <div className="text-toti-teal font-medium text-sm mt-auto">
                        Ler mais →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Próximo
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogIndexPage;
