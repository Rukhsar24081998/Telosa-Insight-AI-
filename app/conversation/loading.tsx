import { AppLayout } from "@/components/layout";
import { LoadingSkeleton, PageContainer } from "@/components/shared";

export default function ConversationsLoading() {
  return (
    <AppLayout title="Conversations">
      <PageContainer>
        <LoadingSkeleton variant="text" count={2} className="max-w-md" />
        <LoadingSkeleton variant="list" count={6} />
      </PageContainer>
    </AppLayout>
  );
}
