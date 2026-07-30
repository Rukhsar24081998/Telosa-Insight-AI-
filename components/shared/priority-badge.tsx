import { AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { PriorityLevel } from "@/lib/design-tokens";
import { priorityStyles } from "@/lib/status-styles";
import { cn } from "@/lib/utils";

type PriorityBadgeProps = {
  priority: PriorityLevel;
  showIcon?: boolean;
  className?: string;
};

export function PriorityBadge({
  priority,
  showIcon = priority === "Critical",
  className,
}: PriorityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 border font-medium shadow-none",
        priorityStyles[priority].badge,
        className,
      )}
      aria-label={`Priority: ${priority}`}
    >
      {showIcon ? <AlertTriangle className="size-3" aria-hidden /> : null}
      {priority}
    </Badge>
  );
}
