import { AppLayout } from "@/components/layout";
import { LoadingSkeleton, PageContainer } from "@/components/shared";

export default function DashboardLoading() {
  return (
    <AppLayout title="Executive Intelligence Dashboard">
      <PageContainer>
        <LoadingSkeleton variant="text" count={2} className="max-w-xl" />
        <LoadingSkeleton variant="kpi" count={6} />
        <div className="grid gap-6 xl:grid-cols-2">
          <LoadingSkeleton variant="list" count={5} />
          <LoadingSkeleton variant="card" count={3} />
        </div>
      </PageContainer>
    </AppLayout>
  );
}
