
import React, { useState, forwardRef, ElementType } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
  glass?: boolean;
  as?: ElementType;
  to?: string;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(({
  className,
  variant = 'default',
  size = 'default',
  children,
  glass = false,
  as: Component = 'button',
  ...props
}, ref) => {
  const [isHovering, setIsHovering] = useState(false);

  const baseClass = "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-out-expo";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };
  
  const variantClasses = {
    default: "bg-toti-navy text-white hover:shadow-subtle hover:scale-[1.02] active:scale-[0.98] dark:bg-toti-navy/90",
    secondary: "bg-toti-teal text-white hover:shadow-subtle hover:scale-[1.02] active:scale-[0.98]",
    outline: "bg-transparent border border-toti-navy text-toti-navy hover:bg-toti-navy/5 hover:scale-[1.02] active:scale-[0.98] dark:border-white dark:text-white dark:hover:bg-white/5"
  };

  const glassClass = glass ? "backdrop-blur-md bg-white/10 border border-white/20 dark:bg-black/20 dark:border-white/10" : "";

  return (
    <Component
      ref={ref}
      className={cn(
        baseClass,
        sizeClasses[size],
        glass ? glassClass : variantClasses[variant],
        "group",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <span className={cn(
        "transition-all duration-300 ease-out-expo",
        isHovering ? "-translate-y-0.5" : ""
      )}>
        {children}
      </span>
      
      <span 
        className={cn(
          "absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-all duration-300",
          isHovering ? "opacity-100" : ""
        )} 
        aria-hidden="true"
      />
    </Component>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
