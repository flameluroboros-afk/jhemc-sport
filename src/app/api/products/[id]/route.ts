import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calcularPrecioVenta } from '@/lib/utils';

export const dynamic = 'force-dynamic';

// GET - Obtener un producto específico
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT - Actualizar un producto
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, description, basePrice, image, stock, sizes, categoryId, onSale, salePrice } = body;

    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    
    // Logic for price updates with offer fallback
    const finalOnSale = onSale !== undefined ? Boolean(onSale) : undefined;
    const finalSalePrice = salePrice !== undefined ? (salePrice && !isNaN(parseFloat(salePrice)) ? parseFloat(salePrice) : null) : undefined;
    const finalBasePrice = basePrice !== undefined && !isNaN(parseFloat(basePrice)) ? parseFloat(basePrice) : undefined;

    if (finalBasePrice !== undefined) updateData.basePrice = finalBasePrice;
    if (finalOnSale !== undefined) updateData.onSale = finalOnSale;
    if (finalSalePrice !== undefined) updateData.salePrice = finalSalePrice;

    // Recalculate price based on flags
    if (basePrice !== undefined || onSale !== undefined || salePrice !== undefined) {
      const activeBase = finalBasePrice ?? (await prisma.product.findUnique({ where: { id } }))?.basePrice ?? 0;
      const activeOnSale = finalOnSale ?? (await prisma.product.findUnique({ where: { id } }))?.onSale ?? false;
      const activeSalePrice = finalSalePrice ?? (await prisma.product.findUnique({ where: { id } }))?.salePrice ?? null;

      updateData.price = activeOnSale && activeSalePrice ? activeSalePrice : calcularPrecioVenta(activeBase);
    }

    if (image !== undefined) updateData.image = image;
    if (stock !== undefined) {
      const parsedStock = parseInt(stock);
      updateData.stock = isNaN(parsedStock) ? 0 : parsedStock;
    }
    if (sizes !== undefined) updateData.sizes = sizes;
    if (categoryId !== undefined) updateData.categoryId = categoryId;

    console.log('Update payload:', updateData);

    const product = await (prisma.product as any).update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ 
      error: 'Error al actualizar el producto',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

// DELETE - Eliminar un producto
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 });
  }
}
