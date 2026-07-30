import { AppLayout } from "@/components/layout";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { getServices } from "@/services";

export default async function DashboardPage() {
  const metrics = await getServices().dashboardService.getMetrics();

  return (
    <AppLayout>
      <DashboardClient initialMetrics={metrics} />
    </AppLayout>
  );
}
