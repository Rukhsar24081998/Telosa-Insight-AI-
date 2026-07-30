import { AppLayout } from "@/components/layout";
import { LoadingSkeleton, PageContainer } from "@/components/shared";

export default function BusinessImpactLoading() {
  return (
    <AppLayout
      title="Business Impact Intelligence"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Conversation" },
        { label: "Business Impact" },
      ]}
    >
      <PageContainer>
        <LoadingSkeleton variant="text" count={2} className="max-w-xl" />
        <LoadingSkeleton variant="detail" />
        <div className="grid gap-6 xl:grid-cols-2">
          <LoadingSkeleton variant="card" count={4} />
          <LoadingSkeleton variant="card" count={2} />
        </div>
      </PageContainer>
    </AppLayout>
  );
}
