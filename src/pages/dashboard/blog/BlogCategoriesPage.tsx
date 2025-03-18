
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types/blog';
import { 
  PlusCircle, 
  Pencil, 
  Trash2,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface CategoryFormData {
  id?: string;
  name: string;
  slug: string;
  description: string;
}

const BlogCategoriesPage = () => {
  const { toast } = useToast();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
  });
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Erro ao carregar categorias",
        description: "Ocorreu um erro ao carregar as categorias do blog.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    });
  };
  
  const openCreateDialog = () => {
    setFormMode('create');
    setFormData({
      name: '',
      slug: '',
      description: '',
    });
    setIsDialogOpen(true);
  };
  
  const openEditDialog = (category: Category) => {
    setFormMode('edit');
    setFormData({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || '',
    });
    setIsDialogOpen(true);
  };
  
  const handleSaveCategory = async () => {
    // Validate form data
    if (!formData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "O nome da categoria é obrigatório.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.slug.trim()) {
      toast({
        title: "Slug obrigatório",
        description: "O slug da categoria é obrigatório.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      if (formMode === 'create') {
        // Create new category
        const { data, error } = await supabase
          .from('blog_categories')
          .insert({
            name: formData.name,
            slug: formData.slug,
            description: formData.description || null,
          })
          .select()
          .single();
        
        if (error) throw error;
        
        setCategories([...categories, data]);
        
        toast({
          title: "Categoria criada com sucesso",
          description: "A nova categoria foi criada com sucesso."
        });
      } else {
        // Update existing category
        const { data, error } = await supabase
          .from('blog_categories')
          .update({
            name: formData.name,
            slug: formData.slug,
            description: formData.description || null,
          })
          .eq('id', formData.id)
          .select()
          .single();
        
        if (error) throw error;
        
        setCategories(categories.map(cat => 
          cat.id === data.id ? data : cat
        ));
        
        toast({
          title: "Categoria atualizada com sucesso",
          description: "A categoria foi atualizada com sucesso."
        });
      }
      
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error('Error saving category:', error);
      
      let errorMessage = "Ocorreu um erro ao salvar a categoria.";
      if (error.code === '23505') {
        errorMessage = "Já existe uma categoria com esse nome ou slug. Por favor, escolha outro.";
      }
      
      toast({
        title: "Erro ao salvar categoria",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const openDeleteDialog = (category: Category) => {
    setCategoryToDelete(category);
  };
  
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    
    try {
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', categoryToDelete.id);
      
      if (error) throw error;
      
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      
      toast({
        title: "Categoria excluída com sucesso",
        description: "A categoria foi excluída permanentemente."
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Erro ao excluir categoria",
        description: "Ocorreu um erro ao excluir a categoria.",
        variant: "destructive"
      });
    } finally {
      setCategoryToDelete(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Categorias do Blog | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categorias do Blog</h1>
          <p className="text-muted-foreground">
            Gerencie as categorias para organizar os posts do blog.
          </p>
        </div>
        
        <Button onClick={openCreateDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Nova Categoria
        </Button>
      </div>
      
      {/* Categories table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Nome</TableHead>
              <TableHead className="hidden md:table-cell">Slug</TableHead>
              <TableHead className="hidden md:table-cell">Descrição</TableHead>
              <TableHead className="w-[150px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{category.slug}</TableCell>
                  <TableCell className="hidden md:table-cell">{category.description || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(category)}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(category)}
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {formMode === 'create' ? 'Nova Categoria' : 'Editar Categoria'}
            </DialogTitle>
            <DialogDescription>
              {formMode === 'create' 
                ? 'Crie uma nova categoria para organizar seus posts.'
                : 'Edite os detalhes da categoria selecionada.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Nome da categoria"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleFormChange}
                placeholder="slug-da-categoria"
              />
              <p className="text-sm text-muted-foreground">
                O slug é usado na URL da categoria. Use apenas letras minúsculas, números e hífens.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Descrição da categoria (opcional)"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCategory} disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!categoryToDelete} onOpenChange={(open) => !open && setCategoryToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Você está prestes a excluir a categoria "{categoryToDelete?.name}". Esta ação não pode ser desfeita.
              {'\n\n'}
              Obs: Os posts associados a esta categoria não serão excluídos, mas ficarão sem categoria.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogCategoriesPage;
