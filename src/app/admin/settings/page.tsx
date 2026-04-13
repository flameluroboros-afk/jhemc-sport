import { prisma } from '@/lib/prisma';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  let settings = { storeWhatsApp: "51925207612", storeEmail: "admin@jhemcsport.com" };

  try {
    const dbSettings = await prisma.globalSettings.findUnique({
      where: { id: 'main' }
    });
    if (dbSettings) {
      settings = {
        storeWhatsApp: dbSettings.storeWhatsApp,
        storeEmail: dbSettings.storeEmail
      };
    }
  } catch (e) {
    console.log('Settings in DB not found, using defaults.');
  }

  return <SettingsClient settings={settings} />;
}
