import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isOwner } from '../../../lib/auth';
import { saveVisitor, getVisitorById, getAllVisitors, getStats } from '../../../lib/store';

function parseUserAgent(ua: string) {
  let browser = 'Other';
  let os = 'Other';
  let device: 'desktop' | 'mobile' = 'desktop';

  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';

  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Android')) os = 'Android';

  if (ua.includes('Mobi') || ua.includes('Android') || ua.includes('iPhone')) {
    device = 'mobile';
  }

  return { browser, os, device };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, name, email, phone, source, linkedinId, linkedinImage, resolution, themePref } = body;

  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const userAgent = req.headers.get('user-agent') ?? '';
  const referrerHeader = req.headers.get('referer') ?? 'Direct';
  const countryHeader = req.headers.get('x-vercel-ip-country') ?? 'IN'; // default fallback

  const { browser, os, device } = parseUserAgent(userAgent);

  // If visitor is anonymous and we have an ID, check if exists to prevent duplication
  if (id && source === 'anonymous') {
    const existing = getVisitorById(id);
    if (existing) {
      return NextResponse.json({ id: existing.id });
    }
  }

  // Create a new visitor profile
  const visitor = saveVisitor({
    id: id || undefined,
    source: source || 'anonymous',
    name: name || `Anon Visitor (${browser}/${os})`,
    email: email || `anon_${Date.now()}@portfolio.local`,
    phone: phone || undefined,
    linkedinId: linkedinId || undefined,
    linkedinImage: linkedinImage || undefined,
    ip,
    userAgent,
    browser,
    os,
    device,
    referrer: referrerHeader,
    country: countryHeader,
    resolution: resolution || undefined,
    themePref: themePref || undefined
  });

  return NextResponse.json({ id: visitor.id });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !isOwner(session.user.id)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ visitors: getAllVisitors(), stats: getStats() });
}
