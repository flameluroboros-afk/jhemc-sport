'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-brand-gray border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-oswald font-black italic tracking-tighter uppercase">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 transition-colors text-white/40 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
