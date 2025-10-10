import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
        pathname: '/u/prod/marvel/i/mg/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/characters',
        permanent: false,
      },
    ]
  }
};

export default nextConfig;
