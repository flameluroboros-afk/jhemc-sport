import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  const products = await prisma.product.findMany({
    take: 4,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  const recentOrders = await prisma.order.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const totalSalesQuery = await prisma.order.aggregate({
    _sum: { total: true }
  });
  const totalSales = totalSalesQuery._sum.total || 0;

  const stats = [
    { name: 'Ventas Totales', value: formatCurrency(totalSales), icon: TrendingUp, color: 'text-brand-neon' },
    { name: 'Pedidos Hoy', value: ordersCount.toString(), icon: ShoppingCart, color: 'text-brand-accent' },
    { name: 'Productos Activos', value: productsCount.toString(), icon: Package, color: 'text-white' },
    { name: 'Clientes Nuevos', value: '0', icon: Users, color: 'text-brand-neon' },
  ];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <span className="text-brand-neon font-black tracking-widest text-xs italic uppercase">CONTROL CENTER</span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mt-2 underline decoration-brand-neon/40 underline-offset-8">DASHBOARD</h1>
        </div>
        <Link 
          href="/admin/inventory?action=new"
          className="flex items-center space-x-2 px-8 py-4 bg-brand-neon text-brand-dark font-black italic text-sm hover:scale-105 transition-transform"
        >
          <Plus size={20} />
          <span>NUEVO PRODUCTO</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-stats gap-6 mb-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {stats.map((stat) => (
          <div key={stat.name} className="p-8 glass border border-white/5 relative overflow-hidden group">
            <stat.icon className={`absolute -right-4 -bottom-4 w-24 h-24 opacity-10 ${stat.color} transition-transform group-hover:scale-110`} />
            <div className="flex items-center space-x-3 mb-4 text-white/40 font-black italic text-xs tracking-widest uppercase">
              <stat.icon size={16} />
              <span>{stat.name}</span>
            </div>
            <div className="text-4xl font-black tracking-tighter italic">{stat.value}</div>
            <div className="mt-4 flex items-center text-[10px] font-bold text-brand-neon tracking-wider">
              <ArrowUpRight size={12} className="mr-1" />
              <span>+12.5% DESDE AYER</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Inventory */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black italic tracking-tight">GESTIÓN DE INVENTARIO</h2>
            <Link href="/admin/inventory" className="text-xs font-black italic text-brand-neon hover:underline">VER TODO</Link>
          </div>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="p-4 glass border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 bg-brand-gray border border-white/10 overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-black italic text-lg leading-tight">{product.name}</h3>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{product.category.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black italic text-xl">{formatCurrency(product.price)}</div>
                  <div className="text-[10px] text-brand-neon font-black italic tracking-widest uppercase">STOCK: {product.stock}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Recent Orders */}
        <div>
           <h2 className="text-2xl font-black italic tracking-tight mb-8">PEDIDOS RECIENTES</h2>
           <div className="p-6 glass border border-white/5 space-y-6">
              {recentOrders.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-white/20 text-xs font-bold italic uppercase tracking-widest">SIN PEDIDOS REGISTRADOS</p>
                </div>
              ) : recentOrders.map((order) => (
                <div key={order.id} className="flex flex-col space-y-2 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-black italic text-xs text-white/40">ORDEN #J-{order.id.slice(-6).toUpperCase()}</span>
                    <span className={`px-2 py-[2px] font-black text-[9px] italic tracking-widest ${
                      order.status === 'ENTREGADO' ? 'text-brand-neon bg-brand-neon/10' : 'text-brand-accent bg-brand-accent/10'
                    }`}>{order.status}</span>
                  </div>
                  <span className="font-bold text-sm uppercase">{order.customerName.split(' | ')[0]}</span>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-white/40 italic">{new Date(order.createdAt).toLocaleDateString('es-PE')}</span>
                    <span className="font-black italic text-brand-neon">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
