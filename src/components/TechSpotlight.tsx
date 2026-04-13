"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Layers, Wind, Activity, Target } from "lucide-react";

const TechSpotlight = () => {
  const techs = [
    {
      title: "JHEMC-ULTRA FOAM",
      desc: "Nuestra espuma de celda cerrada más avanzada, ofreciendo un retorno de energía del 85%.",
      icon: <Activity className="text-brand-neon" size={24} />,
      position: "top-10 left-10",
      delay: 0.2
    },
    {
      title: "AIR-BREATH MESH",
      desc: "Malla de ingeniería monofilamento para una transpirabilidad superior en zonas de calor.",
      icon: <Wind className="text-brand-accent" size={24} />,
      position: "top-1/4 right-10",
      delay: 0.4
    },
    {
      title: "CARBON THRUST PLATE",
      desc: "Placa de fibra de carbono de longitud completa para una propulsión explosiva.",
      icon: <Layers className="text-white" size={24} />,
      position: "bottom-1/3 left-20",
      delay: 0.6
    },
    {
      title: "TRACTION ELITE SOLE",
      desc: "Compuesto de goma de alta densidad diseñado para máxima adherencia en cualquier superficie.",
      icon: <Target className="text-brand-neon" size={24} />,
      position: "bottom-10 right-20",
      delay: 0.8
    }
  ];

  return (
    <section className="bg-brand-gray py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-neon/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-brand-neon font-black tracking-[0.4em] text-xs italic uppercase mb-4 block">LABORATORIO DE RENDIMIENTO</span>
          <h2 className="font-oswald text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase">ANATOMÍA DEL <br /> ÉXITO</h2>
        </div>

        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* Central sneaker image with "X-ray" feel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full max-w-4xl"
          >
            <div className="absolute inset-0 bg-brand-neon/5 blur-[100px] rounded-full animate-pulse" />
            <Image 
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop" 
              alt="Anatomy"
              width={1000}
              height={600}
              className="object-contain filter grayscale invert brightness-125 opacity-20 absolute inset-0 scale-110 blur-[2px]"
            />
            <Image 
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop" 
              alt="Anatomy Solid"
              width={1000}
              height={600}
              className="object-contain relative z-20 drop-shadow-[0_0_30px_rgba(204,255,0,0.1)]"
            />
          </motion.div>

          {/* Technology Points */}
          <div className="absolute inset-0 z-30">
            {techs.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: tech.delay, duration: 0.6 }}
                className={`absolute ${tech.position} max-w-[280px] group`}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 glass-neon rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border-brand-neon/30">
                    {tech.icon}
                  </div>
                  <div className="border-l-2 border-brand-neon/30 pl-4">
                    <h4 className="font-oswald font-black italic text-xl text-white uppercase tracking-tight mb-2 group-hover:text-brand-neon transition-colors">
                      {tech.title}
                    </h4>
                    <p className="text-white/40 text-xs font-medium leading-relaxed uppercase italic">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
    </section>
  );
};

export default TechSpotlight;
