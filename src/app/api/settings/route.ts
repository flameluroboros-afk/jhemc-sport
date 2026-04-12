import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { storeWhatsApp, storeEmail } = body;

    const settingsData = { storeWhatsApp, storeEmail };
    const path = join(process.cwd(), 'src/data/settings.json');

    await writeFile(path, JSON.stringify(settingsData, null, 2));

    return NextResponse.json(settingsData);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Error al actualizar ajustes' }, { status: 500 });
  }
}
