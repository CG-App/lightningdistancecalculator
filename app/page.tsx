// app/page.tsx
import type { Metadata } from "next";
import LightningDistanceCalculator from "../components/LightningDistanceCalculator"; // relative import

export const metadata: Metadata = {
  title: "Lightning Distance Calculator",
  description:
    "Time the thunder to estimate how far lightning struck — in miles, kilometers, feet, and more.",
  alternates: { canonical: "https://lightningdistancecalculator.com/" },
  openGraph: {
    title: "Lightning Distance Calculator",
    description:
      "Estimate lightning strike distance by timing the seconds between flash and thunder.",
    url: "https://lightningdistancecalculator.com/",
    siteName: "Lightning Distance Calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lightning Distance Calculator",
    description:
      "Estimate lightning strike distance by timing the seconds between flash and thunder.",
  },
};

export default function HomePage() {
  // JSON-LD: WebApplication
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Lightning Distance Calculator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: "https://lightningdistancecalculator.com/",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Estimate how far away lightning struck using flash-to-bang timing.",
  } as const;

  // JSON-LD: Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://lightningdistancecalculator.com/",
      },
    ],
  } as const;

  // JSON-LD: HowTo
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Estimate Lightning Distance Using Thunder Timing",
    step: [
      { "@type": "HowToStep", name: "Watch for lightning", text: "Tap Start when you see the flash." },
      { "@type": "HowToStep", name: "Listen for thunder", text: "Tap Stop when you hear the boom." },
      { "@type": "HowToStep", name: "Read the distance", text: "Use miles≈seconds/5 or km≈seconds/3." },
    ],
  } as const;

  // JSON-LD: FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How accurate is the lightning distance estimate?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "It is an estimate based on average sound speed. Temperature, humidity, wind, and terrain affect results. Treat as informational only.",
        },
      },
      {
        "@type": "Question",
        name: "What formula does the calculator use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Miles ≈ seconds/5; Kilometers ≈ seconds/3.",
        },
      },
    ],
  } as const;

  return (
    <main className="content" role="main" aria-label="Lightning Distance Calculator">
      {/* Accessible H1 without duplicating visual titles */}
      <h1 className="sr-only">Lightning Distance Calculator</h1>

      {/* JSON-LD: WebApplication + Breadcrumb + HowTo + FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Calculator window (locked styling via .content-app in globals.css) */}
      <section className="content-app">
        <LightningDistanceCalculator />
      </section>

      {/* Crawlable explanatory copy (inherits .content styles, incl. dark mode) */}
      <section className="mt-8 prose prose-neutral dark:prose-invert max-w-none" aria-label="About the calculator">
        <h2 className="!mt-0">How The Lightning Distance Calculator Works</h2>
        <p>
          The calculator uses the classic flash-to-bang method. Sound travels roughly{" "}
          <strong>1 mile every ~5 seconds</strong> (or <strong>1 km every ~3 seconds</strong>). Time the delay between the
          flash and the thunder, and the tool converts that timing into distance across multiple units.
        </p>
        <p className="text-sm opacity-80">
          <strong>Safety:</strong> This tool is informational only. Lightning can strike unpredictably. Follow official weather
          guidance.
        </p>
      </section>
    </main>
  );
}
