"use client";

import {
  ArrowUpRight,
  Bell,
  BrainCircuit,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  MessagesSquare,
  Search,
  Siren,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import {
  getDashboardAction,
  type DashboardQuery,
} from "@/app/dashboard-actions";
import {
  BusinessMetricsCharts,
  ChannelDistributionCard,
} from "@/components/dashboard/business-metrics-charts";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardWrapper,
  ConversationCard,
  EmptyState,
  KPICard,
  LoadingSkeleton,
  PageContainer,
  PageSection,
  RecommendationCard,
  SearchInput,
} from "@/components/shared";
import { formatConversationDate } from "@/lib/formatters";
import type { DashboardMetrics } from "@/types";
import { conversationChannels, priorities } from "@/types";

type DashboardClientProps = {
  initialMetrics: DashboardMetrics;
};

export function DashboardClient({ initialMetrics }: DashboardClientProps) {
  const router = useRouter();
  const [metrics, setMetrics] = React.useState(initialMetrics);
  const [query, setQuery] = React.useState<DashboardQuery>({
    search: "",
    clinicId: "All",
    priority: "All",
    channel: "All",
    dateRange: "All",
  });
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);
  const firstRender = React.useRef(true);
  const requestId = React.useRef(0);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const currentRequest = ++requestId.current;
    const timer = window.setTimeout(
      () => {
        startTransition(async () => {
          try {
            const nextMetrics = await getDashboardAction(query);
            if (requestId.current === currentRequest) {
              setMetrics(nextMetrics);
              setError(null);
            }
          } catch {
            if (requestId.current === currentRequest) {
              setError(
                "Dashboard intelligence could not be refreshed. Please retry.",
              );
            }
          }
        });
      },
      query.search ? 250 : 0,
    );

    return () => window.clearTimeout(timer);
  }, [query]);

  const updateQuery = <Key extends keyof DashboardQuery>(
    key: Key,
    value: DashboardQuery[Key],
  ) => {
    setQuery((current) => ({ ...current, [key]: value }));
  };

  const retry = () => setQuery((current) => ({ ...current }));
  const latestTrend = metrics.conversationTrend.at(-1);
  const previousTrend = metrics.conversationTrend.at(-2);
  const conversationDelta =
    (latestTrend?.conversations ?? 0) - (previousTrend?.conversations ?? 0);
  const criticalDelta =
    (latestTrend?.critical ?? 0) - (previousTrend?.critical ?? 0);
  const immediateAttention =
    metrics.criticalConversations + metrics.highPriorityConversations;
  const impactSource =
    metrics.recentConversations.length > 0
      ? metrics.recentConversations
      : metrics.priorityQueue;
  const averageBusinessImpact =
    impactSource.length > 0
      ? Math.round(
          impactSource.reduce(
            (total, conversation) => total + conversation.businessImpact.score,
            0,
          ) / impactSource.length,
        )
      : 0;
  const conversationTrendPercent =
    previousTrend && previousTrend.conversations > 0
      ? Math.round((conversationDelta / previousTrend.conversations) * 1000) /
        10
      : 0;
  const criticalTrendPercent =
    previousTrend && previousTrend.critical > 0
      ? Math.round((criticalDelta / previousTrend.critical) * 1000) / 10
      : 0;
  const slaCompliance =
    metrics.totalConversations > 0
      ? Math.round(
          ((metrics.totalConversations - metrics.pendingEscalations) /
            metrics.totalConversations) *
            100,
        )
      : 100;
  const executiveSummary = [
    {
      icon: Siren,
      label: `${immediateAttention} ${
        immediateAttention === 1
          ? "conversation requires"
          : "conversations require"
      } priority attention`,
      tone: "danger",
    },
    {
      icon: BrainCircuit,
      label:
        metrics.aiInsights[0]?.description ??
        "No emerging AI pattern requires executive review.",
      tone: "ai",
    },
    {
      icon: Building2,
      label: `${metrics.clinicsRequiringAttention} ${
        metrics.clinicsRequiringAttention === 1
          ? "clinic requires"
          : "clinics require"
      } operational attention`,
      tone: "warning",
    },
    {
      icon: CheckCircle2,
      label:
        metrics.pendingEscalations > 0
          ? `${metrics.pendingEscalations} open ${
              metrics.pendingEscalations === 1
                ? "escalation remains"
                : "escalations remain"
            } in the active queue`
          : "Everything is under control. No escalations are pending.",
      tone: metrics.pendingEscalations > 0 ? "danger" : "success",
    },
  ] as const;

  return (
    <PageContainer className="max-w-none gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] sm:text-[1.65rem]">
            Good Evening, Rukhsar <span aria-hidden>👋</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Here&apos;s what&apos;s happening across your customer conversations
            today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative">
            <span className="sr-only">Dashboard date range</span>
            <CalendarDays
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2"
              aria-hidden
            />
            <select
              value={query.dateRange}
              onChange={(event) =>
                updateQuery(
                  "dateRange",
                  event.target.value as DashboardQuery["dateRange"],
                )
              }
              className="border-border bg-card hover:bg-secondary focus-visible:ring-telosa-blue/40 h-9 appearance-none rounded-lg border pr-8 pl-8 text-xs font-medium transition-colors outline-none focus-visible:ring-2"
            >
              <option value="All">All dates</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 14 Days">Last 14 Days</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => window.print()}
            className="border-border bg-card hover:bg-secondary focus-visible:ring-telosa-blue/40 inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition-colors focus-visible:ring-2"
          >
            Export Report
            <Download className="size-3.5" aria-hidden />
          </button>
          <div
            className="border-border bg-card relative flex size-9 items-center justify-center rounded-lg border"
            aria-label={`${metrics.pendingEscalations} pending notifications`}
          >
            <Bell className="text-muted-foreground size-4" aria-hidden />
            {metrics.pendingEscalations > 0 ? (
              <span className="bg-telosa-red text-telosa-red-foreground absolute -top-1 -right-1 flex min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold">
                {metrics.pendingEscalations}
              </span>
            ) : null}
          </div>
        </div>
      </header>

      {isPending ? (
        <LoadingSkeleton variant="kpi" count={4} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KPICard
            label="Total Conversations"
            value={metrics.totalConversations}
            icon={MessagesSquare}
            caption="vs last period"
            trend={{
              direction:
                conversationDelta > 0
                  ? "up"
                  : conversationDelta < 0
                    ? "down"
                    : "flat",
              label: `${Math.abs(conversationTrendPercent)}%`,
              tone: conversationDelta >= 0 ? "positive" : "negative",
            }}
          />
          <KPICard
            label="Critical Conversations"
            value={metrics.criticalConversations}
            icon={Siren}
            caption="vs last period"
            trend={{
              direction:
                criticalDelta > 0 ? "up" : criticalDelta < 0 ? "down" : "flat",
              label: `${Math.abs(criticalTrendPercent)}%`,
              tone: criticalDelta > 0 ? "negative" : "positive",
            }}
          />
          <KPICard
            label="Avg. Business Impact"
            value={averageBusinessImpact}
            icon={BrainCircuit}
            caption="current priority mix"
            trend={{
              direction: "up",
              label: `${metrics.averageAIConfidence}%`,
              tone: "positive",
            }}
          />
          <KPICard
            label="SLA Compliance"
            value={slaCompliance}
            suffix="%"
            icon={CheckCircle2}
            caption="active scope"
            trend={{
              direction: metrics.resolvedToday > 0 ? "down" : "flat",
              label: `${metrics.resolvedToday} resolved`,
              tone: metrics.resolvedToday > 0 ? "positive" : "neutral",
            }}
          />
        </div>
      )}

      <section
        className="border-border bg-card rounded-xl border px-4 py-3.5 shadow-[var(--shadow-card)]"
        aria-labelledby="executive-summary-title"
      >
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="text-telosa-purple size-4" aria-hidden />
          <h2
            id="executive-summary-title"
            className="text-sm font-semibold tracking-tight"
          >
            Executive Summary
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {executiveSummary.map(({ icon: Icon, label, tone }, index) => (
            <div
              key={label}
              className="xl:border-border flex items-center gap-3 xl:border-l xl:px-4 xl:first:border-l-0 xl:first:pl-0"
            >
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                  tone === "danger"
                    ? "bg-telosa-red-muted text-telosa-red"
                    : tone === "warning"
                      ? "bg-telosa-orange-muted text-telosa-orange"
                      : tone === "success"
                        ? "bg-telosa-green-muted text-telosa-green"
                        : "bg-telosa-purple-muted text-telosa-purple"
                }`}
              >
                <Icon className="size-4" aria-hidden />
              </div>
              <p className="text-foreground/90 line-clamp-2 text-xs leading-5">
                {label}
              </p>
              <span className="sr-only">Insight {index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid items-start gap-3 xl:grid-cols-[minmax(0,1.18fr)_minmax(20rem,0.82fr)]">
        <CardWrapper className="min-w-0 gap-0 overflow-hidden py-0">
          <CardHeader className="border-border flex-row items-center justify-between border-b px-4 py-3">
            <CardTitle className="text-sm font-semibold">
              Top Priority Conversations
            </CardTitle>
            <button
              type="button"
              onClick={() => router.push("/conversation")}
              className="text-telosa-blue hover:bg-telosa-blue-muted focus-visible:ring-telosa-blue/30 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors focus-visible:ring-2"
            >
              View all
              <ArrowUpRight className="size-3" aria-hidden />
            </button>
          </CardHeader>
          <CardContent className="p-3">
            <div className="mb-3 grid gap-2 sm:grid-cols-[minmax(12rem,1fr)_auto_auto_auto]">
              <SearchInput
                value={query.search}
                onValueChange={(value) => updateQuery("search", value)}
                placeholder="Search conversations..."
                aria-label="Search priority conversations"
              />
              <label>
                <span className="sr-only">Filter by channel</span>
                <select
                  value={query.channel}
                  onChange={(event) =>
                    updateQuery(
                      "channel",
                      event.target.value as DashboardQuery["channel"],
                    )
                  }
                  className="border-border bg-background/45 hover:bg-secondary focus-visible:ring-telosa-blue/40 h-9 w-full rounded-lg border px-2.5 text-[11px] transition-colors outline-none focus-visible:ring-2"
                >
                  <option value="All">All Channels</option>
                  {conversationChannels.map((channel) => (
                    <option key={channel} value={channel}>
                      {channel}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="sr-only">Filter by clinic</span>
                <select
                  value={query.clinicId}
                  onChange={(event) =>
                    updateQuery("clinicId", event.target.value)
                  }
                  className="border-border bg-background/45 hover:bg-secondary focus-visible:ring-telosa-blue/40 h-9 w-full rounded-lg border px-2.5 text-[11px] transition-colors outline-none focus-visible:ring-2"
                >
                  <option value="All">All Clinics</option>
                  {metrics.clinicOptions.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="sr-only">Filter by priority</span>
                <select
                  value={query.priority}
                  onChange={(event) =>
                    updateQuery(
                      "priority",
                      event.target.value as DashboardQuery["priority"],
                    )
                  }
                  className="border-border bg-background/45 hover:bg-secondary focus-visible:ring-telosa-blue/40 h-9 w-full rounded-lg border px-2.5 text-[11px] transition-colors outline-none focus-visible:ring-2"
                >
                  <option value="All">All Priorities</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="min-h-4" aria-live="polite">
              {error ? (
                <div className="mb-2 flex items-center gap-2 text-xs">
                  <span className="text-telosa-red">{error}</span>
                  <button
                    type="button"
                    onClick={retry}
                    className="text-telosa-blue font-semibold hover:underline"
                  >
                    Retry
                  </button>
                </div>
              ) : isPending ? (
                <p className="text-muted-foreground mb-2 text-xs">
                  Refreshing intelligence…
                </p>
              ) : null}
            </div>

            {metrics.priorityQueue.length > 0 ? (
              <div className="space-y-2">
                {metrics.priorityQueue
                  .slice(0, 4)
                  .map((conversation, index) => (
                    <ConversationCard
                      key={conversation.id}
                      customerName={conversation.clinic.name}
                      clinic={`${conversation.patient.name} · ${conversation.clinic.city}`}
                      channel={conversation.channel}
                      timestamp={formatConversationDate(conversation.createdAt)}
                      priority={conversation.businessImpact.priority}
                      preview={conversation.aiAnalysis.summary}
                      impactScore={conversation.businessImpact.score}
                      selected={index === 0}
                      showAI
                      onClick={() =>
                        router.push(`/conversation/${conversation.id}`)
                      }
                    />
                  ))}
              </div>
            ) : (
              <EmptyState
                title="Everything is under control"
                description="No critical or high-priority conversations match this view."
              />
            )}
          </CardContent>
        </CardWrapper>

        <div className="grid gap-3">
          <ChannelDistributionCard
            data={metrics.channelDistribution}
            total={metrics.totalConversations}
          />

          <CardWrapper className="gap-0 overflow-hidden py-0">
            <CardHeader className="border-border flex-row items-center justify-between border-b px-4 py-3">
              <CardTitle className="text-sm font-semibold">
                AI Insights
              </CardTitle>
              <span className="text-telosa-blue text-[11px] font-semibold">
                Live analysis
              </span>
            </CardHeader>
            <CardContent className="divide-border divide-y p-0">
              {metrics.aiInsights.length > 0 ? (
                metrics.aiInsights.slice(0, 3).map((insight, index) => {
                  const InsightIcon =
                    index === 0
                      ? Siren
                      : index === 1
                        ? BrainCircuit
                        : CheckCircle2;
                  return (
                    <div
                      key={insight.id}
                      className="group/ai hover:bg-secondary/50 flex items-center gap-3 px-4 py-2 transition-colors"
                    >
                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                          index === 0
                            ? "bg-telosa-red-muted text-telosa-red"
                            : index === 1
                              ? "bg-telosa-orange-muted text-telosa-orange"
                              : "bg-telosa-green-muted text-telosa-green"
                        }`}
                      >
                        <InsightIcon className="size-4" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">
                          {insight.title}
                        </p>
                        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px]">
                          {insight.description}
                        </p>
                      </div>
                      <ChevronRight
                        className="text-muted-foreground size-4 shrink-0 transition-transform group-hover/ai:translate-x-0.5"
                        aria-hidden
                      />
                    </div>
                  );
                })
              ) : (
                <div className="p-4">
                  <EmptyState
                    icon={<Search className="size-5" aria-hidden />}
                    title="No insight patterns found"
                    description="Broaden the filters to analyze more conversations."
                  />
                </div>
              )}
            </CardContent>
          </CardWrapper>
        </div>
      </div>

      <PageSection
        title="Detailed Analytics"
        description="Service-aggregated distributions and conversation trends."
        className="mt-2"
      >
        <BusinessMetricsCharts
          priorityDistribution={metrics.priorityDistribution}
          channelDistribution={metrics.channelDistribution}
          conversationTrend={metrics.conversationTrend}
          sentimentDistribution={metrics.sentimentDistribution}
        />
      </PageSection>

      <PageSection
        title="Recommended Actions"
        description="AI-informed actions with clear ownership and expected outcomes."
      >
        {metrics.recommendedActions.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {metrics.recommendedActions.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                title={recommendation.title}
                rationale={recommendation.rationale}
                priority={recommendation.priority}
                recommendedOwner={recommendation.recommendedOwner}
                expectedOutcome={recommendation.expectedOutcome}
                actionLabel={recommendation.actionLabel}
                onAction={
                  recommendation.relatedConversationIds[0]
                    ? () =>
                        router.push(
                          `/conversation/${recommendation.relatedConversationIds[0]}`,
                        )
                    : undefined
                }
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No executive actions right now"
            description="The selected scope has no outstanding recommendations."
          />
        )}
      </PageSection>
    </PageContainer>
  );
}
