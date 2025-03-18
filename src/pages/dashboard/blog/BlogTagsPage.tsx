
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Tag } from '@/types/blog';
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
import { useToast } from '@/hooks/use-toast';

interface TagFormData {
  id?: string;
  name: string;
  slug: string;
}

const BlogTagsPage = () => {
  const { toast } = useToast();
  
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<TagFormData>({
    name: '',
    slug: '',
  });
  
  useEffect(() => {
    fetchTags();
  }, []);
  
  const fetchTags = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      setTags(data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast({
        title: "Erro ao carregar tags",
        description: "Ocorreu um erro ao carregar as tags do blog.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    });
    setIsDialogOpen(true);
  };
  
  const openEditDialog = (tag: Tag) => {
    setFormMode('edit');
    setFormData({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    });
    setIsDialogOpen(true);
  };
  
  const handleSaveTag = async () => {
    // Validate form data
    if (!formData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "O nome da tag é obrigatório.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.slug.trim()) {
      toast({
        title: "Slug obrigatório",
        description: "O slug da tag é obrigatório.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      if (formMode === 'create') {
        // Create new tag
        const { data, error } = await supabase
          .from('blog_tags')
          .insert({
            name: formData.name,
            slug: formData.slug,
          })
          .select()
          .single();
        
        if (error) throw error;
        
        setTags([...tags, data]);
        
        toast({
          title: "Tag criada com sucesso",
          description: "A nova tag foi criada com sucesso."
        });
      } else {
        // Update existing tag
        const { data, error } = await supabase
          .from('blog_tags')
          .update({
            name: formData.name,
            slug: formData.slug,
          })
          .eq('id', formData.id)
          .select()
          .single();
        
        if (error) throw error;
        
        setTags(tags.map(t => 
          t.id === data.id ? data : t
        ));
        
        toast({
          title: "Tag atualizada com sucesso",
          description: "A tag foi atualizada com sucesso."
        });
      }
      
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error('Error saving tag:', error);
      
      let errorMessage = "Ocorreu um erro ao salvar a tag.";
      if (error.code === '23505') {
        errorMessage = "Já existe uma tag com esse nome ou slug. Por favor, escolha outro.";
      }
      
      toast({
        title: "Erro ao salvar tag",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const openDeleteDialog = (tag: Tag) => {
    setTagToDelete(tag);
  };
  
  const handleDeleteTag = async () => {
    if (!tagToDelete) return;
    
    try {
      const { error } = await supabase
        .from('blog_tags')
        .delete()
        .eq('id', tagToDelete.id);
      
      if (error) throw error;
      
      setTags(tags.filter(t => t.id !== tagToDelete.id));
      
      toast({
        title: "Tag excluída com sucesso",
        description: "A tag foi excluída permanentemente."
      });
    } catch (error) {
      console.error('Error deleting tag:', error);
      toast({
        title: "Erro ao excluir tag",
        description: "Ocorreu um erro ao excluir a tag.",
        variant: "destructive"
      });
    } finally {
      setTagToDelete(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Tags do Blog | Dashboard | Ferro Velho Toti</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tags do Blog</h1>
          <p className="text-muted-foreground">
            Gerencie as tags para organizar os posts do blog.
          </p>
        </div>
        
        <Button onClick={openCreateDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Nova Tag
        </Button>
      </div>
      
      {/* Tags table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Nome</TableHead>
              <TableHead>Slug</TableHead>
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
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : tags.length > 0 ? (
              tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                  <TableCell>{tag.slug}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(tag)}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(tag)}
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
                <TableCell colSpan={3} className="h-24 text-center">
                  Nenhuma tag encontrada.
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
              {formMode === 'create' ? 'Nova Tag' : 'Editar Tag'}
            </DialogTitle>
            <DialogDescription>
              {formMode === 'create' 
                ? 'Crie uma nova tag para classificar seus posts.'
                : 'Edite os detalhes da tag selecionada.'}
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
                placeholder="Nome da tag"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleFormChange}
                placeholder="slug-da-tag"
              />
              <p className="text-sm text-muted-foreground">
                O slug é usado na URL da tag. Use apenas letras minúsculas, números e hífens.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTag} disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!tagToDelete} onOpenChange={(open) => !open && setTagToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Você está prestes a excluir a tag "{tagToDelete?.name}". Esta ação não pode ser desfeita.
              {'\n\n'}
              Os posts associados a esta tag continuarão existindo, mas perderão esta classificação.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTagToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteTag}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogTagsPage;
