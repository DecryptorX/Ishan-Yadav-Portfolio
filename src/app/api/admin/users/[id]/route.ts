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
  const currentSession = await getServerSession(getAuthOptions());

  try {
    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Safety check: Cannot delete yourself
    if (targetUser.providerAccountId === currentSession?.user?.id) {
      return NextResponse.json({ error: 'Access Denied: You cannot delete your own admin account.' }, { status: 400 });
    }

    const deleted = await prisma.user.delete({ where: { id } });

    // Log deletion action
    await prisma.activity.create({
      data: {
        action: 'USER_DELETE',
        details: `Deleted user ${deleted.name} (${deleted.email || 'No email'}).`,
      },
    });

    return NextResponse.json(deleted);
  } catch (err: any) {
    console.error('Error deleting user in admin endpoint:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
