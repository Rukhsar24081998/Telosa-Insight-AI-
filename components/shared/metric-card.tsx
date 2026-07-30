import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import {
  CardWrapper,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card-wrapper";
import { PriorityBadge } from "@/components/shared/priority-badge";
import type { PriorityLevel } from "@/lib/design-tokens";
import { typography } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: number | string;
  description?: string;
  priority?: PriorityLevel;
  icon?: LucideIcon;
  animateValue?: boolean;
  decimals?: number;
  suffix?: string;
  className?: string;
  children?: ReactNode;
};

export function MetricCard({
  title,
  value,
  description,
  priority,
  icon: Icon,
  animateValue = typeof value === "number",
  decimals = 0,
  suffix,
  className,
  children,
}: MetricCardProps) {
  return (
    <CardWrapper className={cn("h-full", className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className={typography.cardTitle}>{title}</CardTitle>
            {description ? (
              <p className="text-muted-foreground text-xs leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
          {priority ? <PriorityBadge priority={priority} /> : null}
        </div>
        <div className="flex items-end gap-3">
          {Icon ? (
            <div className="bg-telosa-blue-muted text-telosa-blue flex size-10 items-center justify-center rounded-xl">
              <Icon className="size-5" aria-hidden />
            </div>
          ) : null}
          <div className={cn(typography.metric, "text-4xl")}>
            {typeof value === "number" && animateValue ? (
              <AnimatedCounter
                value={value}
                decimals={decimals}
                suffix={suffix}
              />
            ) : (
              <span>
                {value}
                {suffix}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
    </CardWrapper>
  );
}
