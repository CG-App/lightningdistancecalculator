// app/calculator/page.tsx
import type { Metadata } from "next";
import LightningCalculator from "@/components/LightningCalculator";
import JsonLd from "@/components/json-ld";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Calculator | Lightning Distance Calculator",
  description: "Estimate how far away a storm is using the thunder-lag method.",
  alternates: {
    canonical: "https://lightningdistancecalculator.com/calculator",
  },
};

const BASE_URL = "https://lightningdistancecalculator.com";

export default function CalculatorPage() {
  const pageUrl = `${BASE_URL}/calculator`;

  // ✅ Breadcrumb JSON-LD
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Calculator", item: pageUrl },
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
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      {/* Inject structured data */}
      <JsonLd data={[breadcrumbLd, webAppLd]} />

      <h1 className="text-2xl font-bold">Lightning Distance Calculator</h1>
      <p>Enter the seconds between lightning and thunder, or use a stopwatch.</p>
      <LightningCalculator />
    </main>
  );
}
