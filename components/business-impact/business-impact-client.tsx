import { ArrowLeft, CheckCircle2, Clock3 } from "lucide-react";
import Link from "next/link";

import { AppLayout } from "@/components/layout";
import { ExecutiveSummaryCard } from "@/components/business-impact/executive-summary-card";
import { RiskSignals } from "@/components/business-impact/risk-signals";
import { ScoringBreakdown } from "@/components/business-impact/scoring-breakdown";
import {
  CardContent,
  CardWrapper,
  InsightCard,
  PageContainer,
  PageHeader,
  PageSection,
  RecommendationCard,
} from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { formatTimelineDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { BusinessImpactIntelligence, Conversation } from "@/types";

type BusinessImpactClientProps = {
  conversation: Conversation;
  intelligence: BusinessImpactIntelligence;
};

export function BusinessImpactClient({
  conversation,
  intelligence,
}: BusinessImpactClientProps) {
  return (
    <AppLayout
      title="Business Impact Intelligence"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        {
          label: "Conversation",
          href: `/conversation/${conversation.id}`,
        },
        { label: "Business Impact" },
      ]}
    >
      <PageContainer>
        <PageHeader
          title={`Business Impact — ${conversation.patient.name}`}
          description="Understand why this conversation was prioritized and what executive action should happen next."
        />

        <PageSection title="Executive Summary">
          <ExecutiveSummaryCard intelligence={intelligence} />
        </PageSection>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
          <PageSection
            title="Explainability"
            description="Transparent weighted contribution to the final score."
          >
            <ScoringBreakdown
              factors={intelligence.factors}
              weightedBaseScore={intelligence.weightedBaseScore}
              policyAdjustment={intelligence.policyAdjustment}
              policyExplanation={intelligence.policyExplanation}
              finalScore={intelligence.impact.score}
            />
          </PageSection>

          <PageSection title="Why this Priority?">
            <InsightCard
              title={`${intelligence.impact.priority} priority rationale`}
              description={intelligence.executiveExplanation}
              category="Executive rationale"
            >
              <ul className="space-y-2">
                {intelligence.priorityReasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                  >
                    <CheckCircle2
                      className="text-telosa-green mt-0.5 size-4 shrink-0"
                      aria-hidden
                    />
                    {reason}
                  </li>
                ))}
              </ul>
            </InsightCard>
          </PageSection>
        </div>

        <PageSection
          title="Recommended Actions"
          description="Clear ownership, timing, and expected business outcomes."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {intelligence.recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                title={recommendation.action}
                rationale={`Complete this action within the ${recommendation.targetSla} response target.`}
                priority={intelligence.impact.priority}
                recommendedOwner={recommendation.owner}
                targetSla={recommendation.targetSla}
                expectedOutcome={recommendation.expectedOutcome}
              />
            ))}
          </div>
        </PageSection>

        <PageSection
          title="Risk Signals"
          description="The underlying clinical, commercial, reputation, and escalation exposure."
        >
          <RiskSignals signals={intelligence.riskSignals} />
        </PageSection>

        <PageSection
          title="Conversation Timeline"
          description="The operational history behind this impact assessment."
        >
          <CardWrapper>
            <CardContent className="pt-5">
              <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {conversation.timeline.map((event) => (
                  <li
                    key={event.id}
                    className="border-border/70 bg-background/35 flex gap-3 rounded-xl border p-4"
                  >
                    <div className="bg-telosa-blue-muted text-telosa-blue flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <Clock3 className="size-4" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{event.label}</p>
                      {event.description ? (
                        <p className="text-muted-foreground mt-1 text-xs leading-5">
                          {event.description}
                        </p>
                      ) : null}
                      <time
                        dateTime={event.occurredAt}
                        className="text-telosa-blue mt-2 block text-[10px] font-semibold tracking-wide uppercase"
                      >
                        {formatTimelineDate(event.occurredAt)}
                      </time>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </CardWrapper>
        </PageSection>

        <PageSection title="Navigation">
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/conversation/${conversation.id}`}
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to Conversation
            </Link>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to Dashboard
            </Link>
          </div>
        </PageSection>
      </PageContainer>
    </AppLayout>
  );
}
