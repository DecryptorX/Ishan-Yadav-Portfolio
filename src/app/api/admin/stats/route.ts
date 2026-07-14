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
    const totalUsers = await prisma.user.count();
    const admins = await prisma.user.count({ where: { role: 'ADMIN' } });

    // Total logins is mapped to count of USER_SIGN_IN and ADMIN_LOGIN actions in Activity table
    const totalLogins = await prisma.activity.count({
      where: {
        action: { in: ['USER_SIGN_IN', 'ADMIN_LOGIN'] },
      },
    });

    // Today's logins
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayLogins = await prisma.activity.count({
      where: {
        action: { in: ['USER_SIGN_IN', 'ADMIN_LOGIN'] },
        createdAt: { gte: startOfToday },
      },
    });

    // Last Login user / time
    const lastLoginUser = await prisma.user.findFirst({
      orderBy: { lastLogin: 'desc' },
      select: { name: true, lastLogin: true },
    });

    // Newest user
    const newestUser = await prisma.user.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { name: true, createdAt: true },
    });

    return NextResponse.json({
      totalUsers,
      admins,
      totalLogins,
      todayLogins,
      lastLogin: lastLoginUser || null,
      newestUser: newestUser || null,
    });
  } catch (err: any) {
    console.error('Error fetching admin statistics:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
