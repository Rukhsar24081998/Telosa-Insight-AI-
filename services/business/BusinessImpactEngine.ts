import {
  defaultScoringConfig,
  type BusinessImpactScoringConfig,
} from "@/services/business/scoring-config";
import type {
  AIAnalysis,
  BusinessImpact,
  ConversationChannel,
  Intent,
  Patient,
  Priority,
  Team,
} from "@/types/domain";

export type BusinessImpactInput = {
  text: string;
  channel: ConversationChannel;
  aiAnalysis: AIAnalysis;
  patient?: Patient;
  status?: string;
};

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function textHas(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term.toLowerCase()));
}

function scoreUrgency(input: BusinessImpactInput): number {
  let score = 20;
  const { text, aiAnalysis } = input;

  if (aiAnalysis.intent === "Emergency Concern") score += 45;
  if (aiAnalysis.intent === "Follow-up Issue") score += 18;
  if (aiAnalysis.intent === "Complaint") score += 15;
  if (aiAnalysis.intent === "Refund Request") score += 12;

  if (textHas(text, ["severe", "swelling", "fever", "infection", "emergency"])) {
    score += 25;
  }
  if (textHas(text, ["pain", "worse", "worsening"])) score += 15;
  if (textHas(text, ["today", "immediately", "urgent", "escalate"])) score += 12;
  if (textHas(text, ["three days", "3 days", "no callback", "nobody has contacted"])) {
    score += 18;
  }
  if (aiAnalysis.sentiment === "Strongly Negative") score += 10;
  if (aiAnalysis.sentiment === "Negative") score += 6;
  if (aiAnalysis.isSpam) score = 5;

  return clamp(score);
}

function scoreRevenueImpact(input: BusinessImpactInput): number {
  let score = 15;
  const { text, aiAnalysis, patient } = input;

  if (
    textHas(text, [
      "implant",
      "invisalign",
      "aligner",
      "braces",
      "sedation",
      "crown",
      "bridge",
    ])
  ) {
    score += 30;
  }
  if (textHas(text, ["root canal", "whitening", "filling", "scaling"])) {
    score += 12;
  }
  if (textHas(text, ["refund", "₹", "rs"])) score += 20;
  if (textHas(text, ["12,500", "12500"])) score += 10;
  if (
    aiAnalysis.intent === "Treatment Enquiry" ||
    aiAnalysis.intent === "Appointment Booking"
  ) {
    score += 18;
  }
  if (patient?.isHighValue) score += 15;
  if (aiAnalysis.intent === "Positive Feedback") score = Math.max(score, 25);
  if (aiAnalysis.isSpam) score = 0;

  return clamp(score);
}

function scoreReputationRisk(input: BusinessImpactInput): number {
  let score = 10;
  const { text, channel, aiAnalysis } = input;

  if (channel === "Google Reviews") score += 35;
  if (
    aiAnalysis.intent === "Complaint" ||
    aiAnalysis.intent === "Billing Dispute"
  ) {
    score += 20;
  }
  if (
    textHas(text, [
      "will not recommend",
      "sharing this",
      "extremely disappointed",
      "terrible",
      "poor aftercare",
      "felt misled",
    ])
  ) {
    score += 25;
  }
  if (aiAnalysis.sentiment === "Strongly Negative") score += 15;
  if (aiAnalysis.sentiment === "Negative") score += 8;
  if (aiAnalysis.intent === "Positive Feedback") score = 5;
  if (aiAnalysis.isSpam) score = 0;

  return clamp(score);
}

function scoreEscalationRisk(input: BusinessImpactInput): number {
  let score = 15;
  const { text, aiAnalysis, status } = input;

  if (aiAnalysis.isDuplicate) score += 25;
  if (textHas(text, ["second time", "again", "called three times", "no callback"])) {
    score += 22;
  }
  if (textHas(text, ["escalate", "lawyer", "consumer court", "sharing this"])) {
    score += 20;
  }
  if (aiAnalysis.intent === "Emergency Concern") score += 20;
  if (aiAnalysis.intent === "Refund Request") score += 12;
  if (status === "Escalated") score += 15;
  if (aiAnalysis.sentiment === "Strongly Negative") score += 12;
  if (aiAnalysis.isSpam) score = 0;

  return clamp(score);
}

function resolvePriority(
  score: number,
  config: BusinessImpactScoringConfig,
): Priority {
  if (score >= config.thresholds.critical) return "Critical";
  if (score >= config.thresholds.high) return "High";
  if (score >= config.thresholds.medium) return "Medium";
  return "Low";
}

function resolveTeam(
  priority: Priority,
  intent: Intent,
  channel: ConversationChannel,
): Team {
  if (intent === "Spam") return "CX Team";
  if (intent === "Emergency Concern") {
    return priority === "Critical" ? "On-call Dentist" : "Clinic Manager";
  }
  if (intent === "Refund Request") return "Finance";
  if (intent === "Billing Question" || intent === "Billing Dispute") {
    return "Billing";
  }
  if (intent === "Treatment Enquiry") return "Treatment Coordinator";
  if (intent === "Appointment Booking" || intent === "Appointment Reschedule") {
    return "Front Desk";
  }
  if (channel === "Google Reviews" && priority === "Critical") return "CX Head";
  if (priority === "Critical") return "CX Head";
  if (priority === "High") return "Clinic Manager";
  if (intent === "Positive Feedback") return "CX Team";
  return "CX Team";
}

