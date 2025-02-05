import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Next.js enables React Strict Mode by default in next.config.js, which calls useEffect twice in development (but not in production).
  // This can cause double API requests.

  reactStrictMode: false, // 🚨 Disable Strict Mode
};

export default nextConfig;
