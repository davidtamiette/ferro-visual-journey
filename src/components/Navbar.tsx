
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';
import ThemeToggle from './ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Contato', href: '/contato' },
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

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

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
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-toti-navy dark:text-white">Ferro Velho <span className="text-toti-teal">Toti</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium hover:text-toti-navy dark:hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-toti-teal after:transition-all after:duration-300",
                isActive(link.href) 
                  ? "text-toti-navy dark:text-white after:w-full" 
                  : "text-toti-navy/80 dark:text-white/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <ThemeToggle className="mr-2" />
          
          <Link to="/contato">
            <AnimatedButton size="sm" glass>Solicitar Orçamento</AnimatedButton>
          </Link>
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
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-xl font-medium py-2 border-b border-toti-navy/10 dark:border-white/10",
                isActive(link.href)
                  ? "text-toti-navy dark:text-white" 
                  : "text-toti-navy/90 dark:text-white/90 hover:text-toti-navy dark:hover:text-white"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
            <AnimatedButton className="mt-4" glass>
              Solicitar Orçamento
            </AnimatedButton>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
