import type {
  ConversationListFilters,
  IConversationService,
} from "@/services/conversation/ConversationService";
import type {
  AIInsight,
  Conversation,
  ConversationChannel,
  DashboardDistributionDatum,
  DashboardMetrics,
  DashboardTrendDatum,
  Priority,
  Recommendation,
  Sentiment,
} from "@/types/domain";
import {
  conversationChannels,
  priorities,
  sentiments,
} from "@/types/domain";

export type DashboardDateRange = "All" | "Today" | "Last 7 Days" | "Last 14 Days";

export type DashboardFilters = {
  search?: string;
  clinicId?: string | "All";
  priority?: Priority | "All";
  channel?: ConversationChannel | "All";
  dateRange?: DashboardDateRange;
};

export interface IDashboardService {
  getMetrics(filters?: DashboardFilters): Promise<DashboardMetrics>;
}

const sentimentScoreMap: Record<Sentiment, number> = {
  Positive: 1,
  Neutral: 0.6,
  Concerned: 0.4,
  Negative: 0.2,
  "Strongly Negative": 0,
};

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function labelFromSentimentScore(score: number): Sentiment | "Mixed" {
  if (score >= 0.85) return "Positive";
  if (score >= 0.55) return "Neutral";
  if (score >= 0.35) return "Concerned";
  if (score >= 0.15) return "Negative";
  if (score > 0) return "Strongly Negative";
  return "Mixed";
}

function buildChannelBreakdown(
  conversations: Conversation[],
): Record<ConversationChannel, number> {
  const breakdown = Object.fromEntries(
    conversationChannels.map((channel) => [channel, 0]),
  ) as Record<ConversationChannel, number>;

  for (const conversation of conversations) {
    breakdown[conversation.channel] += 1;
  }
  return breakdown;
}

function buildPriorityDistribution(
  conversations: Conversation[],
): DashboardDistributionDatum[] {
  return priorities.map((priority) => ({
    name: priority,
    value: conversations.filter(
      (conversation) => conversation.businessImpact.priority === priority,
    ).length,
  }));
}

function buildChannelDistribution(
  conversations: Conversation[],
): DashboardDistributionDatum[] {
  const breakdown = buildChannelBreakdown(conversations);
  return conversationChannels.map((channel) => ({
    name: channel,
    value: breakdown[channel],
  }));
}

function buildSentimentDistribution(
  conversations: Conversation[],
): DashboardDistributionDatum[] {
  return sentiments.map((sentiment) => ({
    name: sentiment,
    value: conversations.filter(
      (conversation) => conversation.aiAnalysis.sentiment === sentiment,
    ).length,
  }));
}

function buildConversationTrend(
  conversations: Conversation[],
): DashboardTrendDatum[] {
  const grouped = new Map<string, { conversations: number; critical: number }>();

  for (const conversation of conversations) {
    const date = conversation.createdAt.slice(0, 10);
    const current = grouped.get(date) ?? { conversations: 0, critical: 0 };
    current.conversations += 1;
    if (conversation.businessImpact.priority === "Critical") {
      current.critical += 1;
    }
    grouped.set(date, current);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, values]) => ({
      date,
      label: new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date(`${date}T12:00:00+05:30`)),
      ...values,
    }));
}

function filterByDateRange(
  conversations: Conversation[],
  range: DashboardDateRange = "All",
): Conversation[] {
  if (range === "All" || conversations.length === 0) {
    return conversations;
  }

  const latestTime = Math.max(
    ...conversations.map((conversation) =>
      new Date(conversation.createdAt).getTime(),
    ),
  );
  const days = range === "Today" ? 1 : range === "Last 7 Days" ? 7 : 14;
  const cutoff = latestTime - days * 24 * 60 * 60 * 1000;

  return conversations.filter(
    (conversation) => new Date(conversation.createdAt).getTime() >= cutoff,
  );
}

function buildClinicOptions(conversations: Conversation[]) {
  const clinics = new Map<string, string>();
  for (const conversation of conversations) {
    clinics.set(
      conversation.clinic.id,
      `${conversation.clinic.name}, ${conversation.clinic.city}`,
    );
  }
  return Array.from(clinics.entries())
    .sort(([, a], [, b]) => a.localeCompare(b))
    .map(([id, label]) => ({ id, label }));
}

