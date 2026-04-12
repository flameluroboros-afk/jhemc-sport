import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No se subió ningún archivo' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear un nombre único para el archivo
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const path = join(process.cwd(), 'public/uploads', fileName);

    await writeFile(path, buffer);
    const publicPath = `/uploads/${fileName}`;

    return NextResponse.json({ url: publicPath });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error al subir la imagen' }, { status: 500 });
  }
}
