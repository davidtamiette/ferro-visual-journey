
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Post, Category } from '@/types/blog';
import { 
  Calendar, 
  User, 
  Tag as TagIcon, 
  ChevronRight, 
  Tag as CategoryIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BlogIndexPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const postsPerPage = 6;
  
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true });
        
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data || []);
      }
    };
    
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      // Calculate offset for pagination
      const offset = (currentPage - 1) * postsPerPage;
      
      // Start building the query
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id(full_name),
          blog_categories:category_id(name)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      // Apply category filter if selected
      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }
      
      // Get total count for pagination
      const { count } = await query.count();
      setTotalPages(Math.ceil((count || 0) / postsPerPage));
      
      // Get the actual data with pagination
      const { data, error } = await query
        .range(offset, offset + postsPerPage - 1);
      
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        // Transform the data to include author_name and category_name
        const transformedData = data?.map(post => ({
          ...post,
          author_name: post.profiles?.full_name || 'Anonymous',
          category_name: post.blog_categories?.name || 'Uncategorized'
        })) || [];
        
        setPosts(transformedData);
      }
      
      setIsLoading(false);
    };
    
    fetchPosts();
  }, [currentPage, selectedCategory]);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Ferro Velho Toti</title>
        <meta name="description" content="Artigos e notícias sobre reciclagem de metais, sustentabilidade e melhores práticas do setor." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog Ferro Velho Toti</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Notícias, dicas e informações sobre reciclagem de metais, gestão de resíduos e sustentabilidade.
          </p>
        </div>
        
        {/* Categories filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm border animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-card rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
                  {post.featured_image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex gap-2 items-center text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <CategoryIcon className="h-3 w-3" />
                        {post.category_name}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.summary || truncateText(post.content.replace(/<[^>]*>?/gm, ''), 150)}
                    </p>
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author_name}
                      </span>
                      
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                          Ler mais <ChevronRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    
                    // Display first page, last page, and pages around current page
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    
                    // Add ellipsis where there are gaps
                    if (
                      (page === 2 && currentPage > 3) ||
                      (page === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Nenhum artigo publicado</h3>
            <p className="text-muted-foreground">
              Não encontramos nenhum artigo publicado. Por favor, verifique mais tarde.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogIndexPage;
