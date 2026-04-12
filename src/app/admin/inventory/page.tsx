import { prisma } from '@/lib/prisma';
import InventoryClient from './InventoryClient';
import { Suspense } from 'react';

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  const categories = await prisma.category.findMany();

  const mappedProducts = products.map(p => ({
    ...p,
    category: p.category.name,
    sizes: p.sizes.split(',')
  }));

  const categoryNames = categories.map(c => c.name);

  return (
    <Suspense fallback={<div className="pt-40 text-center font-black italic uppercase">CARGANDO INVENTARIO...</div>}>
      <InventoryClient products={mappedProducts as any} categories={categoryNames} />
    </Suspense>
  );
}
