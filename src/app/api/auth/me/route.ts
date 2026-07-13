import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';

/**
 * GET /api/auth/me
 *
 * Returns the current session user's LinkedIn member ID (the `sub` JWT claim).
 * Use this after signing in with LinkedIn to discover your OWNER_LINKEDIN_ID:
 *
 *   1. Start the dev server: npm run dev
 *   2. Visit http://localhost:3000/resume and sign in with LinkedIn
 *   3. Visit http://localhost:3000/api/auth/me
 *   4. Copy the "id" value and set it as OWNER_LINKEDIN_ID in .env.local
 */
export async function GET() {
  const session = await getServerSession(authOptions);

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
