
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Post } from '@/types/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const RecentBlogPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            profiles(full_name),
            blog_categories(name, slug)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching recent posts:', error);
          return;
        }

        setPosts(data as Post[]);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-toti-navy/10">
        <div className="container mx-auto px-4">
          <h2 className="toti-heading text-center mb-12">Carregando artigos recentes...</h2>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-toti-navy/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="toti-subtitle mb-4">Nosso Blog</span>
          <h2 className="toti-heading mb-6">Artigos Recentes</h2>
          <p className="toti-subheading mx-auto">
            Confira as últimas novidades, dicas e informações sobre reciclagem,
            sustentabilidade e gestão de resíduos metálicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                {post.featured_image && (
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={post.featured_image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardTitle className="text-xl font-bold line-clamp-2 hover:text-toti-teal transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.published_at ? 
                    format(new Date(post.published_at), 'dd MMM, yyyy', { locale: ptBR }) : 
                    'Data não disponível'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.summary || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/blog/${post.slug}`} className="flex items-center justify-center">
                    Ler mais <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link to="/blog">Ver todos os artigos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
