import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ❌ REMOVED: X-Frame-Options: SAMEORIGIN
          // When both X-Frame-Options AND CSP frame-ancestors are present,
          // browsers enforce the MORE restrictive policy. SAMEORIGIN blocks
          // all external origins regardless of what CSP allows.
          // Modern standard: use CSP frame-ancestors only.
          {
            key: "Content-Security-Policy",
            value: [
              "frame-ancestors",
              "'self'",
              // ❌ localhost:* is INVALID CSP — wildcard ports not supported.
              // Must enumerate each port explicitly.
              "http://localhost:3000",
              "http://localhost:3001",
              "http://localhost:7200",
              // Production Falcon domains
              "https://falconos.dev",
              "https://www.falconos.dev",
              // Allow embedding within any Vercel deployment
              "https://*.vercel.app",
              "https://falconos.app",
              "https://*.falconos.app",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