function buildInsights(conversations: Conversation[]): AIInsight[] {
  const insights: AIInsight[] = [];

  const implantCases = conversations.filter((conversation) =>
    conversation.text.toLowerCase().includes("implant"),
  );
  if (implantCases.length >= 2) {
    insights.push({
      id: "insight-implant",
      title: "Implant aftercare complaints are clustering",
      description:
        "Multiple implant-related conversations show delayed follow-up and rising clinical urgency.",
      category: "Clinical Risk",
      relatedConversationIds: implantCases.map((item) => item.id),
    });
  }

  const bandraNegatives = conversations.filter(
    (conversation) =>
      conversation.clinic.id === "clinic-bandra" &&
      (conversation.aiAnalysis.sentiment === "Negative" ||
        conversation.aiAnalysis.sentiment === "Strongly Negative"),
  );
  if (bandraNegatives.length >= 2) {
    insights.push({
      id: "insight-bandra",
      title: "Bandra clinic has elevated negative sentiment",
      description:
        "Apollo Dental Bandra accounts for a high share of negative and critical conversations this period.",
      category: "Clinic Performance",
      relatedConversationIds: bandraNegatives.map((item) => item.id),
    });
  }

  const refunds = conversations.filter(
    (conversation) => conversation.aiAnalysis.intent === "Refund Request",
  );
  if (refunds.length > 0) {
    insights.push({
      id: "insight-refunds",
      title: "Refund requests require finance attention",
      description:
        "Open refund conversations include cancelled treatment advances and undelivered aligner refinements.",
      category: "Revenue Ops",
      relatedConversationIds: refunds.map((item) => item.id),
    });
  }

  const billingDisputes = conversations.filter(
    (conversation) =>
      conversation.aiAnalysis.intent === "Billing Dispute" ||
      conversation.aiAnalysis.intent === "Billing Question",
  );
  if (billingDisputes.length >= 2) {
    insights.push({
      id: "insight-billing",
      title: "Billing disputes are creating avoidable friction",
      description:
        "Duplicate charges, package disputes, and incomplete insurance documents are recurring across clinics.",
      category: "Billing Operations",
      relatedConversationIds: billingDisputes.map((item) => item.id),
    });
  }

  const delayedFollowUps = conversations.filter(
    (conversation) =>
      conversation.aiAnalysis.intent === "Follow-up Issue" ||
      conversation.text.toLowerCase().includes("no callback"),
  );
  if (delayedFollowUps.length >= 2) {
    insights.push({
      id: "insight-follow-up",
      title: "Clinical follow-up delays need intervention",
      description:
        "Post-treatment concerns show missed callbacks and delayed clinical reassurance.",
      category: "Service Quality",
      relatedConversationIds: delayedFollowUps.map((item) => item.id),
    });
  }

  const publicRisk = conversations.filter(
    (conversation) =>
      conversation.channel === "Google Reviews" &&
      conversation.aiAnalysis.intent !== "Positive Feedback",
  );
  if (publicRisk.length > 0) {
    insights.push({
      id: "insight-reviews",
      title: "Public Google Reviews are driving reputation risk",
      description:
        "Negative or disputed Google Reviews need rapid public response and private resolution.",
      category: "Reputation",
      relatedConversationIds: publicRisk.map((item) => item.id),
    });
  }

  return insights;
}

function buildRecommendations(
  conversations: Conversation[],
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  const criticalImplants = conversations.filter(
    (conversation) =>
      conversation.businessImpact.priority === "Critical" &&
      conversation.text.toLowerCase().includes("implant"),
  );
  if (criticalImplants.length > 0) {
    recommendations.push({
      id: "rec-implant-escalation",
      title: "Escalate implant aftercare failures",
      rationale:
        "Critical implant conversations show missed callbacks and worsening pain. Assign senior clinical ownership today.",
      actionLabel: "Review cases",
      recommendedOwner: "CX Head",
      expectedOutcome:
        "Reduce clinical escalation risk and restore confidence in post-operative care.",
      relatedConversationIds: criticalImplants.map((item) => item.id),
      priority: "Critical",
    });
  }

  const emergencies = conversations.filter(
    (conversation) => conversation.aiAnalysis.intent === "Emergency Concern",
  );
  if (emergencies.length > 0) {
    recommendations.push({
      id: "rec-emergency-sla",
      title: "Tighten emergency response SLA",
      rationale:
        "Emergency and pediatric swelling cases require sub-hour acknowledgment and clear walk-in guidance.",
      actionLabel: "Open emergencies",
      recommendedOwner: "On-call Dentist",
      expectedOutcome:
        "Shorten time to clinical assessment and prevent avoidable safety escalation.",
      relatedConversationIds: emergencies.map((item) => item.id),
      priority: "Critical",
    });
  }

  const reviews = conversations.filter(
    (conversation) =>
      conversation.channel === "Google Reviews" &&
      conversation.businessImpact.priority !== "Low",
  );
  if (reviews.length > 0) {
    recommendations.push({
      id: "rec-public-response",
      title: "Respond to negative Google Reviews within 2 hours",
      rationale:
        "Public complaints are visible reputation risks and should receive empathetic public replies plus private follow-up.",
      actionLabel: "View reviews",
      recommendedOwner: "CX Team",
      expectedOutcome:
        "Limit reputation damage and move public disputes into private resolution.",
      relatedConversationIds: reviews.map((item) => item.id),
      priority: "High",
    });
  }

  const puneWait = conversations.filter(
    (conversation) =>
      conversation.clinic.id === "clinic-fc-road" &&
      conversation.text.toLowerCase().includes("waited"),
  );
  if (puneWait.length > 0) {
    recommendations.push({
      id: "rec-pune-scheduling",
      title: "Review appointment scheduling at Pune FC Road",
      rationale:
        "Repeated wait-time complaints indicate schedule reliability issues that need operational correction.",
      actionLabel: "Inspect clinic",
      recommendedOwner: "Regional Manager",
      expectedOutcome:
        "Improve appointment reliability and reduce repeat wait-time complaints.",
      relatedConversationIds: puneWait.map((item) => item.id),
      priority: "High",
    });
  }

  return recommendations;
}

