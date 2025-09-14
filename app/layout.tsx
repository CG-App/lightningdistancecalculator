import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/json-ld";
import Analytics from "./analytics";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Lightning Distance Calculator";
const BASE_URL = "https://lightningdistancecalculator.com";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: "%s · Lightning Distance Calculator",
  },
  description:
    "Estimate how far away lightning is using the thunder-lag method.",
  metadataBase: new URL(BASE_URL),
  // Canonicals for specific pages can still be set per-route via `generateMetadata`.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.ico`,
  };

  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    // If you add on-site search later, we can extend this with a SearchAction.
  };

  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationLd} />
        <JsonLd data={webSiteLd} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
