import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calcularPrecioVenta } from '@/lib/utils';

// GET - Listar todos los productos
export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

// POST - Crear un nuevo producto
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, basePrice, image, stock, sizes, categoryId } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        basePrice: parseFloat(basePrice),
        price: calcularPrecioVenta(parseFloat(basePrice)),
        image,
        stock: parseInt(stock),
        sizes,
        categoryId,
      },
      include: { category: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error al crear el producto' }, { status: 500 });
  }
}
