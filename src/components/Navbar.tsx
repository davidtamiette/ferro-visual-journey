
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';
import ThemeToggle from './ui/ThemeToggle';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Contato', href: '#contact' },
  ];

  // Track scrolling for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo',
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-toti-navy/80 backdrop-blur-md shadow-subtle' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <span className="text-xl font-bold text-toti-navy dark:text-white">Ferro Velho <span className="text-toti-teal">Toti</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-toti-navy/80 dark:text-white/80 hover:text-toti-navy dark:hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-toti-teal after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
          
          <ThemeToggle className="mr-2" />
          
          <AnimatedButton size="sm" glass>Solicitar Orçamento</AnimatedButton>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          
          <button
            className="text-toti-navy dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-white/90 dark:bg-toti-navy/95 backdrop-blur-lg z-40 flex flex-col pt-24 px-6 transition-transform duration-500 ease-out-expo md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col space-y-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-medium text-toti-navy/90 dark:text-white/90 hover:text-toti-navy dark:hover:text-white py-2 border-b border-toti-navy/10 dark:border-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <AnimatedButton className="mt-4" glass onClick={() => setIsMenuOpen(false)}>
            Solicitar Orçamento
          </AnimatedButton>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
