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
              <span className="text-lg font-bold text-stone-900">tradeinvoice</span>
              <span className="rounded bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600">
                UK
              </span>
            </Link>
            <p className="mt-2 text-sm text-stone-500 max-w-xs">
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
                  <Link href="/#features" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Legal</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-200 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500">
            © {year} tradeinvoice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
