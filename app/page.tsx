// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import LightningCalculator from "@/components/LightningCalculator";
import JsonLd from "@/components/json-ld";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Lightning Distance Calculator",
  description:
    "Estimate how far away a storm is using the thunder-lag method.",
  alternates: {
    canonical: "https://lightningdistancecalculator.com/",
  },
};

const BASE_URL = "https://lightningdistancecalculator.com";

export default function HomePage() {
  const pageUrl = BASE_URL;

  // ✅ Breadcrumb JSON-LD (homepage as the calculator)
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: pageUrl },
    ],
  };

  // ✅ WebApplication JSON-LD
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Lightning Distance Calculator",
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="content-app">
      {/* Inject structured data */}
      <JsonLd data={[breadcrumbLd, webAppLd]} />

      <h1>Lightning Distance Calculator</h1>
      <p className="mb-6">
        Start the timer when you see lightning, stop it when you hear thunder,
        and instantly see the estimated distance.
      </p>

      <LightningCalculator />

      <div className="pt-6">
        <Link href="/blog" className="underline">
          Read the blog →
        </Link>
      </div>
    </main>
  );
}
