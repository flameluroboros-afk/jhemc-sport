'use client';

import Link from 'next/link';
import { Smartphone, Globe2, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-gray border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Manifesto */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-oswald font-black tracking-tighter italic text-brand-neon block mb-6">
              JHEMC<span className="text-white">SPORT</span>
            </span>
            <p className="text-white/50 max-w-sm mb-8 font-medium leading-relaxed">
              No somos solo una tienda, somos el motor de tu rendimiento. 
              Equipamos a la próxima generación de atletas con tecnología de vanguardia 
              y un diseño que inspira superación.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-brand-dark border border-white/10 hover:border-brand-neon hover:text-brand-neon transition-all">
                <Globe2 size={20} />
              </a>
              <a href="#" className="p-3 bg-brand-dark border border-white/10 hover:border-brand-neon hover:text-brand-neon transition-all">
                <Mail size={20} />
              </a>
              <a href="https://wa.me/51900000000" className="p-3 bg-brand-dark border border-white/10 hover:border-brand-neon hover:text-brand-neon transition-all">
                <Smartphone size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black italic tracking-widest text-white/40 mb-6 uppercase">EXPLORAR</h4>
            <ul className="space-y-4 font-bold italic text-sm">
              <li><Link href="/catalog" className="hover:text-brand-neon transition-colors">CATÁLOGO COMPLETO</Link></li>
              <li><Link href="/catalog?cat=Calzado" className="hover:text-brand-neon transition-colors">ZAPATILLAS</Link></li>
              <li><Link href="/catalog?cat=Ropa" className="hover:text-brand-neon transition-colors">ROPA TÉCNICA</Link></li>
              <li><Link href="/admin" className="text-white/30 hover:text-white transition-colors">ACCESO ADMIN</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-black italic tracking-widest text-white/40 mb-6 uppercase">ASISTENCIA</h4>
            <ul className="space-y-4 font-bold italic text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">GUÍA DE TALLAS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ENVÍOS Y ENTREGAS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TÉRMINOS DE SERVICIO</a></li>
              <li className="pt-4">
                <a 
                  href="https://wa.me/51900000000" 
                  className="inline-flex items-center text-brand-neon"
                >
                  <Smartphone size={16} className="mr-2" />
                  SOPORTE WHATSAPP
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
            © 2024 JHEMC SPORT CO. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center space-x-2 text-[10px] font-black italic tracking-widest text-white/40 hover:text-brand-neon transition-colors"
          >
            <span>VOLVER AL INICIO</span>
            <div className="p-2 border border-white/10 group-hover:border-brand-neon">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

