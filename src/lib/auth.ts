import { NextAuthOptions, DefaultSession } from 'next-auth';
import LinkedInProvider from 'next-auth/providers/linkedin';
import CredentialsProvider from 'next-auth/providers/credentials';

type Providers = NextAuthOptions['providers'];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]
  }
}

/**
 * Bridge Auth.js v5 naming (AUTH_URL / AUTH_SECRET) to the NEXTAUTH_* names that
 * NextAuth v4 reads internally, so either naming works in production.
 */
if (!process.env.NEXTAUTH_URL && process.env.AUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.AUTH_URL;
}

const isProduction = process.env.NODE_ENV === 'production';

const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
const linkedinClientSecret = process.env.LINKEDIN_CLIENT_SECRET;

/** True only when real LinkedIn OAuth credentials are present (no mock fallback). */
export const linkedinConfigured = Boolean(linkedinClientId && linkedinClientSecret);

/** True when at least one real OAuth provider is available. */
export const authConfigured = linkedinConfigured;

const adminEmail = process.env.ADMIN_LINKEDIN_EMAIL || 'ishanyadav09@outlook.com';

const providers: Providers = [];

// LinkedIn (primary) — registered ONLY when real credentials exist.
if (linkedinConfigured) {
  providers.push(
    LinkedInProvider({
      clientId: linkedinClientId as string,
      clientSecret: linkedinClientSecret as string,
      client: {
        token_endpoint_auth_method: 'client_secret_post',
      },
    })
  );
}

// Developer bypass — LOCAL DEVELOPMENT ONLY. Never registered in production,
// so no mock/bypass authentication can ever appear on the deployed site.
if (!isProduction) {
  providers.push(
    CredentialsProvider({
      name: 'Developer Mode',
      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'Ishan Yadav' },
        email: { label: 'Email (Bypass)', type: 'text', placeholder: adminEmail },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        return {
          id: credentials.email === adminEmail ? 'ishan-yadav' : 'normal-user-id',
          name: credentials.name || 'Developer Visitor',
          email: credentials.email || 'guest@portfolio.local',
          image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        };
      },
    })
  );
}

export const authOptions: NextAuthOptions = {
  // Prefer AUTH_SECRET (Auth.js v5) then NEXTAUTH_SECRET. A labelled fallback keeps
  // the app from crashing when unconfigured — it is never used to mint real sessions
  // because no providers are registered until credentials are supplied.
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    'insecure-fallback-secret-set-AUTH_SECRET-in-production',
  providers,
  callbacks: {
    async jwt({ token, profile, user }) {
      if (profile) token.sub = (profile as Record<string, string>).sub ?? token.sub;
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }

      // Admin is determined server-side by matching the authenticated email
      // against ADMIN_LINKEDIN_EMAIL.
      if ((adminEmail && token.email === adminEmail) || token.id === 'ishan-yadav') {
        token.role = 'admin';
      } else {
        token.role = 'user';
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub || token.id || '') as string;
        session.user.role = (token.role as string) || 'user';
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: { signIn: '/login' },
};

export function isOwner(userId?: string | null, email?: string | null): boolean {
  if (!userId && !email) return false;
  if (adminEmail && email === adminEmail) return true;
  if (userId === 'ishan-yadav') return true;
  return false;
}
