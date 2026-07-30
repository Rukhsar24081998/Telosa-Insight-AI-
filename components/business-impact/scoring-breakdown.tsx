"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  BadgeIndianRupee,
  HeartPulse,
  Megaphone,
} from "lucide-react";

import {
  CardContent,
  CardHeader,
  CardTitle,
  CardWrapper,
} from "@/components/shared";
import type { BusinessImpactFactor } from "@/types";

type ScoringBreakdownProps = {
  factors: BusinessImpactFactor[];
  weightedBaseScore: number;
  policyAdjustment: number;
  policyExplanation: string;
  finalScore: number;
};

const factorIcons = {
  urgency: HeartPulse,
  revenueImpact: BadgeIndianRupee,
  reputationRisk: Megaphone,
  escalationRisk: AlertTriangle,
} as const;

export function ScoringBreakdown({
  factors,
  weightedBaseScore,
  policyAdjustment,
  policyExplanation,
  finalScore,
}: ScoringBreakdownProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {factors.map((factor, index) => (
          <motion.div
            key={factor.key}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
          >
            <CardWrapper className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-telosa-blue-muted text-telosa-blue flex size-9 shrink-0 items-center justify-center rounded-xl">
                      {(() => {
                        const Icon = factorIcons[factor.key];
                        return <Icon className="size-4" aria-hidden />;
                      })()}
                    </div>
                    <div>
                      <CardTitle className="text-sm">{factor.label}</CardTitle>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Weight {factor.weightPercent}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold tabular-nums">
                      {factor.contribution}
                      <span className="text-muted-foreground text-sm font-normal">
                        {" "}
                        / {factor.maxContribution}
                      </span>
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      weighted contribution
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Raw score</span>
                    <span className="font-medium tabular-nums">
                      {factor.rawScore} / 100
                    </span>
                  </div>
                  <div
                    className="bg-muted h-2 overflow-hidden rounded-full"
                    role="progressbar"
                    aria-label={`${factor.label} raw score`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={factor.rawScore}
                  >
                    <motion.div
                      className="from-telosa-blue to-telosa-purple h-full rounded-full bg-gradient-to-r"
                      initial={reduceMotion ? false : { width: 0 }}
                      animate={{ width: `${factor.rawScore}%` }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {factor.explanation}
                </p>
              </CardContent>
            </CardWrapper>
          </motion.div>
        ))}
      </div>

      <CardWrapper className="border-telosa-blue/20 bg-telosa-blue-muted/20">
        <CardContent className="grid gap-4 pt-5 sm:grid-cols-3">
          <ScoreSummary label="Weighted base" value={weightedBaseScore} />
          <ScoreSummary
            label="Policy adjustment"
            value={policyAdjustment}
            prefix="+"
          />
          <ScoreSummary label="Final score" value={finalScore} />
          <p className="text-muted-foreground text-xs leading-relaxed sm:col-span-3">
            {policyExplanation}
          </p>
        </CardContent>
      </CardWrapper>
    </div>
  );
}

function ScoreSummary({
  label,
  value,
  prefix = "",
}: {
  label: string;
  value: number;
  prefix?: string;
}) {
  return (
    <div>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-xl font-semibold tabular-nums">
        {prefix}
        {value}
      </p>
    </div>
  );
}
