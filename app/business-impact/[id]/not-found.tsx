import Link from "next/link";

import { AppLayout } from "@/components/layout";
import { EmptyState, PageContainer } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BusinessImpactNotFound() {
  return (
    <AppLayout title="Business Impact Intelligence">
      <PageContainer>
        <EmptyState
          variant="warning"
          title="Conversation not found"
          description="A Business Impact assessment cannot be generated for this conversation ID."
        />
        <div className="flex justify-center">
          <Link
            href="/conversation"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Return to Conversations
          </Link>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
