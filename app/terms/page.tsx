import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for Lightning Distance Calculator. Please read these terms before using the site.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <h1>Terms &amp; Conditions</h1>
      <p><strong>Effective Date:</strong> [09/01/2025]</p>

      <h2>Acceptance of Terms</h2>
      <p>
        By using the Lightning Distance Calculator website (the “Site”), you agree to be bound by
        these Terms &amp; Conditions. If you do not agree, you must discontinue use of the Site
        immediately.
      </p>

      <h2>Informational Use Only</h2>
      <p>
        The Site and its tools are provided strictly for <strong>informational and educational
        purposes</strong>. They are not intended to serve as safety advice, professional advice, or
        a substitute for guidance from weather authorities or emergency services.
      </p>

      <h2>No Warranties</h2>
      <p>
        The Site, its content, and its calculator are provided on an <strong>“as-is” and
        “as-available”</strong> basis. We make no warranties, express or implied, regarding
        accuracy, reliability, or suitability for any particular purpose. Use of the Site is at your
        sole risk.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law:
      </p>
      <ul>
        <li>
          The owners, creators, developers, contributors, and any parties associated with the Site
          disclaim all liability for damages, losses, injuries, or claims that may arise from use of,
          or reliance on, the Site.
        </li>
        <li>
          This includes, but is not limited to, direct, indirect, incidental, consequential, or
          punitive damages.
        </li>
      </ul>
      <p>
        You acknowledge and agree that <strong>no party associated with the Site shall be held
        responsible</strong> for your actions or reliance on the calculator’s outputs.
      </p>

      <h2>User Responsibility</h2>
      <p>
        You are solely responsible for how you use the Site and the information provided. Always
        exercise judgment and follow official safety recommendations when dealing with weather
        events, storms, or lightning activity. The Site should never be relied upon for making
        emergency decisions.
      </p>

      <h2>Changes to the Terms</h2>
      <p>
        We may update or revise these Terms from time to time without notice. Your continued use of
        the Site constitutes acceptance of the updated Terms.
      </p>
    </main>
  );
}
