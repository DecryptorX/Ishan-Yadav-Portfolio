import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/db';

async function verifyAdmin() {
  const session = await getServerSession(getAuthOptions());
  if (!session?.user || session.user.role !== 'ADMIN') {
    return false;
  }
  return true;
}

export async function GET(req: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
  }

  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(activities);
  } catch (err: any) {
    console.error('Error fetching admin activities:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
