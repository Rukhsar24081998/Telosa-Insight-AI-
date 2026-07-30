import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { statusStyles } from "@/lib/status-styles";
import type { StatusTone } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "border font-medium capitalize shadow-none",
  {
    variants: {
      size: {
        sm: "px-1.5 py-0 text-[10px]",
        md: "px-2 py-0.5 text-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type StatusBadgeProps = {
  label: string;
  tone?: StatusTone;
  className?: string;
} & VariantProps<typeof statusBadgeVariants>;

export function StatusBadge({
  label,
  tone = "neutral",
  size,
  className,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        statusBadgeVariants({ size }),
        statusStyles[tone].badge,
        className,
      )}
    >
      {label}
    </Badge>
  );
}
