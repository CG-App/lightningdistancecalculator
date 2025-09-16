// next.config.mjs
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Redirect /calculator → /
  async redirects() {
    return [
      {
        source: "/calculator",
        destination: "/",
        permanent: true, // 308 redirect
      },
    ];
  },

  // ✅ Headers for caching (good for Cloudflare Pages)
  async headers() {
    return [
      // 1) Long-term cache for static (hashed) Next assets
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // 2) Aggressive cache for /public assets
      {
        source:
          "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|css|js|woff|woff2|ttf|otf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // 3) Short edge cache for HTML (CDN), quick revalidation in browsers
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=600, stale-while-revalidate=60",
          },
        ],
      },
    ];
  },
};

export default withContentlayer(nextConfig);
