"use client";
import React, { useState } from "react";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "DESCRIPCIÓN" },
    { id: "specs", label: "ESPECIFICACIONES" },
    { id: "shipping", label: "ENVÍO Y DEBUELOS" },
    { id: "reviews", label: "RESEÑAS (5)" },
  ];

  return (
    <div className="mt-20 border-t border-white/5 pt-12">
      <div className="flex flex-wrap gap-8 border-b border-white/5 pb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-oswald text-sm font-black italic tracking-widest transition-all relative pb-6 ${
              activeTab === tab.id ? "text-brand-neon" : "text-white/40 hover:text-white"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-neon shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
            )}
          </button>
        ))}
      </div>

      <div className="py-10">
        {activeTab === "description" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-2xl font-black italic mb-6 uppercase">INGENIERÍA PARA EL ÉXITO</h3>
              <p className="text-white/60 leading-relaxed mb-6 font-medium">
                Cada costura y cada tejido han sido seleccionados tras meses de pruebas rigurosas. 
                Nuestra tecnología <strong>NEO-DRY</strong> permite una transpiración óptima 
                mientras mantiene la temperatura corporal ideal para el alto impacto.
              </p>
              <ul className="space-y-3 text-white/50 font-bold italic text-sm">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-brand-neon mr-3" /> TEJIDO ANTIDESGARRO</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-brand-neon mr-3" /> COSTURAS REFORZADAS</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-brand-neon mr-3" /> AJUSTE ANATÓMICO 3D</li>
              </ul>
            </div>
            <div className="bg-brand-gray border border-white/5 p-8 relative overflow-hidden">
               <div className="absolute -right-10 -bottom-10 text-[120px] font-black italic text-white/[0.02] tracking-tighter uppercase">RAGE</div>
               <h4 className="text-lg font-black italic mb-4 text-brand-neon uppercase">MANTENIMIENTO PRO</h4>
               <p className="text-white/40 text-sm font-medium leading-relaxed">
                 Lavar a máquina en frío con colores similares. No usar suavizantes. Secar al aire para 
                 preservar la elasticidad técnica de las fibras. Nunca planchar logos impresos.
               </p>
            </div>
          </div>
        )}
        
        {activeTab === "specs" && (
            <div className="max-w-2xl animate-in fade-in duration-500">
                <div className="space-y-4">
                    {[
                        ["MATERIAL", "88% POLYESTER, 12% ELASTANE"],
                        ["PESO", "240G (TALLA M)"],
                        ["TECNOLOGÍA", "ULTRA-FLEX 4-WAY STRETCH"],
                        ["ORIGEN", "DISEÑADO EN PERÚ, HECHO EN BRASIL"],
                        ["PROTECCIÓN", "UPF 50+ SOLAR PROTECTION"]
                    ].map(([key, val]) => (
                        <div key={key} className="flex justify-between border-b border-white/5 py-4">
                            <span className="font-black italic text-xs tracking-widest text-white/40">{key}</span>
                            <span className="font-bold italic text-sm text-white">{val}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === "shipping" && (
            <div className="bg-white/5 p-8 border-l-4 border-brand-neon animate-in fade-in duration-500">
                <h3 className="font-black italic mb-4 uppercase">POLÍTICA DE ENTREGAS</h3>
                <p className="text-white/60 mb-6 font-medium">
                    Despachamos todos los pedidos en menos de 24 horas hábiles. 
                    El tiempo estimado de entrega es de 48-72h para Lima y 3-5 días para provincias.
                </p>
                <div className="flex gap-4">
                    <button className="px-6 py-2 bg-white/10 text-white text-[10px] font-bold italic tracking-widest hover:bg-white/20 transition-colors">TABLA DE COSTOS</button>
                    <button className="px-6 py-2 bg-white/10 text-white text-[10px] font-bold italic tracking-widest hover:bg-white/20 transition-colors">RASTREAR PEDIDO</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
