import { AppLayout } from "@/components/layout";
import { LoadingSkeleton, PageContainer } from "@/components/shared";

export default function ConversationDetailLoading() {
  return (
    <AppLayout
      title="Conversation Intelligence"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Conversations", href: "/conversation" },
        { label: "Loading…" },
      ]}
      insightPanel={
        <div className="p-5">
          <LoadingSkeleton variant="detail" />
        </div>
      }
    >
      <PageContainer>
        <LoadingSkeleton variant="text" count={2} className="max-w-lg" />
        <div className="grid gap-6 lg:grid-cols-2">
          <LoadingSkeleton variant="detail" />
          <LoadingSkeleton variant="detail" />
        </div>
      </PageContainer>
    </AppLayout>
  );
}
