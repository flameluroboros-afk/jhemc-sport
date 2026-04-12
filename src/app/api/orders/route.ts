import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar todos los pedidos
export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders);
}

// POST - Crear un nuevo pedido (antes de enviar a WhatsApp)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, customerAddress, items } = body;

    // items: [{ productId, quantity, price, size }]
    const total = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

    const order = await (prisma.order as any).create({
      data: {
        customerName: `${customerName} | DIR: ${customerAddress}`,
        customerPhone,
        total,
        status: 'PENDIENTE',
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number; size: string }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });

    // Descontar stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      error: 'Error al crear el pedido', 
      details: error.message,
      code: error.code 
    }, { status: 500 });
  }
}
