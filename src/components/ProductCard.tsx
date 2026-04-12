'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
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
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold tracking-tight group-hover:text-brand-neon transition-colors">
            {product.name}
          </h3>
          <span className="text-2xl font-black italic">
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
