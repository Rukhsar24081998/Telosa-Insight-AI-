import {
  BusinessImpactEngine,
  type BusinessImpactInput,
} from "@/services/business/BusinessImpactEngine";
import {
  defaultScoringConfig,
  type BusinessImpactScoringConfig,
} from "@/services/business/scoring-config";
import type {
  BusinessImpact,
  BusinessImpactFactor,
  BusinessImpactIntelligence,
  BusinessImpactRecommendation,
  BusinessRiskLevel,
  BusinessRiskSignal,
  Conversation,
  Team,
} from "@/types/domain";

export interface IBusinessImpactService {
  calculateImpact(input: BusinessImpactInput): BusinessImpact;
  explainImpact(conversation: Conversation): BusinessImpactIntelligence;
}

export class BusinessImpactService implements IBusinessImpactService {
  private readonly engine: BusinessImpactEngine;
  private readonly config: BusinessImpactScoringConfig;

  constructor(config: BusinessImpactScoringConfig = defaultScoringConfig) {
    this.config = config;
    this.engine = new BusinessImpactEngine(config);
  }

  calculateImpact(input: BusinessImpactInput): BusinessImpact {
    return this.engine.calculate(input);
  }

  explainImpact(conversation: Conversation): BusinessImpactIntelligence {
    const { businessImpact: impact } = conversation;
    const factors = this.buildFactors(conversation);
    const weightedBaseScore = Number(
      factors
        .reduce((total, factor) => total + factor.contribution, 0)
        .toFixed(1),
    );
    const policyAdjustment = Number(
      Math.max(0, impact.score - weightedBaseScore).toFixed(1),
    );
    const priorityReasons = this.buildPriorityReasons(conversation);

    return {
      impact,
      factors,
      weightedBaseScore,
      policyAdjustment,
      policyExplanation:
        policyAdjustment > 0
          ? "A transparent policy floor was applied because clinical urgency, public reputation exposure, or high-value patient risk requires a minimum priority."
          : "No policy floor was required; the final score equals the weighted factor total.",
      executiveExplanation: this.buildExecutiveExplanation(
        conversation,
        priorityReasons,
      ),
      priorityReasons,
      recommendations: this.buildRecommendations(conversation),
      riskSignals: this.buildRiskSignals(conversation),
      aiProvider:
        conversation.aiAnalysis.source === "gemini"
          ? "Gemini"
          : conversation.aiAnalysis.source === "fallback"
            ? "Fallback"
            : "Mock",
      lastAnalysisTime:
        [...conversation.timeline]
          .reverse()
          .find((event) => event.type === "AI Analyzed")?.occurredAt ??
        conversation.createdAt,
    };
  }

  private buildFactors(conversation: Conversation): BusinessImpactFactor[] {
    const { signals } = conversation.businessImpact;
    const definitions: Array<{
      key: BusinessImpactFactor["key"];
      label: string;
      rawScore: number;
      weight: number;
      explanation: string;
    }> = [
      {
        key: "urgency",
        label: "Urgency",
        rawScore: signals.urgency,
        weight: this.config.weights.urgency,
        explanation: this.explainUrgency(conversation),
      },
      {
        key: "revenueImpact",
        label: "Revenue Impact",
        rawScore: signals.revenueImpact,
        weight: this.config.weights.revenueImpact,
        explanation: this.explainRevenue(conversation),
      },
      {
        key: "reputationRisk",
        label: "Reputation Risk",
        rawScore: signals.reputationRisk,
        weight: this.config.weights.reputationRisk,
        explanation: this.explainReputation(conversation),
      },
      {
        key: "escalationRisk",
        label: "Escalation Risk",
        rawScore: signals.escalationRisk,
        weight: this.config.weights.escalationRisk,
        explanation: this.explainEscalation(conversation),
      },
    ];

    return definitions.map((factor) => ({
      ...factor,
      weightPercent: Math.round(factor.weight * 100),
      contribution: Number((factor.rawScore * factor.weight).toFixed(1)),
      maxContribution: Math.round(factor.weight * 100),
    }));
  }

