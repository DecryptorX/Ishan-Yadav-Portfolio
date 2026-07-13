# Ishan Yadav — Personal Portfolio

A modern Next.js + TypeScript portfolio featuring cybersecurity-themed aesthetics, a gated CV download flow, a LinkedIn OAuth-powered admin dashboard, and visitor analytics.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| Auth | NextAuth.js v4 (LinkedIn OAuth) |
| Deployment | Vercel |

---

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Fill in .env.local (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values.

| Variable | Required | Description |
|---|---|---|
| `LINKEDIN_CLIENT_ID` | ✅ | LinkedIn OAuth app client ID |
| `LINKEDIN_CLIENT_SECRET` | ✅ | LinkedIn OAuth app client secret |
| `NEXTAUTH_SECRET` | ✅ | Random secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | ✅ | `http://localhost:3000` (dev) or production URL |
| `OWNER_LINKEDIN_ID` | ✅ | Your LinkedIn OpenID `sub` — see below |
| `NEXT_PUBLIC_OWNER_LINKEDIN_ID` | ✅ | Same value, exposed to client |
| `SITE_URL` | ⬜ | Production URL for sitemap generation |

---

## Setting Up the Admin Panel

The `/admin` page shows visitor analytics and is only accessible to you (the owner). It uses your LinkedIn `sub` (member ID) to gate access.

### How to find your `OWNER_LINKEDIN_ID`

1. Start the dev server: `npm run dev`
2. Visit [http://localhost:3000/resume](http://localhost:3000/resume)
3. Click **"Sign in with LinkedIn"** and complete the OAuth flow
4. Visit [http://localhost:3000/api/auth/me](http://localhost:3000/api/auth/me)
5. The response will look like:
   ```json
   {
     "id": "ACoAA...",
     "name": "Ishan Yadav",
     "email": "...",
     "message": "Copy the id value..."
   }
   ```
6. Copy the `"id"` value and add it to `.env.local`:
   ```
   OWNER_LINKEDIN_ID=ACoAA...
   NEXT_PUBLIC_OWNER_LINKEDIN_ID=ACoAA...
   ```
7. Restart the dev server — `/admin` will now let you in.

---

## Vercel Deployment Checklist

- [ ] **Add all env vars** in the Vercel dashboard → Project → Settings → Environment Variables:
  - `LINKEDIN_CLIENT_ID`
  - `LINKEDIN_CLIENT_SECRET`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL` ← set to your production URL (e.g. `https://ishanyadav.dev`)
  - `OWNER_LINKEDIN_ID`
  - `NEXT_PUBLIC_OWNER_LINKEDIN_ID`
  - `SITE_URL` ← same as `NEXTAUTH_URL`
- [ ] **Update LinkedIn OAuth app** redirect URI to `https://<your-domain>/api/auth/callback/linkedin`
- [ ] **Update `next-sitemap.js`** → set `siteUrl` to your production URL (or set `SITE_URL` env var — it reads from there automatically)
- [ ] **Replace `public/resume.pdf`** with your actual Word-exported PDF before going live
- [ ] **Replace `public/profile.jpg`** with your real photo if desired

### Deploy

```bash
# Vercel CLI
npx vercel --prod

# Or push to main branch if Vercel GitHub integration is connected
git push origin main
```

---

## Profile Photo

The hero section uses `public/profile.jpg`. To replace it with your own photo:

1. Export your photo as `profile.jpg` (square, minimum 400×400 px)
2. Place it in `public/profile.jpg` (overwrite the placeholder)
3. No code changes needed — `Hero.tsx` already references `/profile.jpg`

---

## Visitor Store

The current visitor store (`src/lib/store.ts`) is **in-memory** and resets on every cold start / serverless invocation. This is fine for development and demos.

For production persistence, replace it with **Supabase** or **Vercel KV**:

- **Supabase** (Postgres): Create a project, run the migration in `supabase/migrations/`, and add `SUPABASE_URL` + `SUPABASE_ANON_KEY` env vars.
- **Vercel KV** (Redis/Upstash): Enable KV in your Vercel project and replace Map operations with `kv.get`/`kv.set` calls.

---

## Features

- **Hero** — animated typing headline, live counter stats, profile photo, particle background
- **Custom Cursor** — glowing dot cursor (desktop only, respects `prefers-reduced-motion`)
- **CV Modal + Gated Download** — three flows: Quick Download, LinkedIn OAuth, Manual Form
- **Admin Dashboard** — LinkedIn-authenticated visitor analytics at `/admin`
- **Contact Form** — EmailJS integration
- **Leadership & Projects** — animated card sections
- **Sitemap + robots.txt** — auto-generated via `next-sitemap`

---

## License

MIT