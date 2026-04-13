import { prisma } from '@/lib/prisma';
import CategoriesClient from './CategoriesClient';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <span className="text-brand-neon font-black tracking-widest text-xs italic uppercase">SISTEMA DE CLASIFICACIÓN</span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mt-2 underline decoration-brand-neon/40 underline-offset-8">CATEGORÍAS</h1>
        </div>
      </div>

      <CategoriesClient initialCategories={categories} />
    </div>
  );
}
