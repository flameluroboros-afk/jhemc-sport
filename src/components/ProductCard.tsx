'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Eye, Heart } from 'lucide-react';
import { Product, useCart } from '@/lib/store';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [imageSrc, setImageSrc] = useState(product.image || PLACEHOLDER_IMAGE);

  return (
    <div className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-500 hover:border-brand-neon/30 hover:shadow-[0_0_40px_rgba(204,255,0,0.15)] flex flex-col h-full">
      {/* Badge container */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.onSale && (
          <span className="px-3 py-1 bg-brand-neon text-brand-dark text-[10px] font-black italic uppercase tracking-widest">
            OFFER
          </span>
        )}
        <span className="px-3 py-1 bg-white/5 backdrop-blur-md text-white text-[10px] font-black italic uppercase tracking-widest border border-white/10">
          Hype: 🔥 High
        </span>
      </div>

      {/* Image container with interactions */}
      <div className="relative aspect-[4/5] bg-[#111] overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImageSrc(PLACEHOLDER_IMAGE)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick View & Wishlist Actions */}
        <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 flex flex-col gap-2 z-30">
          <button className="w-10 h-10 bg-white text-brand-dark flex items-center justify-center rounded-none hover:bg-brand-neon transition-colors shadow-xl">
            <Heart size={18} />
          </button>
          <button className="w-10 h-10 bg-white text-brand-dark flex items-center justify-center rounded-none hover:bg-brand-neon transition-colors shadow-xl">
            <Eye size={18} />
          </button>
        </div>

        {/* Size Peek Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-brand-dark/95 backdrop-blur-xl border-t border-brand-neon/20 z-40">
          <span className="text-[10px] text-brand-neon font-black uppercase tracking-[0.3em] mb-3 block italic">Quick Size Select</span>
          <div className="flex flex-wrap gap-2">
            {product.sizes.slice(0, 5).map((size) => (
              <button 
                key={size} 
                onClick={(e) => {
                  e.stopPropagation();
                  addItem(product, size);
                }}
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-[10px] font-bold hover:bg-brand-neon hover:text-brand-dark hover:border-brand-neon transition-all"
              >
                {size}
              </button>
            ))}
            <Link 
              href={`/product/${product.id}`}
              className="w-10 h-10 flex items-center justify-center border border-white/10 text-[10px] font-bold hover:bg-white hover:text-brand-dark transition-all"
            >
              +
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <span className="text-[10px] text-brand-neon font-black uppercase tracking-[0.25em] mb-1 block italic opacity-80">{product.category}</span>
            <h3 className="font-oswald font-black italic text-xl text-white uppercase tracking-tight group-hover:text-brand-neon transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
        </div>
        
        <div className="mt-auto flex justify-between items-end">
          <div className="flex flex-col">
            {product.onSale && (
              <span className="text-white/20 line-through text-[10px] font-bold font-oswald italic uppercase tracking-widest">
                S/ {(product.price + 120).toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-oswald font-black italic text-brand-neon leading-none mt-1">
              S/ {product.price.toFixed(2)}
            </span>
          </div>
          
          <button 
            onClick={() => addItem(product, product.sizes[0])}
            className="w-12 h-12 bg-white text-brand-dark hover:bg-brand-neon transition-all hover:scale-110 active:scale-90 flex items-center justify-center"
            title="Añadir al carrito"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
