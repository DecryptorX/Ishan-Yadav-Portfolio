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

/**
 * Bridge Auth.js v5 naming (AUTH_URL / AUTH_SECRET) to the NEXTAUTH_* names
 * that NextAuth v4 reads internally, so either naming convention works.
 */
if (!process.env.NEXTAUTH_URL && process.env.AUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.AUTH_URL;
}
if (!process.env.NEXTAUTH_SECRET && process.env.AUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = process.env.AUTH_SECRET;
}

const isProduction = process.env.NODE_ENV === 'production';

const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
const linkedinClientSecret = process.env.LINKEDIN_CLIENT_SECRET;

/** The LinkedIn providerAccountId that maps to the admin role. */
const adminLinkedinId = process.env.ADMIN_LINKEDIN_ID;

/** True only when real LinkedIn OAuth credentials are present. */
export const linkedinConfigured = Boolean(linkedinClientId && linkedinClientSecret);

/** True when at least one real OAuth provider is available. */
export const authConfigured = linkedinConfigured;

const providers: NextAuthOptions['providers'] = [];

// LinkedIn — registered ONLY when real credentials exist.
if (linkedinConfigured) {
  providers.push(
    LinkedInProvider({
      clientId: linkedinClientId as string,
      clientSecret: linkedinClientSecret as string,
      client: {
        // LinkedIn requires the secret to be sent in the POST body, not as
        // a Basic Auth header (which is the NextAuth default).
        token_endpoint_auth_method: 'client_secret_post',
      },
      authorization: {
        params: { scope: 'openid profile email' },
      },
    })
  );
}

// Developer bypass — LOCAL DEVELOPMENT ONLY.
// Never registered in production so no mock auth can appear on the live site.
if (!isProduction) {
  providers.push(
    CredentialsProvider({
      name: 'Developer Mode',
      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'Test User' },
        email: { label: 'Email', type: 'text', placeholder: 'test@local' },
        // Pass "admin" to simulate the admin LinkedIn ID
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

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers,
  session: { strategy: 'jwt' },
  callbacks: {
    /**
     * Called after every sign-in. `account.providerAccountId` is the LinkedIn
     * member ID (e.g. "abc123") that we compare against ADMIN_LINKEDIN_ID.
     */
    async jwt({ token, account, user }) {
      // On first sign-in, `account` and `user` are present.
      if (account) {
        // Store the LinkedIn providerAccountId in the token for admin checks.
        token.linkedinId = account.providerAccountId ?? undefined;
        token.id = account.providerAccountId || user?.id;
      }
      if (user?.id && !token.linkedinId) {
        // Credentials provider — store the id directly.
        token.linkedinId = user.id;
        token.id = user.id;
      }

      // Determine role server-side: compare LinkedIn member ID against env var.
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
      // Allow relative URLs and same-origin redirects; otherwise go home.
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: { signIn: '/login' },
  // Use secure cookies in production.
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
 * Use this in server components / API routes for authorization checks.
 */
export function isOwner(linkedinId?: string | null): boolean {
  if (!linkedinId || !adminLinkedinId) return false;
  return linkedinId === adminLinkedinId;
}
