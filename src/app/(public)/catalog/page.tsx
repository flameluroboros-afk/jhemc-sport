import { prisma } from '@/lib/prisma';
import CatalogClient from './CatalogClient';
import { Suspense } from 'react';

export default async function CatalogPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  const categories = await prisma.category.findMany();

  // Map DB products to the expected UI format if necessary
  const mappedProducts = products.map(p => ({
    ...p,
    category: p.category.name,
    sizes: p.sizes.split(',')
  }));

  const categoryNames = categories.map(c => c.name);

  return (
    <Suspense fallback={<div className="pt-40 text-center font-black italic">CARGANDO EQUIPO...</div>}>
      <CatalogClient products={mappedProducts as any} categories={categoryNames} />
    </Suspense>
  );
}
