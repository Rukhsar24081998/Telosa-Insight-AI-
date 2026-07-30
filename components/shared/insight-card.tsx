import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import {
  CardWrapper,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card-wrapper";
import { AIBadge } from "@/components/shared/ai-badge";
import { typography } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

type InsightCardProps = {
  title: string;
  description: string;
  category?: string;
  confidence?: number | string;
  className?: string;
  children?: ReactNode;
};

export function InsightCard({
  title,
  description,
  category,
  confidence,
  className,
  children,
}: InsightCardProps) {
  return (
    <CardWrapper
      className={cn(
        "group/insight from-telosa-white to-telosa-purple-muted/40 border-telosa-purple/15 bg-gradient-to-br transition-transform duration-200 hover:-translate-y-0.5",
        className,
      )}
    >
      <CardHeader className="space-y-3 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <AIBadge />
          {category ? (
            <span className="text-muted-foreground text-xs">{category}</span>
          ) : null}
          {confidence !== undefined ? (
            <span className="text-telosa-purple ml-auto text-xs font-medium tabular-nums">
              {typeof confidence === "number" ? `${confidence}%` : confidence}{" "}
              confidence
            </span>
          ) : null}
        </div>
        <div className="flex items-start gap-3">
          <CardTitle className={cn(typography.cardTitle, "min-w-0 flex-1")}>
            {title}
          </CardTitle>
          <ChevronRight
            className="text-muted-foreground size-4 shrink-0 transition-transform group-hover/insight:translate-x-0.5"
            aria-hidden
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-foreground/90 text-sm leading-relaxed">
          {description}
        </p>
        {children}
      </CardContent>
    </CardWrapper>
  );
}
