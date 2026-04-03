import Link from "next/link";
import FAQSchema from "@/components/faq-schema";
import SoftwareSchema from "@/components/software-schema";
import { LandingHeroLogo } from "@/components/landing-hero-logo";
import { LandingHeroCta } from "@/components/landing-hero-cta";
import { LandingBottomCta } from "@/components/landing-bottom-cta";

const TESTIMONIALS = [
  {
    name: "SparkRight Electrical",
    text: "Quote on site, convert to invoice in one tap. VAT sorted automatically. No more spreadsheets or chasing payments.",
    initials: "SR",
    image: null as string | null,
  },
  {
    name: "James T. Plumbing",
    text: "The PDFs look proper and my customers take me seriously. I do everything from my phone between jobs.",
    initials: "JT",
    image: null,
  },
  {
    name: "Oakwood Builders",
    text: "We switched from paper invoices to this and it saved us hours. UK pricing and 20% VAT — just works.",
    initials: "OB",
    image: null,
  },
  {
    name: "Sarah Mitchell",
    text: "Finally an invoicing app that doesn't overcomplicate things. I send quotes the same day and get paid faster.",
    initials: "SM",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Chen",
    text: "Clean PDFs, VAT calculated correctly, and I can do it all from the van. Exactly what I needed.",
    initials: "DC",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="text-[#0F2544]">
      <FAQSchema />
      <SoftwareSchema />
      {/* Hero — server-rendered HTML text for crawlers (no JS shell) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-32">
        <div className="text-center">
          <LandingHeroLogo />
          <span className="inline-block rounded-full bg-[#00C6A2]/15 px-4 py-1.5 text-sm font-semibold text-[#0F2544]">
            For UK tradespeople
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#0F2544] md:text-5xl lg:text-6xl">
            TradeInvoice
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#0F2544]/80 md:text-xl">
            TradeInvoice is a simple invoicing platform that helps UK tradespeople create and manage quotes and invoices
            online. Quote on site.{" "}
            <span className="font-semibold text-[#0F2544]">Invoice in seconds.</span>
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#0F2544]/70 md:text-xl">
            Built for electricians, plumbers, builders, fitters, freelancers and small business. No paperwork. UK VAT
            sorted. Works on your phone.
          </p>

          <LandingHeroCta />
        </div>

        {/* Trust row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-[#0F2544]/60 sm:mt-16 sm:gap-8">
          <span className="flex items-center gap-2">
            <span className="font-semibold text-[#0F2544]">£</span> UK pricing
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold text-[#0F2544]">20%</span> VAT auto
          </span>
          <span>Works on phone & laptop</span>
          <span>No spreadsheets</span>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-left sm:mt-20">
          <h2 className="text-xl font-bold text-[#0F2544] md:text-2xl">What is TradeInvoice?</h2>
          <p className="mt-4 text-base leading-relaxed text-[#0F2544]/80">
            TradeInvoice is online software for UK tradespeople who need to send quotes and invoices without wrestling
            with spreadsheets or generic accounting tools. You create a customer once, build quotes with line items for
            labour, materials and parts, and the app calculates subtotals and 20% VAT in line with standard UK practice.
            When a job is agreed, you convert the quote to an invoice in one step and export a professional PDF to email
            or message to your client.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#0F2544]/80">
            The service is built for sole traders and small teams: electricians, plumbers, carpenters, kitchen fitters,
            landscapers, handymen and freelancers who invoice in pounds. You can use it on a phone on site or on a laptop
            in the office. Pricing is shown clearly on our pricing page: we offer a 7-day free trial so you can try the
            full workflow before you pay. After the trial you choose a monthly or yearly plan. There is no long-term
            contract; you can cancel according to our terms.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#0F2544]/80">
            TradeInvoice is not a replacement for your accountant for tax filings, but it helps you look professional,
            stay organised and get paid faster with clear documents your customers understand. If you need help, you can
            reach us via the contact page on this website.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-[#0F2544]/10 bg-white p-4 shadow-xl sm:mt-20 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0F2544]/50">What you get</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#0F2544]/70">Labour</span>
              <span className="font-medium">£450.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#0F2544]/70">Materials</span>
              <span className="font-medium">£180.00</span>
            </div>
            <div className="flex justify-between border-t border-[#0F2544]/10 pt-2 text-sm text-[#0F2544]/60">
              <span>VAT (20%)</span>
              <span>£126.00</span>
            </div>
            <div className="flex justify-between border-t border-[#0F2544]/10 pt-2 font-bold">
              <span>Total</span>
              <span className="bg-gradient-to-r from-[#00C6A2] to-[#00A3FF] bg-clip-text text-transparent">£756.00</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-[#0F2544] py-2.5 text-center text-sm font-medium text-white">
              Export PDF
            </span>
            <span className="flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-[#0F2544]/5 py-2.5 text-center text-sm font-medium text-[#0F2544]">
              → Invoice
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-[#0F2544]/10 bg-stone-50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-[#0F2544] md:text-3xl">What tradespeople say</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#0F2544]/70">
            Real feedback from electricians, plumbers and builders.
          </p>
          <div className="mt-12 space-y-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="flex gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#0F2544]/10">
                  {t.image ? (
                    <img src={t.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#0F2544]">
                      {t.initials}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-[#0F2544]/80">{t.name}</span>
                    <span className="flex text-amber-400" aria-hidden>
                      ★★★★★
                    </span>
                  </div>
                  <div className="mt-3 rounded-xl border border-[#0F2544]/10 bg-white p-4 shadow-sm">
                    <p className="text-[#0F2544]/90">&ldquo;{t.text}&rdquo;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-[#0F2544]/10 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-[#0F2544] md:text-3xl">Made for how trades actually work</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#0F2544]/70">On site. On your phone. No fuss.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Quote in minutes",
                text: "Labour, materials, parts — add line items and get a total. VAT calculated for you.",
              },
              {
                title: "UK-ready",
                text: "20% VAT, £ pricing, UK date format. No setup. Just works.",
              },
              {
                title: "One tap to invoice",
                text: "Quote approved? Convert to invoice and export PDF. Get paid.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F2544]/10 bg-[#0F2544]/[0.02] p-6">
                <h3 className="text-lg font-semibold text-[#0F2544]">{item.title}</h3>
                <p className="mt-2 text-[#0F2544]/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#0F2544]/10 bg-[#0F2544]/[0.02] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-[#0F2544] md:text-3xl">Frequently asked questions</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[#0F2544]/70">
            Straight answers about quotes, invoices, trials and who TradeInvoice is for.
          </p>
          <dl className="mt-10 space-y-8">
            <div>
              <dt className="text-lg font-semibold text-[#0F2544]">What is TradeInvoice?</dt>
              <dd className="mt-2 text-[#0F2544]/80">
                TradeInvoice is an online invoicing platform for UK tradespeople. You create and manage quotes and
                invoices in one place, store customers, and export PDFs. It is designed for electricians, plumbers,
                builders, fitters and similar trades who want simple tools without complex accounting software.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-[#0F2544]">Can I create invoices and quotes online?</dt>
              <dd className="mt-2 text-[#0F2544]/80">
                Yes. You build quotes with line items, apply UK VAT where needed, then convert an accepted quote to an
                invoice. You can download or share PDFs and track which invoices are paid. Everything runs in the browser
                on desktop or mobile.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-[#0F2544]">Is TradeInvoice free?</dt>
              <dd className="mt-2 text-[#0F2544]/80">
                We offer a 7-day free trial with full access so you can test the workflow. After the trial, paid plans are
                available on monthly or yearly billing. See the pricing page for current UK prices in pounds and what each
                plan includes.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-[#0F2544]">Does it handle UK VAT?</dt>
              <dd className="mt-2 text-[#0F2544]/80">
                Yes. Standard 20% VAT can be calculated on your quotes and invoices. You can tailor line items and
                totals for each job. Figures are shown in pounds sterling with formats suited to UK invoices.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-[#0F2544]">Who is TradeInvoice for?</dt>
              <dd className="mt-2 text-[#0F2544]/80">
                Sole traders and small businesses in the UK who issue quotes and invoices to domestic or business clients:
                trades, contractors, freelancers and anyone who outgrew paper or Excel. If you work on site and need
                speed, it is built for you.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-[#0F2544]">How do I get support?</dt>
              <dd className="mt-2 text-[#0F2544]/80">
                Use the contact page on this website to send a message. We aim to help UK-based customers with account and
                product questions. For billing, payment methods are managed securely through our payment provider when you
                subscribe.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-t border-[#0F2544]/10 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-[#0F2544] md:text-3xl">Popular Invoice Guides</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/seo/invoice-generator"
              className="rounded-xl border border-[#0F2544]/10 bg-[#0F2544]/[0.02] px-4 py-2.5 text-sm font-medium text-[#0F2544] transition-colors hover:border-[#0F2544]/20 hover:bg-[#0F2544]/5"
            >
              Invoice Generator
            </Link>
            <Link
              href="/seo/invoice-template-uk"
              className="rounded-xl border border-[#0F2544]/10 bg-[#0F2544]/[0.02] px-4 py-2.5 text-sm font-medium text-[#0F2544] transition-colors hover:border-[#0F2544]/20 hover:bg-[#0F2544]/5"
            >
              Invoice Template UK
            </Link>
            <Link
              href="/seo/invoice-software-for-freelancers"
              className="rounded-xl border border-[#0F2544]/10 bg-[#0F2544]/[0.02] px-4 py-2.5 text-sm font-medium text-[#0F2544] transition-colors hover:border-[#0F2544]/20 hover:bg-[#0F2544]/5"
            >
              Invoice Software for Freelancers
            </Link>
            <Link
              href="/tools"
              className="rounded-xl border border-[#0F2544]/10 bg-[#0F2544]/[0.02] px-4 py-2.5 text-sm font-medium text-[#0F2544] transition-colors hover:border-[#0F2544]/20 hover:bg-[#0F2544]/5"
            >
              Free Tools
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#0F2544]/10 bg-[#0F2544]/[0.03] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[#0F2544] md:text-3xl">Built for UK trades. That&apos;s it.</h2>
          <p className="mt-4 text-[#0F2544]/70">No bloat. No learning curve. Just quotes and invoices that work.</p>
          <LandingBottomCta />
        </div>
      </section>
    </div>
  );
}
