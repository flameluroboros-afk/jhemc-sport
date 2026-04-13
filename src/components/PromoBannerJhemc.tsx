import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PromoBannerJhemc = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banner 1 */}
        <div className="group relative overflow-hidden bg-brand-gray h-[400px] border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-transparent z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1000&auto=format&fit=crop" 
            alt="PROMO 1" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
          />
          <div className="relative z-20 h-full flex flex-col justify-center p-12">
            <span className="text-brand-neon font-black tracking-widest text-xs italic uppercase mb-4">COLECCIÓN URBANA</span>
            <h3 className="font-oswald text-4xl font-black italic tracking-tighter mb-6 uppercase">ESTILO SIN <br /> LÍMITES</h3>
            <Link 
              href="/catalog?cat=Ropa" 
              className="w-fit px-8 py-3 bg-white text-brand-dark font-black italic text-sm hover:bg-brand-neon transition-colors"
            >
              DESCUBRIR
            </Link>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="group relative overflow-hidden bg-brand-gray h-[400px] border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-l from-brand-dark to-transparent z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=1000&auto=format&fit=crop" 
            alt="PROMO 2" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
          />
          <div className="relative z-20 h-full flex flex-col justify-center items-end p-12 text-right">
            <span className="text-brand-neon font-black tracking-widest text-xs italic uppercase mb-4">ACCESORIOS PRO</span>
            <h3 className="font-oswald text-4xl font-black italic tracking-tighter mb-6 uppercase">DETALLES QUE <br /> MARCAN DIFERENCIA</h3>
            <Link 
              href="/catalog?cat=Accesorios" 
              className="w-fit px-8 py-3 bg-brand-neon text-brand-dark font-black italic text-sm hover:bg-white transition-colors"
            >
              VER MÁS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerJhemc;
