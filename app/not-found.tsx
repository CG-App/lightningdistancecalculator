// app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Lightning Distance Calculator",
  description:
    "The page you are looking for could not be found. Return to the homepage to try again.",
  alternates: {
    canonical: "https://lightningdistancecalculator.com/",
  },
};

export default function NotFoundPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4 text-center">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600">
        Sorry, the page you requested could not be found.
      </p>
      <Link href="/" className="underline text-blue-600">
        Go back to Home →
      </Link>
    </main>
  );
}
