import { prisma } from '@/lib/prisma';
import OrdersClient from './OrdersClient';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return <OrdersClient orders={JSON.parse(JSON.stringify(orders))} />;
}
