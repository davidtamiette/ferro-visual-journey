
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Post, Tag } from '@/types/blog';
import { 
  Calendar, 
  User, 
  Tag as TagIcon, 
  ArrowLeft, 
  Share,
  Facebook,
  Twitter,
  Linkedin,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      
      if (!slug) return;
      
      // Fetch the post data
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
        console.error('Error fetching post:', error);
        navigate('/blog', { replace: true });
        return;
      }
      
      if (!data) {
        navigate('/blog', { replace: true });
        return;
      }
      
      // Transform the data
      const transformedPost = {
        ...data,
        author_name: data.profiles?.full_name || 'Anonymous',
        category_name: data.blog_categories?.name || 'Uncategorized'
      };
      
      setPost(transformedPost);
      
      // Fetch tags for this post
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_posts_tags')
        .select(`
          tag_id,
          blog_tags!inner(id, name, slug)
        `)
        .eq('post_id', data.id);
      
      if (!tagsError && tagsData) {
        const formattedTags = tagsData.map(item => item.blog_tags as Tag);
        setTags(formattedTags);
        transformedPost.tags = formattedTags;
      }
      
      // Fetch related posts (same category or with the same tags)
      const { data: relatedData, error: relatedError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id(full_name),
          blog_categories:category_id(name)
        `)
        .eq('status', 'published')
        .neq('id', data.id)
        .eq('category_id', data.category_id)
        .limit(3);
      
      if (!relatedError && relatedData) {
        const transformedRelated = relatedData.map(post => ({
          ...post,
          author_name: post.profiles?.full_name || 'Anonymous',
          category_name: post.blog_categories?.name || 'Uncategorized'
        }));
        
        setRelatedPosts(transformedRelated);
      }
      
      setIsLoading(false);
    };
    
    fetchPost();
  }, [slug, navigate]);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const handleShareClick = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Blog Ferro Velho Toti';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copiado!",
          description: "O link do artigo foi copiado para a área de transferência."
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-muted rounded w-full mb-6"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-12"></div>
              <div className="h-64 bg-muted rounded w-full mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-semibold mb-4">Artigo não encontrado</h1>
            <p className="text-muted-foreground mb-6">
              O artigo que você está procurando não existe ou não está mais disponível.
            </p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.seo_title || post.title} | Ferro Velho Toti</title>
        <meta name="description" content={post.seo_description || post.summary || ''} />
        {post.seo_keywords && <meta name="keywords" content={post.seo_keywords} />}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary || ''} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/blog" className="text-muted-foreground hover:text-foreground inline-flex items-center mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Blog
            </Link>
            
            {/* Categories */}
            {post.category_id && (
              <div className="mb-4">
                <Link 
                  to={`/blog?category=${post.blog_categories?.slug}`}
                  className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                >
                  {post.category_name}
                </Link>
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at)}
              </div>
              
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author_name}
              </div>
              
              <div className="ml-auto flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Share className="h-4 w-4" /> Compartilhar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleShareClick('facebook')}>
                      <Facebook className="h-4 w-4 mr-2" /> Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShareClick('twitter')}>
                      <Twitter className="h-4 w-4 mr-2" /> Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShareClick('linkedin')}>
                      <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShareClick('copy')}>
                      <Copy className="h-4 w-4 mr-2" /> Copiar link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}
          
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 items-center">
              <TagIcon className="h-4 w-4 text-muted-foreground" />
              {tags.map(tag => (
                <Link
                  key={tag.id}
                  to={`/blog?tag=${tag.slug}`}
                  className="text-xs bg-secondary/50 hover:bg-secondary px-3 py-1 rounded-full transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t pt-8 mt-12">
              <h3 className="text-xl font-semibold mb-6">Artigos Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(related => (
                  <div key={related.id} className="bg-card rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
                    {related.featured_image && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={related.featured_image}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h4 className="text-md font-semibold mb-2 line-clamp-2">
                        <Link to={`/blog/${related.slug}`} className="hover:text-primary transition-colors">
                          {related.title}
                        </Link>
                      </h4>
                      
                      <div className="flex text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(related.published_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
