import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow Arena's preview proxy (e2b.app) to load dev-mode resources
  allowedDevOrigins: ["*.e2b.app"],
};

export default nextConfig;
