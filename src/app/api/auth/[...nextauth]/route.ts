import NextAuth from 'next-auth';
import { getAuthOptions } from '../../../../lib/auth';
import { NextResponse } from 'next/server';

const handler = (req: any, res: any) => {
  try {
    const url = new URL(req.url);
    const host = url.host;
    const protocol = (typeof req.headers.get === 'function' ? req.headers.get('x-forwarded-proto') : req.headers['x-forwarded-proto']) || url.protocol.replace(':', '');
    const dynamicBaseUrl = `${protocol}://${host}`;

    // Dynamically set NEXTAUTH_URL and NEXTAUTH_URL_INTERNAL to current request host
    process.env.NEXTAUTH_URL = dynamicBaseUrl;
    process.env.NEXTAUTH_URL_INTERNAL = dynamicBaseUrl;

    if (req.method === 'GET') {
      if (url.pathname.endsWith('/api/auth/callback/linkedin')) {
        const userAgent = (typeof req.headers.get === 'function' ? req.headers.get('user-agent') : req.headers['user-agent']) || '';
        const isLinkedInApp = userAgent.includes('LinkedInApp');
        const isAndroid = userAgent.toLowerCase().includes('android');

        if (isLinkedInApp && isAndroid) {
          const search = url.search;
          const pathAndQuery = `/api/auth/callback/linkedin${search}`;
          const fallbackUrl = encodeURIComponent(`${dynamicBaseUrl}${pathAndQuery}`);
          const chromeIntent = `intent://${host}${pathAndQuery}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${fallbackUrl};end`;
          return NextResponse.redirect(chromeIntent, 302);
        }
      }
    }
  } catch (e) {
    console.error('Error in NextAuth dynamic host resolver:', e);
  }
  return NextAuth(req, res, getAuthOptions());
};

export { handler as GET, handler as POST };
