"use client";

import { AppLayout } from "@/components/layout";
import { EmptyState, PageContainer } from "@/components/shared";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppLayout title="Executive Intelligence Dashboard">
      <PageContainer>
        <EmptyState
          variant="warning"
          title="Dashboard intelligence unavailable"
          description="The dashboard service could not aggregate the current metrics."
          actionLabel="Retry"
          onAction={reset}
        />
      </PageContainer>
    </AppLayout>
  );
}
