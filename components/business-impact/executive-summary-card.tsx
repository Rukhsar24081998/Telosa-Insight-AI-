"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Clock3, Route, TimerReset } from "lucide-react";

import {
  AnimatedCounter,
  CardContent,
  CardWrapper,
  PriorityBadge,
  StatusBadge,
} from "@/components/shared";
import { formatConversationDate } from "@/lib/formatters";
import type { BusinessImpactIntelligence } from "@/types";

type ExecutiveSummaryCardProps = {
  intelligence: BusinessImpactIntelligence;
};

export function ExecutiveSummaryCard({
  intelligence,
}: ExecutiveSummaryCardProps) {
  const reduceMotion = useReducedMotion();
  const { impact } = intelligence;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardWrapper className="from-telosa-blue-muted/65 via-card to-telosa-purple-muted/35 border-telosa-blue/20 overflow-hidden bg-gradient-to-br">
        <CardContent className="grid gap-8 pt-6 lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,1.25fr)] lg:items-center">
          <div className="border-border/80 flex flex-col items-center justify-center border-b pb-6 text-center lg:border-r lg:border-b-0 lg:pr-6 lg:pb-0">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Business Impact Score
            </p>
            <div className="bg-background/55 border-border/70 relative mt-3 flex size-40 items-center justify-center rounded-full border shadow-[var(--shadow-card)]">
              <div
                className="absolute inset-2 rounded-full"
                style={{
                  background: `conic-gradient(var(--telosa-blue) ${impact.score}%, var(--muted) 0)`,
                }}
                aria-hidden
              />
              <div className="bg-card relative flex size-[8.25rem] flex-col items-center justify-center rounded-full shadow-sm">
                <div className="text-6xl font-semibold tracking-[-0.06em] tabular-nums">
                  <AnimatedCounter value={impact.score} duration={0.9} />
                </div>
                <p className="text-muted-foreground text-xs">out of 100</p>
              </div>
            </div>
            <div className="mt-4">
              <PriorityBadge
                priority={impact.priority}
                className="px-3 py-1 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SummaryFact
              icon={Route}
              label="Assigned Team"
              value={impact.assignedTeam}
            />
            <SummaryFact
              icon={Clock3}
              label="Response SLA"
              value={impact.sla}
            />
            <div className="border-border/70 bg-background/40 rounded-xl border p-4 shadow-sm">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                <Bot className="size-4" aria-hidden />
                AI Provider
              </div>
              <StatusBadge
                label={intelligence.aiProvider}
                tone={
                  intelligence.aiProvider === "Gemini"
                    ? "ai"
                    : intelligence.aiProvider === "Fallback"
                      ? "warning"
                      : "neutral"
                }
              />
            </div>
            <SummaryFact
              icon={TimerReset}
              label="Last Analysis"
              value={formatConversationDate(intelligence.lastAnalysisTime)}
            />
          </div>
        </CardContent>
      </CardWrapper>
    </motion.div>
  );
}

function SummaryFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Route;
  label: string;
  value: string;
}) {
  return (
    <div className="border-border/70 bg-background/40 rounded-xl border p-4 shadow-sm">
      <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
        <Icon className="size-4" aria-hidden />
        {label}
      </div>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
