
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
}

const AnimatedButton = ({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: AnimatedButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const baseClass = "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-out-expo";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };
  
  const variantClasses = {
    default: "bg-toti-navy text-white hover:shadow-subtle hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-toti-teal text-white hover:shadow-subtle hover:scale-[1.02] active:scale-[0.98]",
    outline: "bg-transparent border border-toti-navy text-toti-navy hover:bg-toti-navy/5 hover:scale-[1.02] active:scale-[0.98]"
  };

  return (
    <button
      className={cn(
        baseClass,
        sizeClasses[size],
        variantClasses[variant],
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
    </button>
  );
};

export default AnimatedButton;
