
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Post } from '@/types/blog';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/RichTextEditor';
import { useNavigate } from 'react-router-dom';

const ManageBlogPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  
  // Fetch posts
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Format the posts data - ensure status is properly typed
        const formattedPosts = data.map(post => {
          // Ensure status is one of the allowed values or default to "draft"
          let typedStatus: 'draft' | 'published' | 'archived' = 'draft';
          if (post.status === 'published' || post.status === 'archived') {
            typedStatus = post.status as 'published' | 'archived';
          }
          
          return {
            ...post,
            status: typedStatus
          };
        }) as Post[];
        
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Erro ao carregar posts",
          description: "Não foi possível carregar os posts do blog.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPosts();
  }, [toast]);
  
  // Load post data when a post is selected
  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setSummary(selectedPost.summary || '');
      setContent(selectedPost.content);
      setSeoTitle(selectedPost.seo_title || '');
      setSeoDescription(selectedPost.seo_description || '');
      setSeoKeywords(selectedPost.seo_keywords || '');
    } else {
      setTitle('');
      setSummary('');
      setContent('');
      setSeoTitle('');
      setSeoDescription('');
      setSeoKeywords('');
    }
  }, [selectedPost]);
  
  // Save post changes
  const handleSavePost = async () => {
    if (!selectedPost) return;
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title,
          summary,
          content,
          seo_title: seoTitle,
          seo_description: seoDescription,
          seo_keywords: seoKeywords,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPost.id);
        
      if (error) throw error;
      
      toast({
        title: "Post atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
      
      // Update local post data - ensure status is typed correctly
      setPosts(posts.map(post => {
        if (post.id === selectedPost.id) {
          return {
            ...post,
            title,
            summary,
            content,
            seo_title: seoTitle,
            seo_description: seoDescription,
            seo_keywords: seoKeywords
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Gerenciar Blog | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Blog</h1>
        <p className="text-muted-foreground">
          Edite o conteúdo dos posts do blog.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Post List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Posts</CardTitle>
              <CardDescription>Selecione um post para editar</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto">
                {isLoading ? (
                  <div className="p-4">Carregando posts...</div>
                ) : posts.length === 0 ? (
                  <div className="p-4">Nenhum post encontrado</div>
                ) : (
                  <ul className="divide-y">
                    {posts.map(post => (
                      <li key={post.id}>
                        <button
                          className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                            selectedPost?.id === post.id ? 'bg-muted font-medium' : ''
                          }`}
                          onClick={() => setSelectedPost(post)}
                        >
                          <div className="font-medium line-clamp-1">{post.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(post.created_at || '').toLocaleDateString('pt-BR')}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="p-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/dashboard/blog/new')}
                >
                  Novo Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Post Editor */}
        <div className="lg:col-span-9">
          {selectedPost ? (
            <Card>
              <CardHeader>
                <CardTitle>Editar Post</CardTitle>
                <CardDescription>
                  Faça alterações no post selecionado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="content">
                  <TabsList>
                    <TabsTrigger value="content">Conteúdo</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="summary">Resumo</Label>
                      <Input
                        id="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Conteúdo</Label>
                      <RichTextEditor
                        value={content}
                        onChange={setContent}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="seo" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="seo-title">Título SEO</Label>
                      <Input
                        id="seo-title"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="Título otimizado para SEO"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seo-description">Descrição SEO</Label>
                      <Input
                        id="seo-description"
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        placeholder="Descrição otimizada para mecanismos de busca"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seo-keywords">Palavras-chave</Label>
                      <Input
                        id="seo-keywords"
                        value={seoKeywords}
                        onChange={(e) => setSeoKeywords(e.target.value)}
                        placeholder="Palavras-chave separadas por vírgula"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <div className="flex justify-end p-6 pt-0">
                <Button
                  onClick={handleSavePost}
                  disabled={isSaving}
                >
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  Selecione um post para começar a editar
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBlogPage;
