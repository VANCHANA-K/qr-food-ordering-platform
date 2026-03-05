import type { NextConfig } from "next";

const backendApiOrigin = process.env.BACKEND_API_URL ?? "http://localhost:5132";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendApiOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
