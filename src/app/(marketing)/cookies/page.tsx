import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — TradesQuote",
  description: "TradesQuote cookie policy. How we use cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="text-stone-900">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-900">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-bold md:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-stone-500">
          Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="mt-10 space-y-8 text-stone-600 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-stone-900 [&_h2]:first:mt-0 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-stone-300 [&_th]:bg-stone-100 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_td]:border [&_td]:border-stone-300 [&_td]:px-3 [&_td]:py-2">
          <section>
            <h2>1. What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you signed in, and understand how the site is used. We also use similar technologies such as local storage where relevant.
            </p>
          </section>

          <section>
            <h2>2. How we use cookies</h2>
            <p>
              We use cookies and similar technologies to:
            </p>
            <ul>
              <li><strong>Essential:</strong> Enable core functionality such as authentication and security</li>
              <li><strong>Preference:</strong> Remember your settings and preferences</li>
              <li><strong>Analytics:</strong> Understand how our service is used so we can improve it</li>
            </ul>
          </section>

          <section>
            <h2>3. Types of cookies we use</h2>
            <table className="mt-4 text-sm">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Authentication (e.g. Clerk)</td>
                  <td>Keep you signed in, manage sessions</td>
                  <td>Session / persistent</td>
                </tr>
                <tr>
                  <td>Security</td>
                  <td>Protect against abuse and fraud</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>Preferences</td>
                  <td>Remember your settings</td>
                  <td>Persistent</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>Understand usage patterns (anonymised)</td>
                  <td>Persistent</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>4. Third-party cookies</h2>
            <p>
              Some cookies are set by third-party services we use, such as authentication (Clerk) and payment (Stripe). These providers have their own privacy and cookie policies. We do not control third-party cookies.
            </p>
          </section>

          <section>
            <h2>5. Managing cookies</h2>
            <p>
              You can control cookies through your browser settings. Most browsers let you block or delete cookies. Note that blocking essential cookies may affect how the Service works (for example, you may not stay signed in).
            </p>
            <p>
              For more information, visit your browser&apos;s help section or allaboutcookies.org.
            </p>
          </section>

          <section>
            <h2>6. Updates</h2>
            <p>
              We may update this Cookie Policy from time to time. We will post the updated policy on this page and indicate the date of the last update.
            </p>
          </section>

          <section>
            <h2>7. Contact</h2>
            <p>
              If you have questions about our use of cookies, please contact us using the details on our website.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
