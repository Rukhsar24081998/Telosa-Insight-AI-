import type { Priority } from "@/types/domain";

export type ScoringWeights = {
  urgency: number;
  revenueImpact: number;
  reputationRisk: number;
  escalationRisk: number;
};

export type PriorityThresholds = {
  critical: number;
  high: number;
  medium: number;
};

export type BusinessImpactScoringConfig = {
  weights: ScoringWeights;
  thresholds: PriorityThresholds;
  slaByPriority: Record<Priority, string>;
};

/**
 * Transparent, configurable scoring weights and thresholds.
 * All values are percentages / points on a 0–100 scale unless noted.
 */
export const defaultScoringConfig: BusinessImpactScoringConfig = {
  weights: {
    urgency: 0.3,
    revenueImpact: 0.25,
    reputationRisk: 0.25,
    escalationRisk: 0.2,
  },
  thresholds: {
    critical: 80,
    high: 65,
    medium: 40,
  },
  slaByPriority: {
    Critical: "1 hour",
    High: "3 hours",
    Medium: "8 hours",
    Low: "24 hours",
  },
};
