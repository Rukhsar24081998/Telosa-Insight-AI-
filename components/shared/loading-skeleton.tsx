import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type LoadingSkeletonProps = {
  variant?: "card" | "kpi" | "list" | "detail" | "text";
  count?: number;
  className?: string;
};

export function LoadingSkeleton({
  variant = "card",
  count = 1,
  className,
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, index) => index);

  if (variant === "kpi") {
    return (
      <div
        className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}
        aria-busy="true"
        aria-label="Loading metrics"
      >
        {items.map((item) => (
          <div
            key={item}
            className="border-border/80 bg-card space-y-3 rounded-xl border p-5 shadow-[var(--shadow-card)]"
          >
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div
        className={cn("space-y-3", className)}
        aria-busy="true"
        aria-label="Loading list"
      >
        {items.map((item) => (
          <div
            key={item}
            className="border-border/80 bg-card flex gap-3 rounded-xl border p-4 shadow-[var(--shadow-card)]"
          >
            <Skeleton className="size-9 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div
        className={cn("space-y-4", className)}
        aria-busy="true"
        aria-label="Loading details"
      >
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={cn("space-y-2", className)} aria-busy="true">
        {items.map((item) => (
          <Skeleton key={item} className="h-3 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("grid gap-4 md:grid-cols-2", className)}
      aria-busy="true"
      aria-label="Loading cards"
    >
      {items.map((item) => (
        <div
          key={item}
          className="border-border/80 bg-card space-y-3 rounded-xl border p-5 shadow-[var(--shadow-card)]"
        >
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  );
}
