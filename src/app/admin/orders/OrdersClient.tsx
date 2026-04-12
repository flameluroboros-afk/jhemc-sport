'use client';

import { ShoppingBag, ArrowLeft, Smartphone, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  size: string;
  product: { name: string; image: string };
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersClient({ orders }: { orders: Order[] }) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ENTREGADO': return 'bg-brand-neon/10 text-brand-neon';
      case 'ENVIADO': return 'bg-brand-accent/10 text-brand-accent';
      case 'CANCELADO': return 'bg-destructive/10 text-destructive';
      default: return 'bg-white/5 text-white/50';
    }
  };

  const statusOptions = ['PENDIENTE', 'ENVIADO', 'ENTREGADO', 'CANCELADO'];

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('es-PE', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <Link href="/admin" className="flex items-center text-white/40 hover:text-brand-neon mb-4 font-bold italic tracking-tight text-xs uppercase transition-colors">
            <ArrowLeft size={14} className="mr-2" />
            VOLVER AL DASHBOARD
          </Link>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter">PEDIDOS <span className="text-brand-neon">({orders.length})</span></h1>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center glass border border-white/5">
          <ShoppingBag size={48} className="mx-auto mb-4 text-white/20" />
          <p className="text-white/40 font-bold italic uppercase text-lg">AÚN NO HAY PEDIDOS REGISTRADOS</p>
          <p className="text-white/20 text-sm mt-2">Los pedidos aparecerán aquí cuando los clientes compren.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="glass border border-white/5 overflow-hidden transition-all hover:border-white/10">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start space-x-6">
                    <div className="p-4 bg-white/5 border border-white/10">
                      <ShoppingBag size={32} className="text-brand-neon" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1 flex-wrap gap-2">
                        <span className="text-2xl font-black italic tracking-tighter">ORDEN #J-{order.id.slice(-6).toUpperCase()}</span>
                        <span className={`px-2 py-[2px] text-[9px] font-black italic tracking-widest ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-white font-bold italic tracking-tight text-lg uppercase">
                        {order.customerName.split(' | ')[0]}
                      </p>
                      <div className="flex flex-wrap gap-4 text-[10px] font-black italic text-white/30 tracking-widest uppercase mt-1">
                        <span>{order.items.length} ARTÍCULOS</span>
                        <span>•</span>
                        <span>{formatDate(order.createdAt)}</span>
                        <span>TEL: {order.customerPhone}</span>
                      </div>
                      <div className="mt-3 py-2 px-3 bg-white/5 border border-white/5 inline-flex items-center space-x-2">
                        <span className="text-[9px] font-black italic text-brand-neon tracking-widest uppercase">ENVÍO A:</span>
                        <span className="text-[11px] font-bold italic text-white/80 uppercase">
                          {order.customerName.includes(' | DIR: ') 
                            ? order.customerName.split(' | DIR: ')[1] 
                            : 'No especificada'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="text-right">
                      <span className="block text-[10px] font-black italic tracking-widest text-white/30 uppercase mb-1">TOTAL</span>
                      <span className="text-3xl font-black italic text-brand-neon">{formatCurrency(order.total)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Status Changer */}
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        disabled={updatingId === order.id}
                        className="bg-brand-dark border border-white/10 px-3 py-2 text-[10px] font-black italic tracking-widest uppercase outline-none focus:border-brand-neon/50 cursor-pointer disabled:opacity-50"
                      >
                        {statusOptions.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <a 
                        href={`https://wa.me/51${order.customerPhone}`} 
                        target="_blank"
                        className="p-3 bg-white/5 border border-white/10 hover:bg-brand-neon hover:text-brand-dark transition-all"
                      >
                        <Smartphone size={18} />
                      </a>
                      <button 
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                      >
                        {expandedOrder === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Order Items */}
              {expandedOrder === order.id && (
                <div className="border-t border-white/5 bg-white/[0.02] p-6">
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center space-x-3">
                          <span className="text-brand-neon font-black italic text-sm">x{item.quantity}</span>
                          <span className="font-bold text-sm uppercase">{item.product.name}</span>
                          <span className="text-[10px] text-white/30 font-black italic tracking-widest">TALLA: {item.size}</span>
                        </div>
                        <span className="font-black italic">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
