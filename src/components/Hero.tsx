import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark pt-16">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-neon/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 group cursor-pointer hover:bg-white/10 transition-colors">
          <span className="text-[10px] font-black tracking-widest text-brand-neon">NEW SEASON</span>
          <div className="w-1 h-1 bg-white/20 rounded-full" />
          <span className="text-[10px] font-bold text-white/60">VER COLECCIÓN</span>
          <ArrowRight size={12} className="text-brand-neon group-hover:translate-x-1 transition-transform" />
        </div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter italic leading-none mb-8">
          EL PODER DE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-accent">
            SUPERARTE
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 font-medium">
          Equipamiento de alto rendimiento diseñado para atletas que no conocen los límites. 
          Ropa técnica y calzado que redefine tu potencial.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            href="/catalog" 
            className="w-full sm:w-auto px-10 py-5 bg-brand-neon text-brand-dark font-black tracking-tighter italic text-lg rounded-none hover:scale-105 transition-transform flex items-center justify-center group"
          >
            COMPRAR AHORA
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center space-x-3 text-white font-bold hover:text-brand-neon transition-colors group">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-neon transition-colors">
              <Play size={20} fill="currentColor" />
            </div>
            <span>VER MANIFIESTO</span>
          </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="absolute bottom-10 left-0 w-full px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-end border-t border-white/10 pt-8 text-white/30 font-black italic text-4xl">
          <span>HIGH PERFORMANCE</span>
          <span>EST. 2024</span>
          <span>NEXT GEN SPORT</span>
        </div>
      </div>
    </section>
  );
}
