"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Target, ShieldCheck } from "lucide-react";

const SneakerHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springY1 = useSpring(y1, springConfig);
  const springRotate = useSpring(rotate, springConfig);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark pt-20"
    >
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/50 to-brand-dark" />

      {/* Large Decorative Text (Behind Sneaker) */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0"
      >
        <h2 className="font-oswald text-[20vw] font-black italic text-white/[0.03] uppercase leading-none tracking-tighter">
          UNSTOPPABLE
        </h2>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content side */}
          <div className="relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-neon/10 border border-brand-neon/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] text-brand-neon uppercase italic">DROP: JHEMC-01 VOLT</span>
              </div>

              <h1 className="font-oswald text-7xl md:text-9xl font-black italic tracking-tighter leading-[0.85] mb-8 uppercase text-white">
                EL PODER DE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-white to-brand-accent">
                  SUPERARTE
                </span>
              </h1>

              <p className="max-w-xl text-lg md:text-xl text-white/50 mb-12 font-medium leading-relaxed italic">
                Diseñadas para la élite. La tecnología JHEMC-ULTRA reactiva cada paso, 
                convirtiendo el impacto en propulsión pura. Estilo que no entiende de límites.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link 
                  href="/catalog" 
                  className="w-full sm:w-auto px-12 py-5 bg-brand-neon text-brand-dark font-oswald font-black italic tracking-tighter text-xl magnetic-btn shine-effect flex items-center justify-center gap-2 group"
                >
                  COMPRAR AHORA
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <button className="w-full sm:w-auto px-12 py-5 border border-white/10 hover:border-brand-neon/50 font-oswald font-black italic tracking-tighter text-xl text-white transition-all glass-neon">
                  VER TECNOLOGÍA
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/5">
                <div>
                  <span className="block text-brand-neon font-black text-2xl italic tracking-tighter">+85%</span>
                  <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">Retorno Energía</span>
                </div>
                <div>
                  <span className="block text-white font-black text-2xl italic tracking-tighter">ULTRA</span>
                  <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">Cushioning</span>
                </div>
                <div>
                  <span className="block text-white font-black text-2xl italic tracking-tighter">CARBON</span>
                  <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">Plate Tech</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sneaker side */}
          <div className="relative h-[600px] flex items-center justify-center">
            <motion.div
              style={{ y: springY1, rotate: springRotate, scale }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Product Shadow */}
              <div className="absolute bottom-1/4 w-3/4 h-20 bg-brand-neon/5 blur-[80px] rounded-full" />
              
              <Image 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" 
                alt="JHEMC-01 VOLT"
                width={800}
                height={800}
                className="object-contain animate-sneaker-float drop-shadow-[0_35px_35px_rgba(204,255,0,0.15)]"
                priority
              />

              {/* Interactive Hotspots */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute top-1/4 right-0"
              >
                <div className="flex items-center gap-3 glass-neon p-3 rounded-xl border-l-4 border-l-brand-neon">
                  <Zap size={20} className="text-brand-neon" />
                  <div>
                    <span className="block text-[10px] font-black text-brand-neon uppercase tracking-widest">Tecnología</span>
                    <span className="block text-xs font-bold text-white uppercase italic">Ultra-React v2</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-1/4 left-0"
              >
                <div className="flex items-center gap-3 glass-neon p-3 rounded-xl border-l-4 border-l-brand-accent">
                  <ShieldCheck size={20} className="text-brand-accent" />
                  <div>
                    <span className="block text-[10px] font-black text-brand-accent uppercase tracking-widest">Soporte</span>
                    <span className="block text-xs font-bold text-white uppercase italic">Ankle-Lock System</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
    </section>
  );
};

export default SneakerHero;
