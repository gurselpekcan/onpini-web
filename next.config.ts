import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "Strict-Transport-Security", value: "max-age=31536000" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
      ],
    }];
  },
  experimental: { cpus: 2, globalNotFound: true },
  async redirects() {
    return [
      // The old site's pages keep what search engines know about them.
      { source: "/about", destination: "/story", permanent: true },
      { source: "/team", destination: "/story", permanent: true },
      { source: "/careers", destination: "/story", permanent: true },
      { source: "/press", destination: "/story", permanent: true },
      { source: "/roadmap", destination: "/story", permanent: true },
      { source: "/circles", destination: "/decks", permanent: true },
      { source: "/privacy", destination: "https://web.onpini.com/privacy", permanent: true },
      // English has no language in the address, so there is only one of each page.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  // English has no language in the address; the others do (/nl, /nl/decks).
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/en" },
        { source: "/:first(play|decks|questions|how-it-works|story|support)", destination: "/en/:first" },
        { source: "/:first(decks|questions)/:rest", destination: "/en/:first/:rest" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