  private explainUrgency(conversation: Conversation): string {
    if (conversation.aiAnalysis.intent === "Emergency Concern") {
      return "Emergency clinical language and symptoms require immediate review.";
    }
    if (conversation.text.toLowerCase().includes("pain")) {
      return "Patient-reported pain raises the required response speed.";
    }
    if (conversation.aiAnalysis.intent === "Follow-up Issue") {
      return "Post-treatment follow-up risk requires timely clinical reassurance.";
    }
    return "Urgency reflects intent, sentiment, symptoms, and requested response time.";
  }

  private explainRevenue(conversation: Conversation): string {
    if (conversation.patient.isHighValue) {
      return "High-value patient relationship and treatment exposure increase commercial impact.";
    }
    if (
      ["Refund Request", "Billing Dispute"].includes(
        conversation.aiAnalysis.intent,
      )
    ) {
      return "Refund or disputed-charge exposure creates direct financial risk.";
    }
    if (
      ["implant", "aligner", "invisalign", "braces", "crown"].some((term) =>
        conversation.text.toLowerCase().includes(term),
      )
    ) {
      return "The conversation relates to a high-value dental treatment.";
    }
    return "Revenue impact reflects treatment value, retention, and payment exposure.";
  }

  private explainReputation(conversation: Conversation): string {
    if (
      conversation.channel === "Google Reviews" &&
      (conversation.aiAnalysis.sentiment === "Negative" ||
        conversation.aiAnalysis.sentiment === "Strongly Negative")
    ) {
      return "A public negative Google Review creates immediate brand exposure.";
    }
    if (conversation.channel === "Google Reviews") {
      return "Public channel visibility increases reputation sensitivity.";
    }
    if (
      conversation.aiAnalysis.sentiment === "Negative" ||
      conversation.aiAnalysis.sentiment === "Strongly Negative"
    ) {
      return "Negative sentiment may become public if the issue remains unresolved.";
    }
    return "Reputation risk reflects channel visibility and customer sentiment.";
  }

  private explainEscalation(conversation: Conversation): string {
    if (conversation.aiAnalysis.isDuplicate) {
      return "Repeated contact indicates the original issue remains unresolved.";
    }
    if (conversation.status === "Escalated") {
      return "The conversation is already escalated and requires executive oversight.";
    }
    if (
      ["Strongly Negative", "Negative"].includes(
        conversation.aiAnalysis.sentiment,
      )
    ) {
      return "Negative sentiment increases the likelihood of further escalation.";
    }
    return "Escalation risk considers repeated contact, status, and sentiment.";
  }

  private buildPriorityReasons(conversation: Conversation): string[] {
    const reasons: string[] = [];
    const text = conversation.text.toLowerCase();

    if (conversation.aiAnalysis.intent === "Emergency Concern") {
      reasons.push("Emergency clinical issue");
    }
    if (
      conversation.channel === "Google Reviews" &&
      (conversation.aiAnalysis.sentiment === "Negative" ||
        conversation.aiAnalysis.sentiment === "Strongly Negative")
    ) {
      reasons.push("Public negative Google Review");
    }
    if (text.includes("implant")) {
      reasons.push("High-value implant treatment");
    }
    if (conversation.patient.isHighValue) {
      reasons.push("High-value patient relationship");
    }
    if (
      conversation.status === "Escalated" ||
      text.includes("no callback") ||
      text.includes("waiting")
    ) {
      reasons.push("Response overdue or already escalated");
    }
    if (conversation.aiAnalysis.isDuplicate) {
      reasons.push("Repeated unresolved contact");
    }
    if (conversation.aiAnalysis.intent === "Refund Request") {
      reasons.push("Direct refund and revenue exposure");
    }
    if (
      conversation.businessImpact.signals.reputationRisk >= 70 &&
      !reasons.includes("Public negative Google Review")
    ) {
      reasons.push("Elevated reputation risk");
    }

    if (reasons.length === 0) {
      reasons.push(
        `Weighted business signals meet the ${conversation.businessImpact.priority.toLowerCase()} priority threshold`,
      );
    }

    return reasons;
  }

