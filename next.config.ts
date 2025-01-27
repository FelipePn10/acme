import { NextConfig } from "next";

const nextConfig = {
  experimental: {
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { hostname: "assets.basehub.com" },
      { hostname: "basehub.earth" },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
