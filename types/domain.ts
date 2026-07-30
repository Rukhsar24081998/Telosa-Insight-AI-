/**
 * Core domain models for Telosa Insight.
 * Strongly typed — no `any`.
 */

export const conversationChannels = [
  "Google Reviews",
  "WhatsApp",
  "Email",
  "Website Chat",
] as const;

export type ConversationChannel = (typeof conversationChannels)[number];

export const conversationStatuses = [
  "New",
  "In Progress",
  "Awaiting Response",
  "Escalated",
  "Resolved",
  "Closed",
] as const;

export type ConversationStatus = (typeof conversationStatuses)[number];

export const priorities = ["Critical", "High", "Medium", "Low"] as const;

export type Priority = (typeof priorities)[number];

export const sentiments = [
  "Positive",
  "Neutral",
  "Concerned",
  "Negative",
  "Strongly Negative",
] as const;

export type Sentiment = (typeof sentiments)[number];

export const intents = [
  "Appointment Booking",
  "Appointment Reschedule",
  "Treatment Enquiry",
  "Billing Question",
  "Billing Dispute",
  "Refund Request",
  "Complaint",
  "Follow-up Issue",
  "Emergency Concern",
  "Positive Feedback",
  "Spam",
  "Other",
] as const;

export type Intent = (typeof intents)[number];

export const teams = [
  "Front Desk",
  "Clinic Manager",
  "Regional Manager",
  "CX Team",
  "CX Head",
  "Billing",
  "Finance",
  "Treatment Coordinator",
  "On-call Dentist",
] as const;

export type Team = (typeof teams)[number];

export const timelineEventTypes = [
  "Received",
  "AI Analyzed",
  "Impact Scored",
  "Assigned",
  "Escalated",
  "Replied",
  "Resolved",
  "Note",
] as const;

export type TimelineEventType = (typeof timelineEventTypes)[number];

export type Clinic = {
  id: string;
  name: string;
  city: string;
  region: string;
};

export type Patient = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  isHighValue?: boolean;
};

export type ExtractedEntity = {
  type: string;
  value: string;
};

export type AIAnalysis = {
  intent: Intent;
  sentiment: Sentiment;
  entities: ExtractedEntity[];
  summary: string;
  suggestedReply: string;
  confidence: number;
  isDuplicate: boolean;
  isSpam: boolean;
  duplicateOfId?: string;
  source: "mock" | "gemini" | "fallback";
};

export type BusinessSignalScores = {
  urgency: number;
  revenueImpact: number;
  reputationRisk: number;
  escalationRisk: number;
};

export type BusinessImpact = {
  score: number;
  priority: Priority;
  signals: BusinessSignalScores;
  assignedTeam: Team;
  sla: string;
  recommendedActions: string[];
  reasoning: string[];
};

export type BusinessImpactFactorKey =
  "urgency" | "revenueImpact" | "reputationRisk" | "escalationRisk";

export type BusinessImpactFactor = {
  key: BusinessImpactFactorKey;
  label: string;
  rawScore: number;
  weight: number;
  weightPercent: number;
  contribution: number;
  maxContribution: number;
  explanation: string;
};

export type BusinessImpactRecommendation = {
  id: string;
  action: string;
  owner: Team;
  targetSla: string;
  expectedOutcome: string;
};

export type BusinessRiskLevel = "Critical" | "High" | "Moderate" | "Low";

export type BusinessRiskSignal = {
  id: string;
  label: string;
  score: number;
  level: BusinessRiskLevel;
  description: string;
};

export type BusinessImpactIntelligence = {
  impact: BusinessImpact;
  factors: BusinessImpactFactor[];
  weightedBaseScore: number;
  policyAdjustment: number;
  policyExplanation: string;
  executiveExplanation: string;
  priorityReasons: string[];
  recommendations: BusinessImpactRecommendation[];
  riskSignals: BusinessRiskSignal[];
  aiProvider: "Gemini" | "Mock" | "Fallback";
  lastAnalysisTime: string;
};

export type ConversationTimelineEvent = {
  id: string;
  type: TimelineEventType;
  label: string;
  description?: string;
  occurredAt: string;
};

export type ConversationTimeline = {
  conversationId: string;
  events: ConversationTimelineEvent[];
};

export type Conversation = {
  id: string;
  patient: Patient;
  clinic: Clinic;
  channel: ConversationChannel;
  createdAt: string;
  text: string;
  status: ConversationStatus;
  assignedTeam: Team;
  conversationType: string;
  aiAnalysis: AIAnalysis;
  businessImpact: BusinessImpact;
  timeline: ConversationTimelineEvent[];
  tags?: string[];
};

export type Recommendation = {
  id: string;
  title: string;
  rationale: string;
  actionLabel: string;
  recommendedOwner: Team;
  expectedOutcome: string;
  relatedConversationIds: string[];
  priority: Priority;
};

export type AIInsight = {
  id: string;
  title: string;
  description: string;
  category: string;
  relatedConversationIds: string[];
};

export type DashboardDistributionDatum = {
  name: string;
  value: number;
};

export type DashboardTrendDatum = {
  date: string;
  label: string;
  conversations: number;
  critical: number;
};

export type DashboardClinicOption = {
  id: string;
  label: string;
};

export type DashboardMetrics = {
  totalConversations: number;
  criticalConversations: number;
  highPriorityConversations: number;
  clinicsRequiringAttention: number;
  averageSentimentScore: number;
  averageSentimentPercent: number;
  averageSentimentLabel: Sentiment | "Mixed";
  averageResponseTimeHours: number;
  averageAIConfidence: number;
  pendingEscalations: number;
  resolvedToday: number;
  channelBreakdown: Record<ConversationChannel, number>;
  priorityDistribution: DashboardDistributionDatum[];
  channelDistribution: DashboardDistributionDatum[];
  sentimentDistribution: DashboardDistributionDatum[];
  conversationTrend: DashboardTrendDatum[];
  clinicOptions: DashboardClinicOption[];
  priorityQueue: Conversation[];
  recentConversations: Conversation[];
  aiInsights: AIInsight[];
  recommendedActions: Recommendation[];
};

export type AnalyzeConversationInput = {
  text: string;
  channel?: ConversationChannel;
  clinicName?: string;
  conversationId?: string;
};

export type AnalyzeConversationResult = {
  intent: Intent;
  sentiment: Sentiment;
  entities: ExtractedEntity[];
  summary: string;
  suggestedReply: string;
  confidence: number;
  isDuplicate?: boolean;
  isSpam?: boolean;
  duplicateOfId?: string;
  source?: "mock" | "gemini" | "fallback";
};
