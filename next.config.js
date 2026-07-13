/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // LinkedIn profile images
      { protocol: 'https', hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: '*.licdn.com' },
      // Flaticon CDN (fallback avatars)
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
    ],
  },
};