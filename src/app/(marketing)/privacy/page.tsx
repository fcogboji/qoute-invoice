import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — TradesQuote",
  description: "TradesQuote privacy policy. How we collect, use and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="text-stone-900">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-900">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-bold md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-stone-500">
          Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="mt-10 space-y-8 text-stone-600 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-stone-900 [&_h2]:first:mt-0 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <section>
            <h2>1. Introduction</h2>
            <p>
              TradesQuote (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the TradesQuote platform and website. We are committed to protecting your privacy and handling your data in an open and transparent way. This policy explains how we collect, use, store and protect your personal information when you use our services.
            </p>
          </section>

          <section>
            <h2>2. Information we collect</h2>
            <p>We may collect and process the following information:</p>
            <ul>
              <li><strong>Account information:</strong> name, email address, and authentication details provided when you sign up</li>
              <li><strong>Business data:</strong> quotes, invoices, customer names and contact details you add to the platform</li>
              <li><strong>Usage data:</strong> how you use our service, including features used and pages visited</li>
              <li><strong>Technical data:</strong> IP address, browser type, device information, and cookies</li>
              <li><strong>Payment data:</strong> billing details (handled securely by Stripe; we do not store card numbers)</li>
            </ul>
          </section>

          <section>
            <h2>3. How we use your information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide, maintain and improve our quoting and invoicing services</li>
              <li>Process your account, subscriptions and payments</li>
              <li>Send you service-related communications and support</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
              <li>Improve our product based on usage patterns (in anonymised form where possible)</li>
            </ul>
          </section>

          <section>
            <h2>4. Legal basis (UK GDPR)</h2>
            <p>
              Under UK GDPR, we process your data on the basis of: (a) your consent; (b) performance of our contract with you; (c) our legitimate interests (e.g. improving our service, security); and (d) legal obligations.
            </p>
          </section>

          <section>
            <h2>5. Data sharing</h2>
            <p>
              We may share your data with trusted service providers who help us run our platform (e.g. hosting, payments, authentication). We do not sell your personal data. We may disclose data where required by law.
            </p>
          </section>

          <section>
            <h2>6. Data retention</h2>
            <p>
              We retain your data for as long as your account is active and as needed to provide our services. After account closure, we may retain certain data for legal, regulatory or dispute resolution purposes.
            </p>
          </section>

          <section>
            <h2>7. Your rights</h2>
            <p>
              Under UK data protection law, you have the right to access, rectify, erase, restrict processing, object, and data portability. You may also withdraw consent where processing is consent-based. You have the right to complain to the Information Commissioner&apos;s Office (ICO) at ico.org.uk.
            </p>
          </section>

          <section>
            <h2>8. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss or misuse.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>
              For privacy-related queries, contact us at the email address provided in your account or on our website.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
