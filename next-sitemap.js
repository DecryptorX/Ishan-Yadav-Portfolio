// TODO: Replace 'https://your-domain.com' with your actual Vercel production URL
//       before running `next-sitemap` or deploying to production.
//       Also update NEXTAUTH_URL in your Vercel dashboard environment variables.
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://your-domain.com',
  generateRobotsTxt: true,
  // Exclude gated / private pages from the sitemap
  exclude: ['/admin', '/resume', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api/'] },
    ],
  },
};

