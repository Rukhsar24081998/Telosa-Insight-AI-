"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock3, Route, ShieldCheck } from "lucide-react";

import {
  AnimatedCounter,
  CardContent,
  CardHeader,
  CardTitle,
  CardWrapper,
  PriorityBadge,
  SectionHeader,
} from "@/components/shared";
import type { BusinessImpact } from "@/types";

type BusinessPreviewPanelProps = {
  impact: BusinessImpact;
};

export function BusinessPreviewPanel({
  impact,
}: BusinessPreviewPanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={`${impact.score}-${impact.priority}`}
      initial={reduceMotion ? false : { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 p-4 sm:p-6 xl:p-5"
    >
      <SectionHeader
        title="Business Preview"
        description="Deterministic impact assessment"
      />

      <CardWrapper className="border-telosa-blue/20 bg-telosa-blue-muted/20">
        <CardContent className="pt-5 text-center">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Business Impact Score
          </p>
          <div className="mt-2 text-5xl font-semibold tracking-tight tabular-nums">
            <AnimatedCounter value={impact.score} />
          </div>
          <div className="mt-3 flex justify-center">
            <PriorityBadge priority={impact.priority} />
          </div>
        </CardContent>
      </CardWrapper>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <PreviewFact
          icon={Route}
          label="Assigned team"
          value={impact.assignedTeam}
        />
        <PreviewFact icon={Clock3} label="Response SLA" value={impact.sla} />
      </div>

      <CardWrapper>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Business signals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Signal label="Urgency" value={impact.signals.urgency} />
          <Signal
            label="Revenue impact"
            value={impact.signals.revenueImpact}
          />
          <Signal
            label="Reputation risk"
            value={impact.signals.reputationRisk}
          />
          <Signal
            label="Escalation risk"
            value={impact.signals.escalationRisk}
          />
        </CardContent>
      </CardWrapper>

      <CardWrapper>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-telosa-green size-4" aria-hidden />
            <CardTitle className="text-sm">Recommended actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {impact.recommendedActions.map((action) => (
              <li
                key={action}
                className="text-foreground/90 flex gap-2 text-xs leading-relaxed"
              >
                <span
                  className="bg-telosa-green mt-1.5 size-1.5 shrink-0 rounded-full"
                  aria-hidden
                />
                {action}
              </li>
            ))}
          </ul>
        </CardContent>
      </CardWrapper>

      <CardWrapper>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-telosa-blue size-4" aria-hidden />
            <CardTitle className="text-sm">Reasoning</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {impact.reasoning.map((reason, index) => (
              <li
                key={`${reason}-${index}`}
                className="text-muted-foreground text-xs leading-relaxed"
              >
                <span className="text-foreground mr-1 font-medium">
                  {index + 1}.
                </span>
                {reason}
              </li>
            ))}
          </ol>
        </CardContent>
      </CardWrapper>
    </motion.div>
  );
}

function PreviewFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Route;
  label: string;
  value: string;
}) {
  return (
    <div className="border-border/80 bg-card shadow-[var(--shadow-card)] flex items-start gap-3 rounded-xl border p-3">
      <div className="bg-telosa-blue-muted text-telosa-blue flex size-8 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-muted-foreground text-[11px]">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function Signal({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{value}</span>
      </div>
      <div
        className="bg-muted h-1.5 overflow-hidden rounded-full"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div
          className="bg-telosa-blue h-full rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
