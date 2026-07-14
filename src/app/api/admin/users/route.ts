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

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const role = searchParams.get('role') || '';
  const status = searchParams.get('status') || ''; // 'active' or 'deactivated'
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
  const page = Math.max(1, Number(searchParams.get('page') || 1));
  const limit = Math.max(1, Number(searchParams.get('limit') || 10));
  const skip = (page - 1) * limit;

  // Build where conditions
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { providerAccountId: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (role) {
    where.role = role;
  }

  if (status === 'active') {
    where.isDeactivated = false;
  } else if (status === 'deactivated') {
    where.isDeactivated = true;
  }

  try {
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    const pages = Math.ceil(total / limit);

    return NextResponse.json({
      users,
      total,
      pages,
      page,
      limit,
    });
  } catch (err: any) {
    console.error('Error fetching users in admin endpoint:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, role, isDeactivated } = body;

    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const currentSession = await getServerSession(getAuthOptions());
    
    // Safety check: Don't allow admins to demote or deactivate themselves
    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (targetUser && targetUser.providerAccountId === currentSession?.user?.id) {
      if (role && role !== 'ADMIN') {
        return NextResponse.json({ error: 'Access Denied: You cannot demote yourself.' }, { status: 400 });
      }
      if (isDeactivated === true) {
        return NextResponse.json({ error: 'Access Denied: You cannot deactivate yourself.' }, { status: 400 });
      }
    }

    const updateData: any = {};
    if (role !== undefined) updateData.role = role;
    if (isDeactivated !== undefined) updateData.isDeactivated = isDeactivated;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Log admin action
    let logAction = 'USER_UPDATE';
    let logDetails = `Updated user ${updatedUser.name} (${updatedUser.email}).`;

    if (role !== undefined) {
      logAction = 'ROLE_CHANGE';
      logDetails = `Changed role of user ${updatedUser.name} to ${role}.`;
    }
    if (isDeactivated === true) {
      logAction = 'USER_DEACTIVATE';
      logDetails = `Deactivated/Suspended user ${updatedUser.name}.`;
    } else if (isDeactivated === false) {
      logAction = 'USER_REACTIVATE';
      logDetails = `Reactivated user ${updatedUser.name}.`;
    }

    await prisma.activity.create({
      data: {
        action: logAction,
        details: logDetails,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err: any) {
    console.error('Error updating user in admin endpoint:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
