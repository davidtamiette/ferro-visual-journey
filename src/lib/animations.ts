
import { useEffect, useState, useRef } from 'react';

// Hook to manage scroll-triggered animations
export function useScrollAnimation() {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

// Hook to create staggered animations for children
export function useStaggeredAnimation(
  totalItems: number,
  staggerMs: number = 100
) {
  return Array.from({ length: totalItems }).map((_, i) => ({
    style: {
      animationDelay: `${i * staggerMs}ms`,
      opacity: 0,
    },
  }));
}

// Create a random delay for more natural looking animations
export function randomDelay(min: number, max: number): string {
  return `${Math.floor(Math.random() * (max - min) + min)}ms`;
}

// Get animation classes based on visibility
export function getAnimationClass(
  isVisible: boolean,
  animationType: string = 'fade-in'
): string {
  return isVisible ? `animate-${animationType}` : 'opacity-0';
}
