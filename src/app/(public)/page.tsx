import SneakerHero from "@/components/SneakerHero";
import TechSpotlight from "@/components/TechSpotlight";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import NewsletterJhemc from "@/components/NewsletterJhemc";
import TrustBadges from "@/components/TrustBadges";
import PromotionalBanner from "@/components/PromoBannerJhemc";
import CountdownSale from "@/components/CountdownSale";
import TestimonialsJhemc from "@/components/TestimonialsJhemc";
import { Reveal } from "@/components/Reveal";

export const dynamic = 'force-dynamic';

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
      <SneakerHero />
      
      {/* Hype Marquee */}
      <Reveal>
        <div className="bg-brand-neon py-4 overflow-hidden -rotate-1 scale-105 border-y-2 border-brand-dark z-20 relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="flex items-center mx-4">
                <span className="text-brand-dark font-oswald font-black italic text-2xl uppercase tracking-tighter mx-8">NEW DROP OUT NOW</span>
                <span className="text-brand-dark opacity-30 text-2xl">⚡</span>
                <span className="text-brand-dark font-oswald font-black italic text-2xl uppercase tracking-tighter mx-8">LIMITED EDITION</span>
                <span className="text-brand-dark opacity-30 text-2xl">⚡</span>
                <span className="text-brand-dark font-oswald font-black italic text-2xl uppercase tracking-tighter mx-8">JHEMC SPORT ÉLITE</span>
                <span className="text-brand-dark opacity-30 text-2xl">⚡</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="relative z-10 -mt-10">
        <Reveal><TrustBadges /></Reveal>
      </div>

      <TechSpotlight />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Reveal>
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
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} />
            </Reveal>
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
              <h3 className="text-5xl font-black italic tracking-tighter mb-4 text-white uppercase">CALZADO</h3>
              <Link href="/catalog?cat=Calzado" className="px-6 py-3 bg-brand-neon text-brand-dark font-black italic text-sm hover:translate-x-2 transition-transform inline-block uppercase">
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

      <PromotionalBanner />

      <CountdownSale />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="flex flex-col md:flex-row items-center justify-between border-y border-white/5 py-12 gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-black italic tracking-tighter mb-2">SOPORTE DIRECTO POR WHATSAPP</h2>
            <p className="text-white/60 font-medium">¿Tienes dudas sobre tu talla o pedido? Escríbenos.</p>
          </div>
          <a 
            href="https://wa.me/yournumber" 
            target="_blank"
            className="flex items-center space-x-3 px-8 py-4 bg-[#25D366] text-white font-black italic rounded-none hover:scale-105 transition-transform"
          >
            <span>HABLAR CON UN ASESOR</span>
          </a>
        </div>
      </section>

      <TestimonialsJhemc />

      <NewsletterJhemc />
    </div>
  );
}
