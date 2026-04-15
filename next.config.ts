import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Esto deshabilita el error de Turbopack de forma interna
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;