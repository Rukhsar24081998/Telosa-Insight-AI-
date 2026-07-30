"use client";

import { AppLayout } from "@/components/layout";
import { EmptyState, PageContainer } from "@/components/shared";

export default function BusinessImpactError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppLayout title="Business Impact Intelligence">
      <PageContainer>
        <EmptyState
          variant="warning"
          title="Business Impact unavailable"
          description="The impact services could not prepare this assessment."
          actionLabel="Retry"
          onAction={reset}
        />
      </PageContainer>
    </AppLayout>
  );
}
