import React from "react";
import { ShieldCheck, Truck, RotateCcw, Smartphone } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: <Truck className="text-brand-neon" size={32} />,
      title: "ENVÍO EXPRESS",
      desc: "Llegamos a todo el Perú en tiempo récord."
    },
    {
      icon: <ShieldCheck className="text-brand-neon" size={32} />,
      title: "PAGO SEGURO",
      desc: "Encriptación SSL de nivel bancario."
    },
    {
      icon: <RotateCcw className="text-brand-neon" size={32} />,
      title: "GARANTÍA TOTAL",
      desc: "30 días para cambios sin preguntas."
    },
    {
      icon: <Smartphone className="text-brand-neon" size={32} />,
      title: "SOPORTE WHATSAPP",
      desc: "Atención personalizada 24/7."
    }
  ];

  return (
    <section className="bg-brand-dark py-16 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-neon/20 group-hover:scale-110 transition-all duration-300">
                {badge.icon}
              </div>
              <h4 className="font-oswald text-xl font-bold italic tracking-tighter mb-2 uppercase">
                {badge.title}
              </h4>
              <p className="text-white/40 text-sm font-medium">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
