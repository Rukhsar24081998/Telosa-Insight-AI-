"use server";

import { getServices } from "@/services";
import type {
  DashboardDateRange,
  DashboardFilters,
} from "@/services/dashboard/DashboardService";
import type {
  ConversationChannel,
  DashboardMetrics,
  Priority,
} from "@/types";
import { conversationChannels, priorities } from "@/types";

export type DashboardQuery = {
  search?: string;
  clinicId?: string | "All";
  priority?: Priority | "All";
  channel?: ConversationChannel | "All";
  dateRange?: DashboardDateRange;
};

function isOneOf<T extends string>(
  value: string | undefined,
  values: readonly T[],
): value is T {
  return value !== undefined && values.includes(value as T);
}

function sanitizeQuery(query: DashboardQuery): DashboardFilters {
  const dateRanges: DashboardDateRange[] = [
    "All",
    "Today",
    "Last 7 Days",
    "Last 14 Days",
  ];

  return {
    search: query.search?.trim().slice(0, 120),
    clinicId: query.clinicId?.slice(0, 80) || "All",
    priority:
      query.priority === "All" || isOneOf(query.priority, priorities)
        ? query.priority
        : "All",
    channel:
      query.channel === "All" ||
      isOneOf(query.channel, conversationChannels)
        ? query.channel
        : "All",
    dateRange: dateRanges.includes(query.dateRange ?? "All")
      ? query.dateRange
      : "All",
  };
}

export async function getDashboardAction(
  query: DashboardQuery,
): Promise<DashboardMetrics> {
  return getServices().dashboardService.getMetrics(sanitizeQuery(query));
}
