// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/:path*'],
};

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const host = req.headers.get('host') || '';
  const url = new URL(req.url);

  // Detect previews in two ways:
  // 1) Host-based (Cloudflare *.pages.dev),
  // 2) Env-based (works even if you later use a custom staging domain)
  const isPagesDev = host.endsWith('.pages.dev');
  const isCF = process.env.CF_PAGES === '1';
  const branch = process.env.CF_PAGES_BRANCH;
  const isPreviewByEnv = isCF && branch && branch !== 'main';
  const isPreview = isPagesDev || isPreviewByEnv;

  // Serve robots.txt that blocks crawling on previews
  if (url.pathname === '/robots.txt') {
    if (isPreview) {
      return new Response('User-agent: *\nDisallow: /\n', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
    // On production, fall through to your static robots.txt
    return NextResponse.next();
  }

  if (isPreview) {
    // Block indexing everywhere on previews
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');

    // Force canonical to production hostname
    const prodUrl =
      'https://lightningdistancecalculator.com' +
      url.pathname +
      url.search;
    res.headers.set('Link', `<${prodUrl}>; rel="canonical"`);
  }

  return res;
}
