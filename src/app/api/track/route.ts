import { NextRequest, NextResponse } from 'next/server';
import { logEvent } from '../../../lib/store';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { visitorId, page, action } = body;
  if (!visitorId || !page || !action) return NextResponse.json({ ok: false });
  logEvent(visitorId, page, action);
  return NextResponse.json({ ok: true });
}
