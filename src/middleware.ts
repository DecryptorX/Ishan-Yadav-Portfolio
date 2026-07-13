import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // /admin requires role === "admin". Return 403 for authenticated non-admins.
    if (pathname.startsWith('/admin')) {
      if (token?.role !== 'admin') {
        return new NextResponse(
          `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>403 — Access Denied</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #09090b;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
      color: #f1f5f9;
      padding: 2rem;
    }
    .card {
      background: rgba(17,17,17,0.9);
      border: 1px solid rgba(239,68,68,0.2);
      border-radius: 1.5rem;
      padding: 3rem 2rem;
      max-width: 460px;
      width: 100%;
      text-align: center;
    }
    .code { font-size: 4rem; font-weight: 900; color: #ff5f56; line-height: 1; margin-bottom: 0.5rem; }
    h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.03em; }
    p { color: rgba(148,163,184,0.85); font-size: 0.92rem; line-height: 1.6; margin-bottom: 2rem; }
    a {
      display: inline-block;
      padding: 0.65rem 1.5rem;
      border-radius: 0.5rem;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #fff;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    a:hover { border-color: rgba(0,229,255,0.5); color: #00e5ff; }
  </style>
</head>
<body>
  <div class="card">
    <div class="code">403</div>
    <h1>Access Denied</h1>
    <p>You are authenticated but do not have administrator privileges to access this page.</p>
    <a href="/">Return Home</a>
  </div>
</body>
</html>`,
          { status: 403, headers: { 'Content-Type': 'text/html' } }
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // withAuth's built-in guard: return true to allow the middleware fn to run,
      // false to redirect unauthenticated users to the sign-in page.
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
