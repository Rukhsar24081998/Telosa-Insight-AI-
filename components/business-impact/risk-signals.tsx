import {
  AlertTriangle,
  BadgeIndianRupee,
  HeartPulse,
  Megaphone,
} from "lucide-react";

import { MetricCard, StatusBadge } from "@/components/shared";
import type { BusinessRiskSignal } from "@/types";

type RiskSignalsProps = {
  signals: BusinessRiskSignal[];
};

const icons = {
  "clinical-risk": HeartPulse,
  "revenue-risk": BadgeIndianRupee,
  "reputation-risk": Megaphone,
  "escalation-risk": AlertTriangle,
} as const;

export function RiskSignals({ signals }: RiskSignalsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {signals.map((signal) => (
        <MetricCard
          key={signal.id}
          title={signal.label}
          value={signal.score}
          suffix="/100"
          icon={icons[signal.id as keyof typeof icons] ?? AlertTriangle}
          description={signal.description}
          className="min-w-0"
        >
          <div className="space-y-3">
            <div
              className="bg-muted h-1.5 overflow-hidden rounded-full"
              role="progressbar"
              aria-label={`${signal.label} score`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={signal.score}
            >
              <div
                className={
                  signal.level === "Critical"
                    ? "bg-telosa-red h-full rounded-full"
                    : signal.level === "High"
                      ? "bg-telosa-orange h-full rounded-full"
                      : signal.level === "Moderate"
                        ? "bg-telosa-blue h-full rounded-full"
                        : "bg-telosa-green h-full rounded-full"
                }
                style={{ width: `${signal.score}%` }}
              />
            </div>
            <StatusBadge
              label={`${signal.level} risk`}
              tone={
                signal.level === "Critical"
                  ? "danger"
                  : signal.level === "High"
                    ? "warning"
                    : signal.level === "Moderate"
                      ? "info"
                      : "success"
              }
            />
          </div>
        </MetricCard>
      ))}
    </div>
  );
}
