import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand & tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-lg font-bold text-stone-900">
                TradeInvoice
              </span>
              <span className="rounded bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600">
                UK
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-sm text-stone-500">
              Quote on site. Invoice in seconds. For UK tradespeople.
            </p>
          </div>

          {/* Links grouped */}
          <div className="flex flex-wrap gap-x-10 gap-y-6 sm:gap-x-12">
            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Product</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features/invoice-generator"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Invoice Generator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Free Tools
                  </Link>
                </li>
              </ul>
            </div>

            {/* Use cases */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Use Cases</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/use-cases/electricians"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Electricians
                  </Link>
                </li>
                <li>
                  <Link
                    href="/use-cases/plumbers"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Plumbers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/use-cases/carpenters"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Carpenters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/use-cases/fitters"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Fitters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/use-cases/freelancers"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Freelancers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/use-cases/small-business"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Small Business
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Company</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Legal</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social links placeholder */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-stone-500">
          <a
            href="https://twitter.com/tradeinvoice"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-700"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/company/tradeinvoice"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-700"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/tradeinvoice"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-700"
          >
            Instagram
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-stone-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500">
            © {year} TradeInvoice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
