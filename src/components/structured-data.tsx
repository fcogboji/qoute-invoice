export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TradeInvoice",
    url: "https://tradeinvoice.co.uk",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tradeinvoice.co.uk/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
