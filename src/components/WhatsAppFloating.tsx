import React from 'react';
import { Smartphone } from 'lucide-react';

const WhatsAppFloating = () => {
  return (
    <a
      href="https://wa.me/51987654321"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
    >
      {/* Ripple Effect */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
      
      {/* Main Button */}
      <div className="relative flex items-center bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300">
        <Smartphone size={28} />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 bg-brand-dark border border-white/10 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          <span className="text-xs font-black italic tracking-widest uppercase">¡HABLA CON UN PRO!</span>
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-brand-dark border-r border-t border-white/10 rotate-45" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppFloating;
