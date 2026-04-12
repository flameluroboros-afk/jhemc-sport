import { join } from 'path';
import { readFile } from 'fs/promises';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const path = join(process.cwd(), 'src/data/settings.json');
  let settings = { storeWhatsApp: "51925207612", storeEmail: "admin@jhemcsport.com" };

  try {
    const data = await readFile(path, 'utf8');
    settings = JSON.parse(data);
  } catch (e) {
    console.log('Settings file not found, using defaults.');
  }

  return <SettingsClient settings={settings} />;
}
