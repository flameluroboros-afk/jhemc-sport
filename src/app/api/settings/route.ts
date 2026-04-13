import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await prisma.globalSettings.findUnique({
      where: { id: 'main' }
    });
    
    // Fallback if not exists
    if (!settings) {
      return NextResponse.json({
        storeWhatsApp: "51925207612",
        storeEmail: "admin@jhemcsport.com"
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener ajustes' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { storeWhatsApp, storeEmail } = body;

    const settings = await (prisma.globalSettings as any).upsert({
      where: { id: 'main' },
      update: { storeWhatsApp, storeEmail },
      create: { id: 'main', storeWhatsApp, storeEmail }
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Error al actualizar ajustes' }, { status: 500 });
  }
}
