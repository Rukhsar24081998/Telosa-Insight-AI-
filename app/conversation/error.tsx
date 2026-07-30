"use client";

import { AppLayout } from "@/components/layout";
import { EmptyState, PageContainer } from "@/components/shared";

export default function ConversationsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppLayout title="Conversations">
      <PageContainer>
        <EmptyState
          variant="warning"
          title="Conversation workspace unavailable"
          description="The service could not load conversations. Please retry."
          actionLabel="Retry"
          onAction={reset}
        />
      </PageContainer>
    </AppLayout>
  );
}
