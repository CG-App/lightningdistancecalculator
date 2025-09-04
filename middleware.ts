// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/:path*'],
}

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const url = new URL(req.url)

  const isPagesDev = host.endsWith('.pages.dev')

  // Serve a different robots.txt on .pages.dev
  if (url.pathname === '/robots.txt') {
    if (isPagesDev) {
      return new Response(
        // Block all crawling on *.pages.dev
        'User-agent: *\nDisallow: /\n',
        { status: 200, headers: { 'Content-Type': 'text/plain' } }
      )
    }
    // On .com, fall through to the static (next-sitemap) robots.txt
    return NextResponse.next()
  }

  // Add noindex header on every other page for *.pages.dev
  const res = NextResponse.next()
  if (isPagesDev) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return res
}
