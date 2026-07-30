import { ArrowRight } from "lucide-react";

import {
  CardWrapper,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/card-wrapper";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { Button } from "@/components/ui/button";
import { typography } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { Priority } from "@/types";

type RecommendationCardProps = {
  title: string;
  rationale: string;
  priority?: Priority;
  recommendedOwner?: string;
  targetSla?: string;
  expectedOutcome?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function RecommendationCard({
  title,
  rationale,
  priority,
  recommendedOwner,
  targetSla,
  expectedOutcome,
  actionLabel = "Review",
  onAction,
  className,
}: RecommendationCardProps) {
  return (
    <CardWrapper className={cn("group/recommendation h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className={cn(typography.cardTitle, "leading-5")}>
            {title}
          </CardTitle>
          {priority ? <PriorityBadge priority={priority} /> : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {rationale}
        </p>
        {recommendedOwner ? (
          <div className="border-border/60 bg-muted/20 grid gap-3 rounded-xl border p-3 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
                Recommended owner
              </p>
              <p className="text-sm font-medium">{recommendedOwner}</p>
            </div>
            {targetSla ? (
              <div>
                <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
                  Target SLA
                </p>
                <p className="text-sm font-medium">{targetSla}</p>
              </div>
            ) : null}
          </div>
        ) : null}
        {expectedOutcome ? (
          <div className="border-telosa-green/15 bg-telosa-green-muted/15 rounded-xl border p-3">
            <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
              Expected business outcome
            </p>
            <p className="text-sm leading-relaxed">{expectedOutcome}</p>
          </div>
        ) : null}
      </CardContent>
      {onAction ? (
        <CardFooter className="bg-transparent pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
            className="group-hover/recommendation:border-telosa-blue/30 gap-1.5 transition-all"
          >
            {actionLabel}
            <ArrowRight className="size-3.5" aria-hidden />
          </Button>
        </CardFooter>
      ) : null}
    </CardWrapper>
  );
}
