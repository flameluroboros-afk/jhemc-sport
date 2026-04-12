import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 4,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  const featuredProducts = products.map(p => ({
    ...p,
    category: p.category.name,
    sizes: p.sizes.split(',')
  }));


  return (
    <div className="bg-brand-dark pb-20">
      <Hero />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-brand-neon font-black tracking-widest text-xs italic uppercase">DROPS RECIENTES</span>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mt-2">PRODUCTOS DESTACADOS</h2>
          </div>
          <Link href="/catalog" className="hidden md:flex items-center space-x-2 text-white/60 hover:text-brand-neon transition-colors font-bold italic tracking-tight">
            <span>VER TODO EL CATÁLOGO</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
          <div className="group relative overflow-hidden bg-brand-gray border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
              alt="Calzado"
            />
            <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/20 transition-colors" />
            <div className="absolute bottom-10 left-10">
              <h3 className="text-5xl font-black italic tracking-tighter mb-4 text-white">CALZADO</h3>
              <Link href="/catalog?cat=Calzado" className="px-6 py-3 bg-brand-neon text-brand-dark font-black italic text-sm hover:translate-x-2 transition-transform inline-block">
                EXPLORAR
              </Link>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-6">
            <div className="group relative overflow-hidden bg-brand-gray border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
                alt="Ropa"
              />
              <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/20 transition-colors" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-black italic tracking-tighter mb-2">ROPA TÉCNICA</h3>
                <Link href="/catalog?cat=Ropa" className="text-brand-neon font-black italic text-xs tracking-widest hover:pl-2 transition-all">VER MÁS</Link>
              </div>
            </div>
            <div className="group relative overflow-hidden bg-brand-gray border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
                alt="Accesorios"
              />
              <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/20 transition-colors" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-black italic tracking-tighter mb-2">ACCESORIOS</h3>
                <Link href="/catalog?cat=Accesorios" className="text-brand-neon font-black italic text-xs tracking-widest hover:pl-2 transition-all">VER MÁS</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
