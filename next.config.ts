import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add turbopack configuration to avoid webpack conflicts
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  // PWA configuration will be handled via custom service worker
  // We'll add PWA features manually without next-pwa
  output: "standalone",

  // Enable experimental features for PWA
  experimental: {
    runtime: "nodejs",
    serverComponentsExternalPackages: ["@supabase/supabase-js"],
  },

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