function buildActions(
  priority: Priority,
  intent: Intent,
  channel: ConversationChannel,
  signals: BusinessImpact["signals"],
): string[] {
  const actions: string[] = [];

  if (priority === "Critical") {
    actions.push("Escalate immediately to the assigned owner");
  }
  if (signals.urgency >= 70) {
    actions.push("Initiate same-day clinical or CX callback");
  }
  if (channel === "Google Reviews" && intent !== "Positive Feedback") {
    actions.push("Post an empathetic public response and open a private resolution thread");
  }
  if (intent === "Refund Request") {
    actions.push("Validate charge and process refund with written confirmation");
  }
  if (intent === "Emergency Concern") {
    actions.push("Confirm emergency walk-in or urgent review slot");
  }
  if (intent === "Appointment Booking" || intent === "Treatment Enquiry") {
    actions.push("Convert lead with a confirmed consultation slot");
  }
  if (intent === "Positive Feedback") {
    actions.push("Thank the patient publicly and tag as brand advocate");
  }
  if (intent === "Spam") {
    actions.push("Suppress from priority queue and mark as spam");
  }
  if (actions.length === 0) {
    actions.push("Review conversation and update the patient within SLA");
  }

  return actions;
}

function buildReasoning(
  signals: BusinessImpact["signals"],
  priority: Priority,
  input: BusinessImpactInput,
): string[] {
  return [
    `Urgency scored ${signals.urgency}/100 based on clinical urgency cues and intent (${input.aiAnalysis.intent}).`,
    `Revenue impact scored ${signals.revenueImpact}/100 based on treatment value, refund exposure, and patient value.`,
    `Reputation risk scored ${signals.reputationRisk}/100 with channel=${input.channel} and sentiment=${input.aiAnalysis.sentiment}.`,
    `Escalation risk scored ${signals.escalationRisk}/100 considering duplicates, repeated contact, and escalation language.`,
    `Final priority=${priority} from weighted aggregate score.`,
  ];
}

/**
 * Deterministic Business Impact Engine.
 * Does not call LLMs — scoring is transparent and configurable.
 */
export class BusinessImpactEngine {
  constructor(
    private readonly config: BusinessImpactScoringConfig = defaultScoringConfig,
  ) {}

  calculate(input: BusinessImpactInput): BusinessImpact {
    if (input.aiAnalysis.isSpam) {
      return {
        score: 5,
        priority: "Low",
        signals: {
          urgency: 5,
          revenueImpact: 0,
          reputationRisk: 0,
          escalationRisk: 0,
        },
        assignedTeam: "CX Team",
        sla: this.config.slaByPriority.Low,
        recommendedActions: ["Suppress from priority queue and mark as spam"],
        reasoning: [
          "Message classified as spam; business impact suppressed by policy.",
        ],
      };
    }

    const signals = {
      urgency: scoreUrgency(input),
      revenueImpact: scoreRevenueImpact(input),
      reputationRisk: scoreReputationRisk(input),
      escalationRisk: scoreEscalationRisk(input),
    };

    const weighted =
      signals.urgency * this.config.weights.urgency +
      signals.revenueImpact * this.config.weights.revenueImpact +
      signals.reputationRisk * this.config.weights.reputationRisk +
      signals.escalationRisk * this.config.weights.escalationRisk;

    let score = clamp(weighted);

    // Transparent policy floors — clinical and public-risk cases cannot be under-ranked.
    if (
      input.aiAnalysis.intent === "Emergency Concern" &&
      signals.urgency >= 70
    ) {
      score = Math.max(score, 88);
    }
    if (
      input.channel === "Google Reviews" &&
      (input.aiAnalysis.sentiment === "Negative" ||
        input.aiAnalysis.sentiment === "Strongly Negative") &&
      signals.reputationRisk >= 60
    ) {
      score = Math.max(score, 82);
    }
    if (
      input.patient?.isHighValue &&
      signals.urgency >= 65 &&
      (input.aiAnalysis.intent === "Emergency Concern" ||
        input.aiAnalysis.intent === "Complaint" ||
        input.aiAnalysis.intent === "Follow-up Issue")
    ) {
      score = Math.max(score, 80);
    }
    if (input.aiAnalysis.intent === "Refund Request" && signals.revenueImpact >= 50) {
      score = Math.max(score, 70);
    }

    const priority = resolvePriority(score, this.config);
    const assignedTeam = resolveTeam(
      priority,
      input.aiAnalysis.intent,
      input.channel,
    );

    return {
      score,
      priority,
      signals,
      assignedTeam,
      sla: this.config.slaByPriority[priority],
      recommendedActions: buildActions(
        priority,
        input.aiAnalysis.intent,
        input.channel,
        signals,
      ),
      reasoning: [
        ...buildReasoning(signals, priority, input),
        `Policy floors applied where clinical urgency, public reputation risk, or high-value patient exposure required a minimum score.`,
      ],
    };
  }
}
