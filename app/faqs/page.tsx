import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently Asked Questions about the Lightning Distance Calculator.",
};

export default function FaqsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <h1>Frequently Asked Questions</h1>

      <h2>How does the calculator estimate distance?</h2>
      <p>
        It uses the time delay between seeing lightning and hearing thunder. Sound travels much slower than light; multiplying the delay by the speed of sound gives an approximate distance.
      </p>

      <h2>How accurate is it?</h2>
      <p>
        It’s an estimate. Temperature, wind, terrain, and echo can affect the time you hear thunder. Treat results as rough guidance only—never as safety advice.
      </p>

      <h2>Which units can I use?</h2>
      <p>
        The tool supports both metric and imperial. You can switch units in the interface.
      </p>

      <h2>Can I rely on this for safety decisions?</h2>
      <p>
        No. The calculator is for informational and educational use only. Always follow weather authority guidance and exercise caution during storms.
      </p>

      <h2>Why don’t I hear thunder sometimes?</h2>
      <p>
        Thunder may be too distant, masked by wind or other noise, or dissipated by terrain. If you see lightning, assume storms are close enough to be hazardous.
      </p>
    </main>
  );
}
