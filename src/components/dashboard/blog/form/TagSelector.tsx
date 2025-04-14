
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormDescription } from '@/components/ui/form';
import { Tag } from '@/types/blog';

interface TagSelectorProps {
  allTags: Tag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
}

const TagSelector = ({ allTags, selectedTags, onTagToggle }: TagSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-4 border rounded-md">
        {allTags.length > 0 ? (
          allTags.map(tag => (
            <Button
              key={tag.id}
              type="button"
              variant={selectedTags.includes(tag.id) ? "default" : "outline"}
              size="sm"
              onClick={() => onTagToggle(tag.id)}
            >
              {tag.name}
            </Button>
          ))
        ) : (
          <p className="text-muted-foreground">Nenhuma tag disponível.</p>
        )}
      </div>
      <FormDescription>
        Selecione uma ou mais tags relacionadas ao conteúdo do post.
      </FormDescription>
    </div>
  );
};

export default TagSelector;
