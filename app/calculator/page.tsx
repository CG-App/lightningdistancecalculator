// app/calculator/page.tsx
import type { Metadata } from "next";
import LightningCalculator from "@/components/LightningCalculator";

export const metadata: Metadata = {
  title: "Calculator | Lightning Distance Calculator",
  description: "Estimate how far away a storm is using the thunder-lag method.",
  alternates: {
    canonical: "https://lightningdistancecalculator.com/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Lightning Distance Calculator</h1>
      <p>Enter the seconds between lightning and thunder, or use a stopwatch.</p>
      <LightningCalculator />
    </main>
  );
}
