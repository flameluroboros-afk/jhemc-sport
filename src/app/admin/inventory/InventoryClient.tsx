'use client';

import { formatCurrency } from "@/lib/utils";
import { Plus, Search, Edit2, Trash2, MoreHorizontal, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/lib/store";

interface InventoryClientProps {
  products: Product[];
  categories: string[];
}

export default function InventoryClient({ products, categories }: InventoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <Link href="/admin" className="flex items-center text-white/40 hover:text-brand-neon mb-4 font-bold italic tracking-tight text-xs uppercase transition-colors">
            <ArrowLeft size={14} className="mr-2" />
            VOLVER AL DASHBOARD
          </Link>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">INVENTARIO</h1>
        </div>
        <button className="flex items-center space-x-2 px-8 py-4 bg-brand-neon text-brand-dark font-black italic text-sm hover:scale-105 transition-transform uppercase">
          <Plus size={20} />
          <span>AÑADIR PRODUCTO</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-neon transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="BUSCAR EQUIPO POR NOMBRE O CATEGORÍA..."
            className="w-full bg-brand-gray border border-white/5 py-4 pl-12 pr-4 text-sm font-bold italic outline-none focus:border-brand-neon/50 transition-all placeholder:text-white/20 uppercase"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-brand-gray border border-white/5 px-6 py-4 text-xs font-black italic appearance-none cursor-pointer hover:border-white/20 transition-all outline-none uppercase tracking-widest leading-none">
            <option>TODAS LAS CATEGORÍAS</option>
            {categories.map(cat => (
              <option key={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5 text-[10px] font-black tracking-widest text-white/40 uppercase italic">
              <tr>
                <th className="px-6 py-4">PRODUCTO</th>
                <th className="px-6 py-4 text-right">PRECIO</th>
                <th className="px-6 py-4 text-right">STOCK</th>
                <th className="px-6 py-4 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12 bg-brand-dark border border-white/10 overflow-hidden">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="block font-black italic text-sm group-hover:text-brand-neon transition-colors uppercase tracking-tightleading-none">{product.name}</span>
                        <span className="text-[9px] font-black italic text-white/30 tracking-widest uppercase">{product.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black italic text-brand-neon text-right">{formatCurrency(product.price)}</td>
                  <td className="px-6 py-4 font-black italic text-right">
                    <span className={(product as any).stock <= 5 ? "text-destructive" : "text-white"}>
                      {(product as any).stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-2 hover:bg-white/5 text-white/40 hover:text-white transition-all"><Edit2 size={16} /></button>
                       <button className="p-2 hover:bg-white/5 text-white/40 hover:text-destructive transition-all"><Trash2 size={16} /></button>
                       <button className="p-2 hover:bg-white/5 text-white/40 hover:text-brand-neon transition-all"><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
