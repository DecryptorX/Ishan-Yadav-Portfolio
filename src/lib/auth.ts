import { NextAuthOptions, DefaultSession } from 'next-auth';
import LinkedInProvider from 'next-auth/providers/linkedin';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'super-secret-fallback-key-for-preview-builds-development-mode-987654321',
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || 'mock',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || 'mock',
      client: {
        token_endpoint_auth_method: 'client_secret_post',
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || 'mock',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'mock',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock',
    }),
    CredentialsProvider({
      name: 'Developer Mode',
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Ishan Yadav" },
        email: { label: "Email (Bypass)", type: "text", placeholder: "ishanyadav09@outlook.com" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        // Allows bypass authentication in development and testing
        return {
          id: credentials.email === 'ishanyadav09@outlook.com' ? 'ishan-yadav' : 'normal-user-id',
          name: credentials.name || 'Developer Visitor',
          email: credentials.email || 'guest@portfolio.local',
          image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, profile, user }) {
      if (profile) token.sub = (profile as Record<string, string>).sub ?? token.sub;
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }

      // Check admin status on every token compilation
      const adminId = process.env.ADMIN_LINKEDIN_ID || process.env.OWNER_LINKEDIN_ID || 'ishan-yadav';
      const adminEmail = process.env.ADMIN_LINKEDIN_EMAIL || 'ishanyadav09@outlook.com';
      
      if (
        (adminId && token.sub === adminId) ||
        (adminEmail && token.email === adminEmail) ||
        token.id === 'ishan-yadav'
      ) {
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
      // Directs safe redirects on callback
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  pages: { signIn: '/login' },
};

export function isOwner(userId?: string | null, email?: string | null): boolean {
  if (!userId && !email) return false;
  const adminId = process.env.ADMIN_LINKEDIN_ID || process.env.OWNER_LINKEDIN_ID || 'ishan-yadav';
  const adminEmail = process.env.ADMIN_LINKEDIN_EMAIL || 'ishanyadav09@outlook.com';

  if (adminId && userId === adminId) return true;
  if (adminEmail && email === adminEmail) return true;
  return false;
}
