// 📂 frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["localhost"], // add backend image domains if needed
  },

  eslint: {
    ignoreDuringBuilds: true, // prevents build from failing due to lint errors
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`
      }
    ];
  }
};

export default nextConfig;
