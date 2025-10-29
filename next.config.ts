import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack configuration for SVG handling
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
    // Correct property for external packages
    serverExternalPackages: ["@supabase/supabase-js"],
  },

  // PWA configuration handled via custom service worker
  output: "standalone",

  // Headers for PWA assets
  headers: async () => [
    {
      source: "/sw.js",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate",
        },
        {
          key: "Content-Type",
          value: "application/javascript",
        },
      ],
    },
    {
      source: "/manifest.json",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
        {
          key: "Content-Type",
          value: "application/manifest+json",
        },
      ],
    },
  ],
};

export default nextConfig;
