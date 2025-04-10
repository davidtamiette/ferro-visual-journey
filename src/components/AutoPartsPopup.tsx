
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AutoPartsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasShownPopup = sessionStorage.getItem('autoPartsPopupShown');
    
    if (!hasShownPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark popup as shown for this session
    sessionStorage.setItem('autoPartsPopupShown', 'true');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      onClick={handleClose}
    >
      <div 
        className="bg-white dark:bg-toti-navy max-w-md w-full rounded-2xl shadow-elevated p-6 relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-toti-navy dark:hover:text-white"
          onClick={handleClose}
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-toti-navy dark:text-white">Aviso Importante</h3>
        </div>
        
        <p className="text-toti-slate dark:text-gray-300 text-center mb-6">
          Ferro Velho Toti <strong>não trabalha com sucata de automóveis</strong>. Somos especializados em reciclagem de metais para empresas e indústrias.
        </p>
        
        <div className="text-center">
          <button 
            className="toti-btn-secondary w-full"
            onClick={handleClose}
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoPartsPopup;
