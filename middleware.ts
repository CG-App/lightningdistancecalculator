// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || ""
  const url = req.nextUrl

  // Preview domain (Cloudflare Pages): never allow indexing
  if (host.endsWith(".pages.dev")) {
    // If robots.txt is requested, return a Disallow-all
    if (url.pathname === "/robots.txt") {
      return new NextResponse("User-agent: *\nDisallow: /\n", {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
          // Helpful if a crawler ignores robots.txt but reads headers
          "Cache-Control": "no-store",
        },
      })
    }

    // All other routes: add a noindex header
    const res = NextResponse.next()
    res.headers.set("X-Robots-Tag", "noindex, nofollow")
    return res
  }

  // Production (.com): do nothing special
  return NextResponse.next()
}

// Ignore static assets/_next
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}
