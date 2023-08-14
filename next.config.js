/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn.weatherapi.com",
      },
    ],
  },
};

module.exports = nextConfig;
