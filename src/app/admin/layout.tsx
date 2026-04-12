'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Settings,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'DASHBOARD', href: '/admin', icon: BarChart3 },
    { name: 'INVENTARIO', href: '/admin/inventory', icon: Package },
    { name: 'PEDIDOS', href: '/admin/orders', icon: ShoppingBag },
    { name: 'AJUSTES', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Admin Sub-Header */}
      <div className="fixed top-16 w-full z-40 bg-brand-gray/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-brand-neon">
            <ShieldCheck size={18} />
            <span className="font-black italic tracking-tighter text-sm uppercase">ADMIN SESSION: ACTIVE</span>
          </div>
          <nav className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 text-[10px] font-black italic tracking-widest transition-colors",
                  pathname === item.href ? "text-brand-neon" : "text-white/40 hover:text-white"
                )}
              >
                <item.icon size={14} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="pt-10">
        {children}
      </div>
    </div>
  );
}
