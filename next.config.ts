import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Next.js 14.1+ blocks upstream requests to private IPs (SSRF protection).
    // In dev, Strapi runs on localhost so we bypass optimization entirely.
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        // Allow any configured STRAPI_URL domain
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
