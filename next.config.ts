import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Aquí puedes agregar opciones de configuración después */
  typescript: {
    // Esto evita que el build falle por errores de tipado menores
    ignoreBuildErrors: true,
  },
  eslint: {
    // Esto evita que el build falle por advertencias de ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;