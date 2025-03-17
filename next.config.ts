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
};

export default nextConfig;
