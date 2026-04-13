'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'DASHBOARD', href: '/admin', icon: BarChart3 },
    { name: 'INVENTARIO', href: '/admin/inventory', icon: Package },
    { name: 'CATEGORÍAS', href: '/admin/categories', icon: ShieldCheck },
    { name: 'PEDIDOS', href: '/admin/orders', icon: ShoppingBag },
    { name: 'AJUSTES', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-dark flex">
      {/* Sidebar Principal */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-brand-gray border-r border-white/5 z-50 flex flex-col pt-20">
        <div className="px-6 mb-12">
           <div className="flex items-center space-x-2 text-brand-neon p-4 bg-brand-neon/5 border border-brand-neon/20">
             <ShieldCheck size={18} />
             <span className="font-oswald font-black italic tracking-tighter text-sm uppercase">ADMIN SESSION</span>
           </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between group px-4 py-4 font-oswald font-black italic tracking-tight text-sm transition-all",
                pathname === item.href 
                  ? "bg-brand-neon text-brand-dark" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon size={20} />
                <span>{item.name}</span>
              </div>
              <ChevronRight size={16} className={cn("opacity-0 group-hover:opacity-100 transition-opacity", pathname === item.href && "opacity-100 text-brand-dark")} />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
           <Link 
             href="/"
             className="flex items-center space-x-3 px-4 py-4 font-oswald font-black italic tracking-tight text-sm text-white/40 hover:text-destructive transition-colors"
           >
             <LogOut size={20} />
             <span>SALIR DEL PANEL</span>
           </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen bg-brand-dark">
        {/* Top Navbar for Context */}
        <header className="fixed top-0 right-0 left-64 h-20 bg-brand-dark/50 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-10">
           <div className="flex items-center space-x-4">
              <span className="text-[10px] font-black italic text-brand-neon tracking-widest uppercase bg-brand-neon/10 px-2 py-1">JHEMC CONTROL CENTER</span>
           </div>
           <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs font-black italic uppercase leading-none mb-1">EDWARD ADMIN</p>
                <p className="text-[9px] font-black italic text-brand-neon tracking-widest uppercase">SUPER USER</p>
              </div>
              <div className="w-10 h-10 bg-brand-neon rounded-none flex items-center justify-center font-black italic text-brand-dark">EA</div>
           </div>
        </header>

        <div className="pt-20">
          {children}
        </div>
      </main>
    </div>
  );
}
