'use client';

import { useParams, useRouter } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/constants/mock-data';
import { useCart } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, ArrowLeft, ShieldCheck, Box, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const addItem = useCart((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return (
      <div className="pt-40 text-center">
        <h1 className="text-4xl font-black italic">PRODUCTO NO ENCONTRADO</h1>
        <Link href="/catalog" className="text-brand-neon font-bold mt-4 block">Volver al catálogo</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecciona una talla');
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/catalog" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-8 font-bold italic tracking-tight uppercase">
        <ArrowLeft size={16} className="mr-2" />
        VOLVER AL CATÁLOGO
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="relative aspect-square glass border border-white/10 overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <div className="absolute top-6 left-6 px-3 py-1 bg-brand-neon text-brand-dark font-black text-xs italic tracking-widest">
            {product.category}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-none mb-4 uppercase">
            {product.name}
          </h1>
          <p className="text-4xl font-black italic text-brand-neon mb-8">
            {formatCurrency(product.price)}
          </p>

          <p className="text-lg text-white/60 mb-10 font-medium leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-10">
            <h3 className="text-sm font-black italic tracking-widest text-white/40 mb-4">SELECCIONAR TALLA</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 flex items-center justify-center font-black italic border transition-all ${
                    selectedSize === size
                      ? 'bg-brand-neon text-brand-dark border-brand-neon shadow-[0_0_15px_rgba(204,255,0,0.5)]'
                      : 'bg-transparent text-white border-white/10 hover:border-white/30'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <button 
            onClick={handleAddToCart}
            className="w-full py-6 bg-brand-neon text-brand-dark font-black tracking-tighter italic text-xl flex items-center justify-center group mb-6 hover:scale-[1.02] transition-transform"
          >
            AÑADIR AL EQUIPO
            <ShoppingCart size={24} className="ml-3 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 mt-auto">
            <div className="flex flex-col items-center text-center">
              <Zap size={24} className="text-brand-neon mb-3" />
              <span className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">ALTO IMPACTO</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck size={24} className="text-brand-accent mb-3" />
              <span className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">DURABILIDAD PRO</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Box size={24} className="text-white/60 mb-3" />
              <span className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">ENVÍO RÁPIDO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
