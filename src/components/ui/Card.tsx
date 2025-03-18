
import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/lib/animations';

interface CardProps {
  className?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  animationDirection?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number; // in milliseconds
}

const Card = ({
  className,
  title,
  subtitle,
  children,
  animationDirection = 'up',
  delay = 0
}: CardProps) => {
  const { ref, isVisible } = useScrollAnimation();
  
  const animationClasses = {
    up: 'animate-fade-in-up',
    down: 'animate-fade-in-down',
    left: 'animate-fade-in-left',
    right: 'animate-fade-in-right',
    none: 'animate-fade-in'
  };
  
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'toti-card p-6 md:p-8',
        isVisible ? animationClasses[animationDirection] : 'opacity-0',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {subtitle && <div className="toti-subtitle mb-2">{subtitle}</div>}
      {title && <h3 className="text-xl md:text-2xl font-bold mb-4 text-toti-navy">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