  private buildExecutiveExplanation(
    conversation: Conversation,
    reasons: string[],
  ): string {
    return `${conversation.patient.name}'s conversation is classified as ${conversation.businessImpact.priority.toLowerCase()} priority with a Business Impact Score of ${conversation.businessImpact.score}/100. The decision is driven by ${reasons
      .slice(0, 3)
      .join(", ")
      .toLowerCase()}.`;
  }

  private buildRecommendations(
    conversation: Conversation,
  ): BusinessImpactRecommendation[] {
    return conversation.businessImpact.recommendedActions.map(
      (action, index) => ({
        id: `${conversation.id}-action-${index + 1}`,
        action,
        owner: this.resolveActionOwner(action, conversation),
        targetSla: conversation.businessImpact.sla,
        expectedOutcome: this.resolveExpectedOutcome(action),
      }),
    );
  }

  private resolveActionOwner(action: string, conversation: Conversation): Team {
    const normalized = action.toLowerCase();
    if (normalized.includes("public response")) return "CX Team";
    if (normalized.includes("refund")) return "Finance";
    if (
      normalized.includes("clinical") ||
      normalized.includes("walk-in") ||
      normalized.includes("urgent review")
    ) {
      return "On-call Dentist";
    }
    if (
      normalized.includes("consultation") ||
      normalized.includes("convert lead")
    ) {
      return "Treatment Coordinator";
    }
    return conversation.businessImpact.assignedTeam;
  }

  private resolveExpectedOutcome(action: string): string {
    const normalized = action.toLowerCase();
    if (normalized.includes("public response")) {
      return "Reduce public reputation damage and move the issue into private resolution.";
    }
    if (normalized.includes("refund")) {
      return "Resolve financial exposure and reduce complaint escalation risk.";
    }
    if (
      normalized.includes("clinical") ||
      normalized.includes("walk-in") ||
      normalized.includes("urgent review")
    ) {
      return "Reduce clinical risk and restore patient confidence in aftercare.";
    }
    if (
      normalized.includes("consultation") ||
      normalized.includes("convert lead")
    ) {
      return "Protect treatment revenue by converting intent into a confirmed visit.";
    }
    if (normalized.includes("escalate")) {
      return "Create clear executive ownership and shorten time to resolution.";
    }
    return "Resolve the conversation within SLA and protect customer experience.";
  }

  private buildRiskSignals(conversation: Conversation): BusinessRiskSignal[] {
    const { signals } = conversation.businessImpact;
    return [
      {
        id: "clinical-risk",
        label: "Clinical Risk",
        score: signals.urgency,
        level: this.riskLevel(signals.urgency),
        description: this.explainUrgency(conversation),
      },
      {
        id: "revenue-risk",
        label: "Revenue Risk",
        score: signals.revenueImpact,
        level: this.riskLevel(signals.revenueImpact),
        description: this.explainRevenue(conversation),
      },
      {
        id: "reputation-risk",
        label: "Reputation Risk",
        score: signals.reputationRisk,
        level: this.riskLevel(signals.reputationRisk),
        description: this.explainReputation(conversation),
      },
      {
        id: "escalation-risk",
        label: "Escalation Risk",
        score: signals.escalationRisk,
        level: this.riskLevel(signals.escalationRisk),
        description: this.explainEscalation(conversation),
      },
    ];
  }

  private riskLevel(score: number): BusinessRiskLevel {
    if (score >= 80) return "Critical";
    if (score >= 60) return "High";
    if (score >= 35) return "Moderate";
    return "Low";
  }
}

export function createBusinessImpactService(
  config?: BusinessImpactScoringConfig,
): BusinessImpactService {
  return new BusinessImpactService(config);
}
