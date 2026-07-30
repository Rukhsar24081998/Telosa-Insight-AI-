import { AlertTriangle, Inbox } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "default" | "warning";
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  variant = "default",
  className,
}: EmptyStateProps) {
  const DefaultIcon = variant === "warning" ? AlertTriangle : Inbox;

  return (
    <div
      className={cn(
        "border-border/70 from-card to-muted/20 flex flex-col items-center justify-center rounded-2xl border border-dashed bg-gradient-to-b px-6 py-12 text-center shadow-[var(--shadow-card)]",
        className,
      )}
      role="status"
    >
      <div
        className={cn(
          "ring-border mb-4 flex size-12 items-center justify-center rounded-2xl shadow-sm ring-1",
          variant === "warning"
            ? "bg-telosa-orange-muted text-telosa-orange-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        {icon ?? <DefaultIcon className="size-5" aria-hidden />}
      </div>
      <h3 className="text-sm font-medium tracking-tight">{title}</h3>
      {description ? (
        <p className="text-muted-foreground mt-1 max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
      {actionLabel && onAction ? (
        <Button className="mt-4" variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
