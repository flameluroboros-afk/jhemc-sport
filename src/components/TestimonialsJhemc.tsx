import React from "react";
import { Star, Quote } from "lucide-react";

const TestimonialsJhemc = () => {
  const reviews = [
    {
      name: "CARLOS R.",
      role: "MARATONISTA",
      text: "EL CALZADO JHEMC CAMBIÓ MI FORMA DE ENTRENAR. LA RESPUESTA EN CADA ZANCADA ES INCREÍBLE. 100% RECOMENDADO.",
      rating: 5
    },
    {
      name: "ELENA M.",
      role: "CROSSFIT ATHLETE",
      text: "LAS PRENDAS TÉCNICAS NO SOLO SE VEN PRO, SINO QUE SOPORTAN EL TRATO MÁS DURO. NO SE DEFORMAN NI PIERDEN COLOR.",
      rating: 5
    },
    {
      name: "JAVIER T.",
      role: "COACH PERSONAL",
      text: "LUEGO DE PROBAR MUCHAS MARCAS, JHEMC SPORT ES LA QUE MEJOR RELACIÓN CALIDAD-PRECIO OFRECE PARA ALTO RENDIMIENTO.",
      rating: 5
    }
  ];

  return (
    <section className="bg-brand-gray py-32 border-y border-white/5 relative overflow-hidden">
      {/* Decorative Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-20">
          <span className="text-brand-neon font-black tracking-[0.4em] text-xs italic uppercase mb-4 block">COMUNIDAD ÉLITE</span>
          <h2 className="font-oswald text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase">LO QUE DICEN LOS <br /> MEJORES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-brand-dark border border-white/10 p-10 relative group hover:border-brand-neon/50 transition-all duration-500">
              <Quote className="absolute top-8 right-8 text-white/5 group-hover:text-brand-neon/10 transition-colors" size={80} />
              
              <div className="flex gap-1 mb-6 text-brand-neon">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              
              <p className="text-white/60 font-medium text-lg italic leading-relaxed mb-10 relative z-10">
                "{rev.text}"
              </p>
              
              <div className="border-t border-white/10 pt-6">
                <span className="block font-oswald font-black italic text-xl text-white tracking-tight uppercase">{rev.name}</span>
                <span className="text-brand-neon text-[10px] font-black tracking-widest uppercase italic">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsJhemc;
