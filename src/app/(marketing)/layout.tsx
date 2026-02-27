import MarketingHeader from "@/components/marketing-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <MarketingHeader />
      {children}
    </div>
  );
}
