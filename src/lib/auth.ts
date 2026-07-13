import { NextAuthOptions, DefaultSession } from 'next-auth';
import LinkedInProvider from 'next-auth/providers/linkedin';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
    linkedinId?: string;
  }
}

// ─── Environment Variable Resolution ───────────────────────────────────────
// Bridge Auth.js v5 naming (AUTH_URL / AUTH_SECRET) to NEXTAUTH_* names
// that NextAuth v4 reads internally.
if (!process.env.NEXTAUTH_URL && process.env.AUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.AUTH_URL;
}
if (!process.env.NEXTAUTH_SECRET && process.env.AUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = process.env.AUTH_SECRET;
}

const isProduction = process.env.NODE_ENV === 'production';

// ─── Read & Validate Environment Variables ─────────────────────────────────
const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
const linkedinClientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const adminLinkedinId = process.env.ADMIN_LINKEDIN_ID;
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
const authUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL;

/**
 * Returns true only if a value is a real credential — not empty, not undefined,
 * and not a placeholder like "your_linkedin_client_id" or "<your client id>".
 */
function isRealValue(val: string | undefined): boolean {
  if (!val) return false;
  const lower = val.toLowerCase().trim();
  if (lower.length < 5) return false;
  if (lower.includes('your_')) return false;
  if (lower.includes('<your')) return false;
  if (lower.includes('placeholder')) return false;
  if (lower.includes('example')) return false;
  if (lower.includes('change_me')) return false;
  if (lower.includes('xxx')) return false;
  return true;
}

/** True only when real (non-placeholder) LinkedIn OAuth credentials are present. */
export const linkedinConfigured = isRealValue(linkedinClientId) && isRealValue(linkedinClientSecret);

/** True when at least one real OAuth provider is available. */
export const authConfigured = linkedinConfigured;

// ─── Startup Environment Status Logging ────────────────────────────────────
// Print which env vars are loaded (never print actual values).
if (typeof globalThis !== 'undefined') {
  const status = (name: string, val: string | undefined) => {
    const real = isRealValue(val);
    const exists = Boolean(val);
    if (real) return `  ✓ ${name} loaded`;
    if (exists) return `  ✗ ${name} contains a placeholder value!`;
    return `  ✗ ${name} is missing`;
  };

  console.log('\n┌─ Auth Environment Status ──────────────────');
  console.log(status('AUTH_SECRET', authSecret));
  console.log(status('AUTH_URL', authUrl));
  console.log(status('LINKEDIN_CLIENT_ID', linkedinClientId));
  console.log(status('LINKEDIN_CLIENT_SECRET', linkedinClientSecret));
  console.log(status('ADMIN_LINKEDIN_ID', adminLinkedinId));
  console.log(`  ℹ LinkedIn configured: ${linkedinConfigured}`);
  console.log(`  ℹ Environment: ${process.env.NODE_ENV}`);
  console.log('└─────────────────────────────────────────────\n');
}

// ─── Provider Registration ─────────────────────────────────────────────────
const providers: NextAuthOptions['providers'] = [];

if (linkedinConfigured) {
  providers.push(
    LinkedInProvider({
      clientId: linkedinClientId!,
      clientSecret: linkedinClientSecret!,
      client: {
        token_endpoint_auth_method: 'client_secret_post',
      },
      authorization: {
        params: { scope: 'openid profile email' },
      },
    })
  );
} else if (isProduction) {
  // In production, if LinkedIn isn't configured, log a critical warning.
  console.error(
    '\n⚠️  CRITICAL: LinkedIn OAuth is NOT configured in production!\n' +
    '   Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in Vercel.\n' +
    '   Current LINKEDIN_CLIENT_ID is: ' +
    (linkedinClientId ? `"${linkedinClientId.substring(0, 4)}..." (looks like a placeholder)` : 'undefined') +
    '\n'
  );
}

// Developer bypass — LOCAL DEVELOPMENT ONLY.
if (!isProduction) {
  providers.push(
    CredentialsProvider({
      name: 'Developer Mode',
      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'Test User' },
        email: { label: 'Email', type: 'text', placeholder: 'test@local' },
        linkedinId: { label: 'LinkedIn ID (optional)', type: 'text', placeholder: adminLinkedinId ?? '' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        return {
          id: credentials.linkedinId || 'dev-user-id',
          name: credentials.name || 'Developer',
          email: credentials.email || 'dev@portfolio.local',
          image: null,
        };
      },
    })
  );
}

// ─── NextAuth Configuration ────────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
  secret: authSecret,
  providers,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.linkedinId = account.providerAccountId ?? undefined;
        token.id = account.providerAccountId || user?.id;
      }
      if (user?.id && !token.linkedinId) {
        token.linkedinId = user.id;
        token.id = user.id;
      }

      // Admin role: compare LinkedIn providerAccountId against env var.
      const lId = (token.linkedinId as string | undefined) ?? '';
      if (adminLinkedinId && lId && lId === adminLinkedinId) {
        token.role = 'admin';
      } else {
        token.role = 'user';
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.linkedinId || token.id || token.sub || '') as string;
        session.user.role = (token.role as string) || 'user';
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: { signIn: '/login' },
  useSecureCookies: isProduction,
  cookies: isProduction
    ? {
        sessionToken: {
          name: '__Secure-next-auth.session-token',
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: true,
          },
        },
      }
    : undefined,
};

/**
 * Server-side helper: returns true if the given LinkedIn ID is the admin.
 */
export function isOwner(linkedinId?: string | null): boolean {
  if (!linkedinId || !adminLinkedinId) return false;
  return linkedinId === adminLinkedinId;
}