export class DashboardService implements IDashboardService {
  constructor(private readonly conversationService: IConversationService) {}

  async getMetrics(
    filters: DashboardFilters = {},
  ): Promise<DashboardMetrics> {
    const allConversations = await this.conversationService.listConversations({
      includeSpam: false,
    });
    const conversationFilters: ConversationListFilters = {
      includeSpam: false,
      search: filters.search,
      clinicId: filters.clinicId,
      priority: filters.priority,
      channel: filters.channel,
      sort: "highest-impact",
    };
    const serviceFiltered =
      await this.conversationService.listConversations(conversationFilters);
    const conversations = filterByDateRange(
      serviceFiltered,
      filters.dateRange,
    );

    const criticalConversations = conversations.filter(
      (conversation) => conversation.businessImpact.priority === "Critical",
    );
    const highPriorityConversations = conversations.filter(
      (conversation) => conversation.businessImpact.priority === "High",
    );
    const pendingEscalations = conversations.filter(
      (conversation) =>
        conversation.status === "Escalated" ||
        conversation.businessImpact.priority === "Critical",
    );
    const resolvedToday = conversations.filter(
      (conversation) => conversation.status === "Resolved",
    );
    const attentionClinicIds = new Set(
      conversations
        .filter(
          (conversation) =>
            conversation.businessImpact.priority === "Critical" ||
            conversation.businessImpact.priority === "High" ||
            conversation.status === "Escalated",
        )
        .map((conversation) => conversation.clinic.id),
    );

    const sentimentScores = conversations.map(
      (conversation) =>
        sentimentScoreMap[conversation.aiAnalysis.sentiment] ?? 0.5,
    );
    const averageSentimentScore = Number(average(sentimentScores).toFixed(2));

    // Deterministic mock operational estimate for response time.
    const averageResponseTimeHours = Number(
      (
        average(
          conversations.map((conversation) => {
            switch (conversation.businessImpact.priority) {
              case "Critical":
                return 1.1;
              case "High":
                return 2.4;
              case "Medium":
                return 5.5;
              default:
                return 12;
            }
          }),
        )
      ).toFixed(1),
    );

    const averageAIConfidence = Number(
      average(
        conversations.map((conversation) => conversation.aiAnalysis.confidence),
      ).toFixed(1),
    );

    const priorityQueue = conversations
      .filter(
        (conversation) =>
          conversation.businessImpact.priority === "Critical" ||
          conversation.businessImpact.priority === "High",
      )
      .slice(0, 10);

    const recentConversations = [...conversations]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 8);

    return {
      totalConversations: conversations.length,
      criticalConversations: criticalConversations.length,
      highPriorityConversations: highPriorityConversations.length,
      clinicsRequiringAttention: attentionClinicIds.size,
      averageSentimentScore,
      averageSentimentPercent: Math.round(averageSentimentScore * 100),
      averageSentimentLabel: labelFromSentimentScore(averageSentimentScore),
      averageResponseTimeHours,
      averageAIConfidence,
      pendingEscalations: pendingEscalations.length,
      resolvedToday: resolvedToday.length,
      channelBreakdown: buildChannelBreakdown(conversations),
      priorityDistribution: buildPriorityDistribution(conversations),
      channelDistribution: buildChannelDistribution(conversations),
      sentimentDistribution: buildSentimentDistribution(conversations),
      conversationTrend: buildConversationTrend(conversations),
      clinicOptions: buildClinicOptions(allConversations),
      priorityQueue,
      recentConversations,
      aiInsights: buildInsights(conversations),
      recommendedActions: buildRecommendations(conversations),
    };
  }
}
