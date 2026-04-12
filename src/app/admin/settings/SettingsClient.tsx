'use client';

import { Settings, Save, Smartphone, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SettingsProps {
  settings: {
    storeWhatsApp: string;
    storeEmail: string;
  };
}

export default function SettingsClient({ settings }: SettingsProps) {
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) alert('AJUSTES GUARDADOS CORRECTAMENTE');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error al guardar ajustes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">AJUSTES</h1>
        <p className="text-white/40 font-bold italic text-sm tracking-widest mt-2 uppercase">CONFIGURACIÓN DEL CONTROL CENTER</p>
      </div>

      <div className="space-y-8">
        {/* Contact Settings */}
        <div className="glass border border-white/5 p-8 relative overflow-hidden group">
          <div className="flex items-center space-x-3 mb-8 text-brand-neon">
            <Smartphone size={24} />
            <h2 className="text-2xl font-black italic tracking-tight uppercase">CONTACTO Y VENTAS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">NÚMERO PRINCIPAL DE WHATSAPP</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input 
                  type="text" 
                  value={formData.storeWhatsApp}
                  onChange={e => setFormData({...formData, storeWhatsApp: e.target.value})}
                  className="w-full bg-brand-dark border border-white/10 py-4 pl-12 pr-4 text-sm font-bold italic focus:border-brand-neon outline-none transition-all"
                  placeholder="51925207612"
                />
              </div>
              <p className="text-[9px] text-white/20 font-bold">ESTE ES EL NÚMERO AL QUE LLEGARÁN TODOS LOS PEDIDOS.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">EMAIL DE NOTIFICACIONES</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input 
                  type="email" 
                  value={formData.storeEmail}
                  onChange={e => setFormData({...formData, storeEmail: e.target.value})}
                  className="w-full bg-brand-dark border border-white/10 py-4 pl-12 pr-4 text-sm font-bold italic focus:border-brand-neon outline-none transition-all"
                  placeholder="admin@jhemcsport.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings Placeholder */}
        <div className="glass border border-white/5 p-8 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-white/40">
            <ShieldCheck size={20} />
            <span className="text-sm font-black italic tracking-widest uppercase">AUTENTICACIÓN DE ADMINISTRADOR</span>
          </div>
          <span className="text-[10px] font-black italic px-3 py-1 bg-white/5 text-white/30">ACTIVO</span>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-3 px-10 py-5 bg-brand-neon text-brand-dark font-black italic text-lg hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isSaving ? (
              <span className="animate-pulse">GUARDANDO...</span>
            ) : (
              <>
                <Save size={24} />
                <span>GUARDAR CAMBIOS</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
