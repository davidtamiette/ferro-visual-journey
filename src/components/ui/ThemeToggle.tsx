
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from './toggle';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Only show the toggle after component is mounted (to avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    // Force the theme update to be synchronous
    setTheme(theme === 'dark' ? 'light' : 'dark');
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  if (!mounted) return null;

  return (
    <Toggle 
      variant="outline" 
      size="sm"
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      className={cn(
        "relative p-2 rounded-full transition-colors hover:bg-muted",
        className
      )}
      aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
    >
      <Sun className={cn(
        "h-4 w-4 absolute transition-all duration-500 rotate-0 scale-100",
        theme === 'dark' ? "opacity-0 scale-0 -rotate-90" : "opacity-100",
        isAnimating && "animate-spin"
      )} />
      <Moon className={cn(
        "h-4 w-4 absolute transition-all duration-500 rotate-90 scale-0",
        theme === 'dark' ? "opacity-100 scale-100 rotate-0" : "opacity-0",
        isAnimating && "animate-spin"
      )} />
      <span className="sr-only">{theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}</span>
    </Toggle>
  );
};

export default ThemeToggle;
