import React from "react";

const NewsletterJhemc = () => {
  return (
    <section className="relative overflow-hidden bg-brand-gray py-20 border-y border-white/5">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-neon/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-[570px] w-full text-center lg:text-left">
            <span className="text-brand-neon font-black tracking-[0.2em] text-xs italic uppercase mb-4 block">
              ÚNETE AL EQUIPO
            </span>
            <h2 className="font-oswald text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-4 uppercase">
              RECIBE DROPS <br /> EXCLUSIVOS
            </h2>
            <p className="text-white/60 font-medium text-lg">
              Suscríbete para obtener acceso anticipado a nuevas colecciones, 
              eventos de la comunidad y ofertas solo para miembros.
            </p>
          </div>

          <div className="max-w-[500px] w-full">
            <form className="relative flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="TU EMAIL CORRE AQUÍ"
                className="w-full bg-brand-dark border border-white/10 px-6 py-5 text-white font-bold italic tracking-tight placeholder:text-white/20 focus:outline-none focus:border-brand-neon/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-brand-neon text-brand-dark px-8 py-5 font-oswald font-black italic tracking-tighter hover:scale-105 transition-transform whitespace-nowrap animate-glow"
              >
                SUSCRIBIRSE
              </button>
            </form>
            <p className="text-[10px] text-white/30 mt-4 text-center lg:text-left font-bold italic tracking-widest uppercase">
              * AL SUSCRIBIRTE ACEPTAS NUESTRA POLÍTICA DE RENDIMIENTO Y PRIVACIDAD.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterJhemc;
