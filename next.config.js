// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Redirect /calculator → /
  async redirects() {
    return [
      {
        source: "/calculator",
        destination: "/",
        permanent: true, // 308 redirect for SEO
      },
    ];
  },

  // ✅ Headers for caching
  async headers() {
    return [
      // 1) Long-term cache for static assets (already hashed)
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // 2) Also cache any files in /public (images, icons, etc.) aggressively
      {
        source:
          "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|css|js|woff|woff2|ttf|otf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // 3) Cache HTML at the CDN for a short time (Edge cache, not browser)
      //    Cloudflare respects s-maxage. Browser still revalidates quickly,
      //    but Cloudflare can serve a true HIT for 600s.
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

module.exports = nextConfig;
