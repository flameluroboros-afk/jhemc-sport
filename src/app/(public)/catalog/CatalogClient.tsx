'use client';

import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/store';

interface CatalogProps {
  products: Product[];
  categories: string[];
}

export default function CatalogClient({ products, categories }: CatalogProps) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'Todos';
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <span className="text-brand-neon font-black tracking-widest text-xs italic uppercase">COLECCIÓN 2024</span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mt-2">EQUIPAMIENTO</h1>
        </div>
        <div className="flex items-center space-x-2 text-white/40 uppercase font-black italic text-xs tracking-widest">
          <SlidersHorizontal size={14} />
          <span>{filteredProducts.length} PRODUCTOS ENCONTRADOS</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-8">
        <button
          onClick={() => setActiveCategory('Todos')}
          className={cn(
            "px-6 py-2 text-xs font-black italic tracking-tighter border transition-all",
            activeCategory === 'Todos' 
              ? "bg-brand-neon text-brand-dark border-brand-neon" 
              : "bg-transparent text-white border-white/20 hover:border-brand-neon/50"
          )}
        >
          TODOS
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-2 text-xs font-black italic tracking-tighter border transition-all uppercase",
              activeCategory === cat 
                ? "bg-brand-neon text-brand-dark border-brand-neon" 
                : "bg-transparent text-white border-white/20 hover:border-brand-neon/50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center glass border border-white/5">
            <p className="text-white/40 font-bold italic uppercase">NO SE ENCONTRARON PRODUCTOS EN ESTA CATEGORÍA.</p>
          </div>
        )}
      </div>
    </div>
  );
}
