'use client';

import { useCart } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, Smartphone, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Cart() {
  const { cart, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const total = getTotal();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleWhatsAppOrder = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Por favor completa tu nombre y número de WhatsApp');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Guardar pedido en la base de datos
      const orderItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.selectedSize,
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          items: orderItems,
        }),
      });

      if (!res.ok) throw new Error('Error al registrar pedido');

      const order = await res.json();

      // 2. Generar mensaje de WhatsApp con el ID del pedido
      const message = `🚀 *NUEVO PEDIDO JHEMC SPORT*\n` +
        `📋 *Orden:* #J-${order.id.slice(-6).toUpperCase()}\n` +
        `👤 *Cliente:* ${customerName}\n\n` +
        cart.map((item) => `▸ ${item.name} (Talla: ${item.selectedSize}) x${item.quantity}: ${formatCurrency(item.price * item.quantity)}`).join('\n') +
        `\n\n💰 *TOTAL:* ${formatCurrency(total)}\n\n` +
        `👋 ¡Hola! Me gustaría coordinar el pago y la entrega.`;

      const encodedMessage = encodeURIComponent(message);

      // 3. Limpiar carrito y abrir WhatsApp
      clearCart();
      window.open(`https://wa.me/51${customerPhone}?text=${encodedMessage}`, '_blank');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al registrar tu pedido. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter mb-4">TU CARRITO ESTÁ VACÍO</h1>
        <p className="text-white/50 mb-8">Parece que aún no has añadido nada a tu equipo.</p>
        <Link href="/catalog" className="inline-flex items-center px-8 py-4 bg-brand-neon text-brand-dark font-black italic text-sm hover:translate-y-[-2px] transition-transform">
          <ArrowLeft size={16} className="mr-2" />
          VOLVER AL CATÁLOGO
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-12">MI EQUIPO <span className="text-brand-neon">({cart.length})</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex items-center p-4 glass border border-white/5 space-x-4">
              <div className="relative h-24 w-24 bg-brand-gray overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black italic text-lg leading-none">{item.name}</h3>
                    <p className="text-[10px] text-brand-neon font-bold tracking-widest mt-1">TALLA: {item.selectedSize}</p>
                  </div>
                  <button onClick={() => removeItem(item.id, item.selectedSize)} className="text-white/30 hover:text-destructive transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center space-x-3 bg-brand-dark border border-white/10 px-2 py-1">
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="hover:text-brand-neon transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="font-black italic min-w-[20px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="hover:text-brand-neon transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xl font-black italic">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="p-8 glass border border-brand-neon/20 sticky top-32">
            <h2 className="text-2xl font-black italic mb-6">RESUMEN DEL PEDIDO</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-white/60">
                <span>SUBTOTAL:</span>
                <span className="font-bold">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>ENVÍO:</span>
                <span className="text-brand-neon font-black italic">GRATIS</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-end text-3xl font-black italic">
                <span>TOTAL:</span>
                <span className="text-brand-neon">{formatCurrency(total)}</span>
              </div>
            </div>

            {!showForm ? (
              <button 
                onClick={() => setShowForm(true)}
                className="w-full py-5 bg-brand-neon text-brand-dark font-black tracking-tighter italic text-lg flex items-center justify-center space-x-3 hover:scale-105 transition-transform"
              >
                <Smartphone size={24} />
                <span>PEDIR POR WHATSAPP</span>
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black italic tracking-widest text-white/40 mb-2">TU NOMBRE</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Juan Pérez"
                    className="w-full bg-brand-dark border border-white/10 px-4 py-3 text-sm font-bold italic outline-none focus:border-brand-neon/50 transition-all placeholder:text-white/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black italic tracking-widest text-white/40 mb-2">TU WHATSAPP</label>
                  <input 
                    type="tel" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="987654321"
                    className="w-full bg-brand-dark border border-white/10 px-4 py-3 text-sm font-bold italic outline-none focus:border-brand-neon/50 transition-all placeholder:text-white/20"
                  />
                </div>
                <button 
                  onClick={handleWhatsAppOrder}
                  disabled={isSubmitting}
                  className="w-full py-5 bg-brand-neon text-brand-dark font-black tracking-tighter italic text-lg flex items-center justify-center space-x-3 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      <span>REGISTRANDO...</span>
                    </>
                  ) : (
                    <>
                      <Smartphone size={24} />
                      <span>CONFIRMAR Y ENVIAR</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <p className="text-[10px] text-center mt-4 text-white/30 font-bold tracking-widest leading-relaxed">
              * EL PEDIDO SE GUARDARÁ EN NUESTRO SISTEMA<br />
              ANTES DE REDIRIGIRTE A WHATSAPP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
