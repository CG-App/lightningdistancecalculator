'use client';

export default function Analytics() {
  // Only enable in production AND when an ID is set
  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
  const gtag = process.env.NEXT_PUBLIC_GTAG;

  if (!isProd || !gtag || gtag === 'G-PLACEHOLDER') return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag}', { send_page_view: true });
          `,
        }}
      />
    </>
  );
}
