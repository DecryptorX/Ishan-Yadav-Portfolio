import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '../../../../lib/auth';
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  // Server-side security check
  const session = await getServerSession(getAuthOptions());
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Access Denied: Admin privileges required.' }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'Bad Request: No file provided.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Option 1: Vercel Blob (if token configured)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(file.name, buffer, { access: 'public' });
        return NextResponse.json({ url: blob.url });
      } catch (blobErr) {
        console.error('Vercel Blob failed, falling back:', blobErr);
      }
    }

    // Option 2: Local File System (Development only)
    if (process.env.NODE_ENV !== 'production') {
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        return NextResponse.json({ url: `/uploads/${fileName}` });
      } catch (fsErr) {
        console.error('Local FS write failed:', fsErr);
      }
    }

    // Option 3: Base64 Data URL Fallback
    const mimeType = file.type || 'image/jpeg';
    const base64 = buffer.toString('base64');
    return NextResponse.json({ url: `data:${mimeType};base64,${base64}` });

  } catch (err: any) {
    console.error('File upload endpoint exception:', err);
    return NextResponse.json({ error: err.message || 'Server error during upload.' }, { status: 500 });
  }
}
