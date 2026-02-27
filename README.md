# TradesQuote — UK Trades Quote & Invoice SaaS

Professional quoting and invoicing for UK tradespeople. Built with Next.js 15+, Clerk, Prisma, Neon, and Stripe.

## Features

- **Landing page** — Email capture, benefits, CTA
- **Dashboard** — Quotes and invoices overview
- **Quotes** — Create quotes with line items, VAT auto-calc, convert to invoice
- **Invoices** — Create invoices, track payments, mark as paid
- **Auth** — Clerk (email, social sign-in)
- **Billing** — Stripe subscription (optional)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

**Required for the app to run:**

| Variable | Where to get it |
|----------|-----------------|
| `DATABASE_URL` | [Neon](https://neon.tech) — free Postgres |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [Clerk](https://dashboard.clerk.com) — free tier |
| `CLERK_SECRET_KEY` | Clerk dashboard |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` for local |

**Optional (for Stripe billing):**

| Variable | Where to get it |
|----------|-----------------|
| `STRIPE_SECRET_KEY` | [Stripe Dashboard](https://dashboard.stripe.com) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe |
| `STRIPE_PRICE_ID` | Create a product/price in Stripe |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhooks |

### 3. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx
│   ├── (auth)/               # Sign-in, sign-up (Clerk)
│   ├── dashboard/            # Protected dashboard
│   │   ├── quotes/           # List, new, detail
│   │   └── invoices/         # List, new, detail
│   └── api/
│       ├── quotes/           # CRUD quotes
│       ├── invoices/         # CRUD, from-quote, mark paid
│       ├── checkout/         # Stripe checkout
│       └── webhooks/stripe/  # Stripe webhooks
├── lib/
│   ├── prisma.ts
│   ├── auth.ts               # getOrCreateUser (Clerk sync)
│   └── constants.ts
└── middleware.ts             # Clerk auth
```

## Tech stack

- **Next.js 16** — App Router
- **Clerk** — Auth
- **Prisma** — ORM
- **Neon** — Serverless Postgres
- **Stripe** — Subscriptions
- **Tailwind CSS** — Styling

## Deployment

1. Deploy to [Vercel](https://vercel.com)
2. Add env vars in Vercel project settings
3. Set up Neon and run `prisma db push` (or migrations)
4. Configure Clerk redirect URLs for your production domain
5. Configure Stripe webhook for `/api/webhooks/stripe`

## License

MIT
# qoute-invoice
