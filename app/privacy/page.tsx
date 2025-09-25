import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Lightning Distance Calculator. Learn what data we collect, how it is used, and your rights.",
};

export default function PrivacyPage() {
  return (
    <main className="content">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last Updated:</strong> September 1, 2025
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following categories of information:</p>
      <ul>
        <li>
          <strong>Automatically Collected Information:</strong> When you access
          the Website, certain information may be collected automatically,
          including your IP address, browser type, operating system, device
          information, referring URLs, pages viewed, and access times.
        </li>
        <li>
          <strong>Cookies and Tracking Technologies:</strong> We and our
          third-party service providers may use cookies, pixels, and similar
          technologies to collect data about your browsing activities.
        </li>
        <li>
          <strong>No Direct Personal Accounts:</strong> The Website does not
          require user registration or direct submission of sensitive personal
          information.
        </li>
      </ul>

      <h2>2. How We Use Information</h2>
      <ul>
        <li>Operate, maintain, and improve the Website and its functionality</li>
        <li>Analyze trends, usage, and performance</li>
        <li>Serve advertisements and affiliate links</li>
        <li>Enhance content relevance and user experience</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. Cookies and Tracking</h2>
      <p>
        The Website uses cookies and similar tracking technologies for
        analytics, advertising, and site functionality. Users can manage cookie
        preferences through their browser settings, though disabling cookies may
        affect site performance.
      </p>

      <h2>4. Third-Party Services</h2>
      <p>We may use third-party services, including but not limited to:</p>
      <ul>
        <li>
          <strong>Analytics Providers</strong> (e.g., Google Analytics) to
          collect information about Website usage
        </li>
        <li>
          <strong>Advertising Partners</strong> (e.g., Google Ads, affiliate
          networks) to display ads or affiliate promotions
        </li>
        <li>
          <strong>External Links:</strong> The Website may link to third-party
          sites. We are not responsible for the content or practices of such
          third parties.
        </li>
      </ul>
      <p>Use of third-party services is subject to their respective privacy policies.</p>

      <h2>5. Data Sharing and Disclosure</h2>
      <p>We do not sell personal information. We may share limited data with:</p>
      <ul>
        <li>Service providers who support Website functionality</li>
        <li>
          Advertising and affiliate partners to enable revenue generation
        </li>
        <li>
          Legal authorities if required by law, regulation, or valid legal
          request
        </li>
      </ul>

      <h2>6. Data Retention</h2>
      <p>
        We retain collected information only as long as necessary to fulfill the
        purposes outlined in this Privacy Policy or as required by law.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We implement reasonable administrative, technical, and physical
        safeguards to protect collected information. However, no method of
        transmission over the internet or electronic storage is completely
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>8. International Data Transfers</h2>
      <p>
        Information collected may be processed and stored in jurisdictions
        outside your location. By using the Website, you consent to such
        transfers, which may have different data protection laws than your
        jurisdiction.
      </p>

      <h2>9. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have rights regarding your
        personal information, including:
      </p>
      <ul>
        <li>Right to access, correct, or delete personal data</li>
        <li>Right to restrict or object to certain processing</li>
        <li>Right to data portability</li>
        <li>Right to withdraw consent (where applicable)</li>
        <li>
          Right to opt-out of the sale of personal information (California CCPA,
          if applicable)
        </li>
      </ul>
      <p>
        To exercise these rights, contact us using the information provided in
        Section 12.
      </p>

      <h2>10. Children’s Privacy</h2>
      <p>
        The Website may only be used by individuals who have reached the minimum
        age of digital consent in their jurisdiction. We do not knowingly
        collect information from users below that age. If you believe we have
        inadvertently collected such data, please contact us, and we will delete
        it promptly.
      </p>

      <h2>11. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The updated version
        will be posted on this page with a new “Last Updated” date. Continued
        use of the Website after updates constitutes acceptance of the revised
        Privacy Policy.
      </p>
    </main>
  );
}
