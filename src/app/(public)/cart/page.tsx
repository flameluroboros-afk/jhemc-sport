import { prisma } from '@/lib/prisma';
import CartClient from './CartClient';

export default async function CartPage() {
  let storePhone = "51925207612";

  try {
    const dbSettings = await prisma.globalSettings.findUnique({
      where: { id: 'main' }
    });
    if (dbSettings) {
      storePhone = dbSettings.storeWhatsApp;
    }
  } catch (e) {
    console.log('Settings in DB not found, using default phone.');
  }

  return <CartClient storePhone={storePhone} />;
}
