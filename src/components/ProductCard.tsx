'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Eye, Heart } from 'lucide-react';
import { Product, useCart } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <div className="group relative bg-brand-gray border border-white/5 overflow-hidden transition-all hover:border-brand-neon/30">
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-brand-dark/80 backdrop-blur-md border border-white/10">
        <span className="text-[10px] font-black tracking-widest text-brand-neon uppercase">
          {product.category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60" />
        
        {/* Resource-inspired Overlays */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-12 h-12 bg-white text-brand-dark rounded-full flex items-center justify-center hover:bg-brand-neon transition-colors shadow-2xl">
            <Eye size={20} />
          </button>
          <button className="w-12 h-12 bg-white text-brand-dark rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-2xl">
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-oswald text-xl font-bold tracking-tight group-hover:text-brand-neon transition-colors uppercase">
            {product.name}
          </h3>
          <span className="font-oswald text-2xl font-black italic">
            {formatCurrency(product.price)}
          </span>
        </div>
        
        <p className="text-white/50 text-sm line-clamp-2 mb-6 font-medium">
          {product.description}
        </p>

        <div className="flex space-x-2">
          <Link 
            href={`/product/${product.id}`}
            className="flex-1 py-3 bg-white/5 text-white text-xs font-black tracking-tighter italic flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors group/btn"
          >
            DETALLES
            <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <button 
            onClick={() => addItem(product, product.sizes[0])}
            className="p-3 bg-brand-neon text-brand-dark hover:scale-105 transition-transform"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
