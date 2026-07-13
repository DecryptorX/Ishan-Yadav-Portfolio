import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '../../../../lib/auth';

export async function GET() {
  const session = await getServerSession(getAuthOptions());

  if (!session?.user) {
    return NextResponse.json(
      { id: null, message: 'Not signed in. Sign in at /resume first.' },
      { status: 200 }
    );
  }

  return NextResponse.json({
    id: session.user.id ?? null,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    message:
      'Copy the "id" value above and set it as OWNER_LINKEDIN_ID in your .env.local file.',
  });
}
