import { prisma } from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });

  if (!product) {
    notFound();
  }

  const mappedProduct = {
    ...product,
    category: product.category.name,
    sizes: product.sizes.split(',')
  };

  return <ProductDetailClient product={mappedProduct as any} />;
}
