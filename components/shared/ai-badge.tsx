import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AIBadgeProps = {
  label?: string;
  className?: string;
};

export function AIBadge({ label = "AI", className }: AIBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-telosa-purple/20 bg-telosa-purple-muted text-telosa-purple gap-1 border font-medium shadow-none",
        className,
      )}
      aria-label={`${label} generated`}
    >
      <Sparkles className="size-3" aria-hidden />
      {label}
    </Badge>
  );
}
