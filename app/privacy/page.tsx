import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Lightning Distance Calculator. Learn what we (don’t) collect and how your data is handled.",
};

export default function PrivacyPage() {
  return (
    <main className="content">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> [09/01/2025]
      </p>

      <h2>Overview</h2>
      <p>
        Lightning Distance Calculator (the “Site”) is designed to be fast and
        simple. We aim to collect as little information as possible and avoid
        tracking where we can.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Automatically collected (minimal):</strong> Standard server or
          CDN logs (e.g., IP address, user agent, and basic request details) may
          be retained briefly to operate and secure the Site.
        </li>
        <li>
          <strong>Voluntary submissions:</strong> If you choose to send feedback
          (see Feedback page), we receive the content you submit.
        </li>
      </ul>

      <h2>What We Don’t Do</h2>
      <ul>
        <li>No account creation and no user profiles.</li>
        <li>No selling of personal information.</li>
        <li>No targeted advertising based on personal data.</li>
      </ul>

      <h2>Cookies &amp; Analytics</h2>
      <p>
        The Site currently does <strong>not</strong> use analytics or set
        cookies for tracking. If analytics are added later, they will only run
        on the production domain and will be documented here.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may link to third-party sites. Their privacy practices are outside
        our control. Review their policies before using those sites.
      </p>

      <h2>Data Security</h2>
      <p>
        We use reasonable safeguards to protect minimal data in transit and at
        rest where applicable. No method of transmission or storage is
        completely secure.
      </p>

      <h2>Children’s Privacy</h2>
      <p>
        The Site is not directed to children under 13. If you believe we have
        inadvertently received information from a child, please refrain from
        submitting further information.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. Continued use of
        the Site after changes indicates acceptance of the updated policy.
      </p>
    </main>
  );
}
