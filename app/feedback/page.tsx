import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share feedback about the Lightning Distance Calculator.",
};

const MAILTO = "hello@lightningdistancecalculator.com";

export default function FeedbackPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <h1>Feedback</h1>
      <p>
        Have an idea, bug report, or suggestion? We’d love to hear it. For now, use the quick link below to open your email client with a prefilled subject line.
      </p>

      <p>
        <a
          className="inline-block no-underline rounded-lg px-4 py-2 border border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          href={`mailto:${MAILTO}?subject=${encodeURIComponent("Lightning Distance Calculator Feedback")}`}
        >
          Send Feedback
        </a>
      </p>

      <h2>What’s Helpful To Include</h2>
      <ul>
        <li>What you were trying to do and what happened</li>
        <li>Your device and browser (e.g., iPhone + Safari, Windows + Edge)</li>
        <li>Steps to reproduce, if it’s a bug</li>
        <li>Screenshots (if relevant)</li>
      </ul>

      <h2>Privacy Note</h2>
      <p>
        Feedback sent via email will include whatever you type. Don’t include sensitive personal information. See the Privacy Policy for details on what we collect (minimally) and why.
      </p>
    </main>
  );
}
