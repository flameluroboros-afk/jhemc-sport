import { join } from 'path';
import { readFile } from 'fs/promises';
import CartClient from './CartClient';

export default async function CartPage() {
  const path = join(process.cwd(), 'src/data/settings.json');
  let storePhone = "51925207612";

  try {
    const data = await readFile(path, 'utf8');
    const settings = JSON.parse(data);
    storePhone = settings.storeWhatsApp;
  } catch (e) {
    console.log('Settings file not found, using default phone.');
  }

  return <CartClient storePhone={storePhone} />;
}
