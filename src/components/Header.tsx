'use client';

import Link from 'next/link';
import { ShoppingCart, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useCart((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-oswald font-black tracking-tighter italic text-brand-neon">
              JHEMC<span className="text-white">SPORT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-brand-neon transition-colors">
              INICIO
            </Link>
            <Link href="/catalog" className="text-sm font-medium hover:text-brand-neon transition-colors">
              CATÁLOGO
            </Link>

          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-brand-neon text-brand-dark text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-white/5 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden glass border-b border-white/10 transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-64 border-t border-white/10" : "max-h-0"
      )}>
        <div className="px-4 pt-2 pb-6 space-y-4">
          <Link href="/" className="block text-lg font-bold" onClick={() => setIsOpen(false)}>INICIO</Link>
          <Link href="/catalog" className="block text-lg font-bold" onClick={() => setIsOpen(false)}>CATÁLOGO</Link>

        </div>
      </div>
    </header>
  );
}
