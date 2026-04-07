import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true,  // Disabled due to build hangs
  env: {
    NEXT_PUBLIC_ENABLE_POSTFX: process.env.NEXT_PUBLIC_ENABLE_POSTFX ?? "false",
  },
};

export default nextConfig;
