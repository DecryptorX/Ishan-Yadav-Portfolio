import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/db';

async function verifyAdmin() {
  const session = await getServerSession(getAuthOptions());
  if (!session?.user || session.user.role !== 'ADMIN') {
    return false;
  }
  return true;
}

export async function DELETE(req: Request, { params }: { params: Promise<any> }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
  }

  const { id } = await params;

  try {
    const deleted = await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json(deleted);
  } catch (err: any) {
    console.error('Error deleting contact message in admin endpoint:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
