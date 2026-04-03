import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ENABLE_POSTFX: process.env.NEXT_PUBLIC_ENABLE_POSTFX ?? "false",
  },
};

export default nextConfig;
