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

// ─── Helper: Validate Environment Variables ─────────────────────────────────
function isRealValue(val: string | undefined): boolean {
  if (!val) return false;
  const cleaned = val.trim();
  if (cleaned.length === 0) return false;
  const lower = cleaned.toLowerCase();
  if (lower.includes('your_')) return false;
  if (lower.includes('<your')) return false;
  if (lower.includes('placeholder')) return false;
  if (lower.includes('example')) return false;
  if (lower.includes('change_me')) return false;
  return true;
}

// Print a clean, anonymous server-side diagnostic
function logDiagnostics() {
  const check = (val: string | undefined) => (isRealValue(val) ? '✅' : '❌');
  
  console.log('\n┌─ Auth Environment Diagnostics ──────────────');
  console.log(`AUTH_SECRET ${check(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET)}`);
  console.log(`AUTH_URL ${check(process.env.AUTH_URL || process.env.NEXTAUTH_URL)}`);
  console.log(`LINKEDIN_CLIENT_ID ${check(process.env.LINKEDIN_CLIENT_ID)}`);
  console.log(`LINKEDIN_CLIENT_SECRET ${check(process.env.LINKEDIN_CLIENT_SECRET)}`);
  console.log(`ADMIN_LINKEDIN_ID ${check(process.env.ADMIN_LINKEDIN_ID)}`);
  console.log('└─────────────────────────────────────────────\n');
}

export function isLinkedinConfigured(): boolean {
  return isRealValue(process.env.LINKEDIN_CLIENT_ID) && isRealValue(process.env.LINKEDIN_CLIENT_SECRET);
}

export function isAuthConfigured(): boolean {
  return isLinkedinConfigured();
}

// ─── Dynamic Config Generator ──────────────────────────────────────────────
export function getAuthOptions(): NextAuthOptions {
  // Always bridge Auth.js v5 naming to NextAuth v4 internally
  if (!process.env.NEXTAUTH_URL && process.env.AUTH_URL) {
    process.env.NEXTAUTH_URL = process.env.AUTH_URL;
  }
  if (!process.env.NEXTAUTH_SECRET && process.env.AUTH_SECRET) {
    process.env.NEXTAUTH_SECRET = process.env.AUTH_SECRET;
  }

  const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
  const linkedinClientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const adminLinkedinId = process.env.ADMIN_LINKEDIN_ID;
  const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

  // Log startup check on every options request on the server
  logDiagnostics();

  const isConfigured = isLinkedinConfigured();
  const providers: NextAuthOptions['providers'] = [];

  if (isConfigured) {
    providers.push(
      LinkedInProvider({
        clientId: linkedinClientId!,
        clientSecret: linkedinClientSecret!,
        issuer: 'https://www.linkedin.com/oauth',
        jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
        client: {
          token_endpoint_auth_method: 'client_secret_post',
        },
        authorization: {
          params: { scope: 'openid profile email' },
        },
        // LinkedIn OIDC returns { sub, name, email, picture } instead of
        // the legacy { id, localizedFirstName, ... }. Map sub → id.
        profile(profile: any) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        },
      })
    );
  } else if (process.env.NODE_ENV === 'production') {
    console.error(
      '⚠️  CRITICAL CONFIGURATION ERROR: LinkedIn OAuth client credentials are not configured or contain placeholder values!'
    );
  }

  // Developer credentials bypass (local development only)
  if (process.env.NODE_ENV !== 'production') {
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

  return {
    secret: authSecret,
    providers,
    session: { strategy: 'jwt' },
    callbacks: {
      async jwt({ token, account, user, profile }) {
        try {
          console.log('[next-auth][debug] jwt callback input:', {
            token: token ? { id: token.id, role: token.role, sub: token.sub } : null,
            account: account ? { provider: account.provider, type: account.type, providerAccountId: account.providerAccountId } : null,
            user: user ? { id: user.id, name: user.name, email: user.email } : null,
            profile: profile ? { sub: (profile as any).sub, name: (profile as any).name, email: (profile as any).email } : null
          });

          if (account) {
            token.linkedinId = account.providerAccountId ?? undefined;
            token.id = account.providerAccountId || user?.id;
          }
          if (user?.id && !token.linkedinId) {
            token.linkedinId = user.id;
            token.id = user.id;
          }

          // Match admin role by LinkedIn providerAccountId
          const lId = (token.linkedinId as string | undefined) ?? '';
          if (adminLinkedinId && lId && lId === adminLinkedinId) {
            token.role = 'admin';
          } else {
            token.role = 'user';
          }

          console.log('[next-auth][debug] jwt callback output token:', {
            id: token.id,
            role: token.role,
            linkedinId: token.linkedinId
          });

          return token;
        } catch (err) {
          console.error('[next-auth][error] Exception in jwt callback:', err);
          throw err;
        }
      },

      async session({ session, token }) {
        try {
          console.log('[next-auth][debug] session callback input:', {
            session: session ? { expires: session.expires, user: session.user ? { name: session.user.name, email: session.user.email } : null } : null,
            token: token ? { id: token.id, role: token.role, linkedinId: token.linkedinId } : null
          });

          if (session.user) {
            session.user.id = (token.linkedinId || token.id || token.sub || '') as string;
            session.user.role = (token.role as string) || 'user';
          }

          console.log('[next-auth][debug] session callback output:', {
            id: session.user?.id,
            role: session.user?.role
          });

          return session;
        } catch (err) {
          console.error('[next-auth][error] Exception in session callback:', err);
          throw err;
        }
      },

      async redirect({ url, baseUrl }) {
        if (url.startsWith('/')) return `${baseUrl}${url}`;
        if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
    pages: { signIn: '/login' },
    useSecureCookies: process.env.NODE_ENV === 'production',
    cookies: process.env.NODE_ENV === 'production'
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
}

/**
 * Server-side helper: returns true if the given LinkedIn ID is the admin.
 */
export function isOwner(linkedinId?: string | null): boolean {
  const adminLinkedinId = process.env.ADMIN_LINKEDIN_ID;
  if (!linkedinId || !adminLinkedinId) return false;
  return linkedinId === adminLinkedinId;
}
