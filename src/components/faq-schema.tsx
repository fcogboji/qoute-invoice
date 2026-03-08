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
          text: "TradeInvoice is an online invoicing platform that helps UK tradespeople create, manage and track quotes and invoices easily. Built for electricians, plumbers, builders and contractors.",
        },
      },
      {
        "@type": "Question",
        name: "Can I create invoices online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. TradeInvoice allows you to create professional quotes and invoices, convert quotes to invoices, and export PDFs to send to clients instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Is TradeInvoice free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TradeInvoice offers a 7-day free trial. After that, you can choose a plan that fits your invoicing needs.",
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
