import type { LucideIcon } from "lucide-react";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import {
  CardWrapper,
  CardContent,
  CardHeader,
} from "@/components/shared/card-wrapper";
import { typography } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

type KPICardProps = {
  label: string;
  value: number | string;
  caption?: string;
  icon?: LucideIcon;
  trend?: {
    direction: "up" | "down" | "flat";
    label: string;
    tone?: "positive" | "negative" | "neutral";
  };
  updatedAt?: string;
  animateValue?: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function KPICard({
  label,
  value,
  caption,
  icon: Icon,
  trend,
  updatedAt,
  animateValue = typeof value === "number",
  decimals = 0,
  prefix,
  suffix,
  className,
}: KPICardProps) {
  const visualTone = label.includes("Critical")
    ? "critical"
    : label.includes("Business Impact")
      ? "warning"
      : label.includes("Response") || label.includes("SLA")
        ? "success"
        : "info";
  const toneClasses = {
    critical: {
      icon: "bg-telosa-red-muted text-telosa-red",
      spark: "text-telosa-red",
      glow: "from-telosa-red/10",
    },
    warning: {
      icon: "bg-telosa-orange-muted text-telosa-orange",
      spark: "text-telosa-orange",
      glow: "from-telosa-orange/10",
    },
    success: {
      icon: "bg-telosa-green-muted text-telosa-green",
      spark: "text-telosa-green",
      glow: "from-telosa-green/10",
    },
    info: {
      icon: "bg-telosa-blue-muted text-telosa-blue",
      spark: "text-telosa-blue",
      glow: "from-telosa-blue/10",
    },
  }[visualTone];
  const sparkPath =
    visualTone === "critical"
      ? "M0 37 C8 36 10 26 18 29 S31 23 39 25 S53 20 61 23 S75 21 82 14 S93 19 100 10"
      : visualTone === "warning"
        ? "M0 38 C9 36 10 30 18 31 S31 26 40 28 S53 24 61 25 S73 22 80 13 S92 21 100 11"
        : visualTone === "success"
          ? "M0 32 C9 21 15 27 23 29 S38 31 47 27 S61 29 68 21 S83 24 89 15 S96 15 100 12"
          : "M0 39 C8 38 9 31 18 34 S31 29 40 31 S53 25 61 27 S74 20 82 22 S93 13 100 17";

  return (
    <CardWrapper
      className={cn(
        "group relative h-full min-h-24 overflow-hidden py-2.5 hover:-translate-y-0.5",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute right-0 bottom-0 h-16 w-1/2 bg-gradient-to-t to-transparent",
          toneClasses.glow,
        )}
        aria-hidden
      />
      <CardHeader className="relative flex flex-row items-start justify-between gap-3 px-3.5 pb-0">
        <p className="text-muted-foreground text-[11px] font-medium">{label}</p>
        {Icon ? (
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105",
              toneClasses.icon,
            )}
          >
            <Icon className="size-4" aria-hidden />
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="relative space-y-1 px-3.5">
        <div className={cn(typography.metric, "text-[1.65rem]")}>
          {typeof value === "number" && animateValue ? (
            <AnimatedCounter
              value={value}
              decimals={decimals}
              prefix={prefix}
              suffix={suffix}
            />
          ) : (
            <span>
              {prefix}
              {value}
              {suffix}
            </span>
          )}
        </div>
        {trend || caption ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {trend ? (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-[10px] font-semibold",
                  trend.tone === "positive"
                    ? "text-telosa-green"
                    : trend.tone === "negative"
                      ? "text-telosa-red"
                      : "text-muted-foreground",
                )}
              >
                {trend.direction === "up" ? (
                  <TrendingUp className="size-3.5" aria-hidden />
                ) : trend.direction === "down" ? (
                  <TrendingDown className="size-3.5" aria-hidden />
                ) : (
                  <Minus className="size-3.5" aria-hidden />
                )}
                {trend.label}
              </span>
            ) : null}
            {caption ? (
              <p className="text-muted-foreground text-[10px]">{caption}</p>
            ) : null}
          </div>
        ) : null}
        {updatedAt ? (
          <p className="text-muted-foreground/80 border-border/60 border-t pt-2 text-[10px]">
            Updated {updatedAt}
          </p>
        ) : null}
      </CardContent>
      <svg
        viewBox="0 0 100 44"
        preserveAspectRatio="none"
        className={cn(
          "pointer-events-none absolute right-0 bottom-0 h-11 w-[52%] opacity-90",
          toneClasses.spark,
        )}
        aria-hidden
      >
        <path
          d={`${sparkPath} L100 44 L0 44 Z`}
          fill="currentColor"
          opacity="0.1"
        />
        <path
          d={sparkPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </CardWrapper>
  );
}
