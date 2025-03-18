
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StatusFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
  const handleValueChange = (newValue: string) => {
    if (newValue === 'all') {
      onChange(null);
    } else {
      onChange(newValue);
    }
  };

  return (
    <Select 
      value={value || 'all'} 
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filtrar por status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="draft">Rascunho</SelectItem>
          <SelectItem value="published">Publicado</SelectItem>
          <SelectItem value="archived">Arquivado</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
