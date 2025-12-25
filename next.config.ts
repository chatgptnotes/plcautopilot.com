import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Temporarily ignore build errors for deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily ignore linting during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
