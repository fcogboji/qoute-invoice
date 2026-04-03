export default function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is TradeInvoice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TradeInvoice is an online invoicing platform for UK tradespeople. You create and manage quotes and invoices in one place, store customers, and export PDFs. It is designed for electricians, plumbers, builders, fitters and similar trades who want simple tools without complex accounting software.",
        },
      },
      {
        "@type": "Question",
        name: "Can I create invoices and quotes online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You build quotes with line items, apply UK VAT where needed, then convert an accepted quote to an invoice. You can download or share PDFs and track which invoices are paid. Everything runs in the browser on desktop or mobile.",
        },
      },
      {
        "@type": "Question",
        name: "Is TradeInvoice free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer a 7-day free trial with full access. After the trial, paid plans are available on monthly or yearly billing. See the pricing page for current UK prices in pounds.",
        },
      },
      {
        "@type": "Question",
        name: "Does it handle UK VAT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Standard 20% VAT can be calculated on your quotes and invoices. You can tailor line items and totals for each job. Figures are shown in pounds sterling with formats suited to UK invoices.",
        },
      },
      {
        "@type": "Question",
        name: "Who is TradeInvoice for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sole traders and small businesses in the UK who issue quotes and invoices to domestic or business clients: trades, contractors, freelancers and anyone who outgrew paper or Excel.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the contact page on this website to send a message. For billing, payment methods are managed securely through our payment provider when you subscribe.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
