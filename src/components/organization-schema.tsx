export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TradeInvoice",
    url: "https://tradeinvoice.co.uk",
    logo: "https://tradeinvoice.co.uk/logo.png",
    sameAs: [
      "https://twitter.com/tradeinvoice",
      "https://www.linkedin.com/company/tradeinvoice",
      "https://www.instagram.com/tradeinvoice",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
