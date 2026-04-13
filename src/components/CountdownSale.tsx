"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CountdownSale = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); // Sale ends in 3 days

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      if (distance < 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
      <div className="relative overflow-hidden bg-brand-gray border border-white/5 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Decorative Neon Shadow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-neon/20 rounded-full blur-[100px]" />

        <div className="max-w-xl text-center md:text-left z-10">
          <span className="text-brand-neon font-black tracking-[0.3em] text-xs italic uppercase mb-4 block">
            OFERTA DE TEMPORADA
          </span>
          <h2 className="font-oswald text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6 uppercase leading-none">
            HASTA <span className="text-brand-neon">40% OFF</span> <br /> EN CALZADO TÉCNICO
          </h2>
          <p className="text-white/60 text-lg mb-8 font-medium">
            La velocidad espera por nadie. Equípate con lo mejor de la temporada 
            a precios de lanzamiento. Solo por tiempo limitado.
          </p>
          
          <Link 
            href="/catalog?cat=Calzado"
            className="inline-flex items-center px-8 py-4 bg-white text-brand-dark font-oswald font-black italic tracking-tighter text-lg hover:bg-brand-neon transition-colors group"
          >
            VER OFERTAS
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-4 md:gap-8 z-10">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <div className="w-20 h-24 md:w-28 md:h-32 bg-brand-dark flex flex-col items-center justify-center border border-white/10 relative">
                <span className="text-3xl md:text-5xl font-black italic text-brand-neon">
                  {value < 10 ? `0${value}` : value}
                </span>
                <div className="absolute bottom-2 h-0.5 w-8 bg-brand-neon/30" />
              </div>
              <span className="text-[10px] font-black italic tracking-widest text-white/40 uppercase mt-3">
                {label === 'days' ? 'DÍAS' : label === 'hours' ? 'HORAS' : label === 'minutes' ? 'MINS' : 'SEGS'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSale;
