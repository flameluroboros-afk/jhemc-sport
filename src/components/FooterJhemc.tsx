import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

const FooterJhemc = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="font-oswald text-3xl font-black italic tracking-tighter text-white">
              JHEMC<span className="text-brand-neon">SPORT</span>
            </h2>
            <p className="text-white/40 text-sm font-medium leading-relaxed">
              Equipamiento de alto rendimiento para atletas que desafían los límites. 
              Nacidos en la pista, diseñados para la victoria.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.2-18 11.6 7.2 1.5 11-4.8 8.8-11.3 1.2-1.2 2-3.3 2-3.3s-2 .5-3 1.1c-1.2-.8-2.6-1.2-4.1-1.2-4.4 0-8 3.6-8 8 0 .6.1 1.1.2 1.6-6.6-.3-12.4-3.5-16.3-8.3-.7 1.2-1.1 2.6-1.1 4.1 0 2.8 1.4 5.2 3.6 6.7-1.3 0-2.5-.4-3.6-1V17c0 3.9 2.8 7.2 6.5 7.9-.7.2-1.4.3-2.1.3-.5 0-1 0-1.5-.1 1 3.2 4 5.5 7.5 5.6-2.8 2.2-6.3 3.5-10 3.5-.6 0-1.3 0-1.9-.1 3.5 2.3 7.7 3.6 12.2 3.6 14.7 0 22.7-12.2 22.7-22.7 0-.3 0-.7-.1-1 1.5-1.1 2.8-2.6 3.8-4.2z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.4 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polyline points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-oswald text-lg font-black italic tracking-widest text-white mb-8 uppercase">PRODUCTOS</h4>
            <ul className="space-y-4">
              {['Calzado', 'Ropa Técnica', 'Accesorios', 'Equipos', 'Nuevos Drops'].map((item) => (
                <li key={item}>
                  <Link href={`/catalog?cat=${item}`} className="text-white/40 hover:text-brand-neon text-sm font-bold italic tracking-tight transition-colors uppercase">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="font-oswald text-lg font-black italic tracking-widest text-white mb-8 uppercase">AYUDA</h4>
            <ul className="space-y-4">
              {['Guía de Tallas', 'Seguimiento de Pedido', 'Cambios y Devoluciones', 'Términos de Servicio', 'Contacto'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-brand-neon text-sm font-bold italic tracking-tight transition-colors uppercase">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ubicación */}
          <div className="space-y-6">
            <h4 className="font-oswald text-lg font-black italic tracking-widest text-white mb-8 uppercase">UBICACIÓN</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-brand-neon flex-shrink-0" size={20} />
                <span className="text-white/40 text-sm font-medium">Av. Atletas Pro 123, Distrito Deportivo, Lima, Perú.</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-brand-neon flex-shrink-0" size={20} />
                <span className="text-white/40 text-sm font-medium">+51 987 654 321</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-brand-neon flex-shrink-0" size={20} />
                <span className="text-white/40 text-sm font-medium">contacto@jhemcsport.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-black italic tracking-widest uppercase text-center">
            © {currentYear} JHEMC SPORT - ALL RIGHTS RESERVED. HIGH PERFORMANCE ESTABLISHED 2024.
          </p>
          <div className="flex gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
             {/* Payment Methods Placeholders */}
             <div className="h-6 w-10 bg-white/20 rounded-sm" />
             <div className="h-6 w-10 bg-white/20 rounded-sm" />
             <div className="h-6 w-10 bg-white/20 rounded-sm" />
             <div className="h-6 w-10 bg-white/20 rounded-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterJhemc;
