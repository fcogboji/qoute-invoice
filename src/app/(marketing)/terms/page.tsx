import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — tradeinvoice",
  description: "tradeinvoice terms and conditions of use.",
};

export default function TermsPage() {
  return (
    <div className="text-stone-900">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-900">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-bold md:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-stone-500">
          Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="mt-10 space-y-8 text-stone-600 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-stone-900 [&_h2]:first:mt-0 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <section>
            <h2>1. Agreement to terms</h2>
            <p>
              By accessing or using tradeinvoice (&quot;the Service&quot;), you agree to be bound by these Terms &amp; Conditions. If you do not agree, you must not use the Service. We may update these terms from time to time; continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2>2. The service</h2>
            <p>
              tradeinvoice provides software for creating quotes and invoices, aimed at UK tradespeople. The Service is offered &quot;as is&quot;. We strive to maintain availability but do not guarantee uninterrupted access. Access to the dashboard and core features (quotes, invoices, customers) is restricted to paying subscribers only. Anyone may view our landing page and pricing information without subscribing.
            </p>
          </section>

          <section>
            <h2>3. Free trial and subscription</h2>
            <p>
              We offer a 7-day free trial for new subscribers. To start your trial, you must add a valid payment method. You will not be charged during the 7-day trial. At the end of the trial, your card will be charged automatically for your chosen plan (Starter or Pro) unless you cancel before the trial ends. By starting a trial, you authorise us to charge your payment method at the end of the trial period. There is no free plan; all plans require a paid subscription.
            </p>
          </section>

          <section>
            <h2>4. Your account</h2>
            <p>
              You must provide accurate information when registering. You are responsible for keeping your login details secure and for all activity under your account. You must notify us promptly of any unauthorised use.
            </p>
          </section>

          <section>
            <h2>5. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose or in breach of applicable laws</li>
              <li>Attempt to gain unauthorised access to our systems or other users&apos; accounts</li>
              <li>Upload content that infringes third-party rights or is defamatory, harmful or offensive</li>
              <li>Overload or disrupt the Service or its infrastructure</li>
              <li>Resell, sublicense or redistribute the Service without our written consent</li>
            </ul>
          </section>

          <section>
            <h2>6. Subscription and payment</h2>
            <p>
              Paid plans are billed in advance (monthly). Fees are non-refundable unless required by law or as stated in our refund policy. We may change pricing with reasonable notice. You may cancel your subscription at any time; access continues until the end of the current billing period. If you cancel during your trial, you will not be charged. Payment is collected automatically by Stripe on behalf of tradeinvoice.
            </p>
          </section>

          <section>
            <h2>7. Intellectual property</h2>
            <p>
              We own all rights in the Service, including software, design and branding. You retain ownership of the content you create (e.g. quotes, invoices). By using the Service, you grant us a limited licence to host, store and process your content as needed to provide the Service.
            </p>
          </section>

          <section>
            <h2>8. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special or consequential losses, or loss of profits or data. Our total liability for any claim arising from these terms or the Service shall not exceed the fees you paid us in the 12 months before the claim.
            </p>
          </section>

          <section>
            <h2>9. Termination</h2>
            <p>
              We may suspend or terminate your account if you breach these terms or for other reasonable cause. You may close your account at any time. On termination, your right to use the Service ceases. We may retain your data as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2>10. Governing law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2>11. Contact</h2>
            <p>
              For questions about these terms, contact us using the details provided on our website.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
