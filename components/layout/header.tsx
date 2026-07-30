import * as React from "react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import type { BreadcrumbItem } from "@/types/ui";
import { cn } from "@/lib/utils";

type HeaderProps = {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  leading?: React.ReactNode;
  className?: string;
};

export function Header({
  title,
  breadcrumbs,
  actions,
  leading,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "border-border/70 bg-sidebar/85 sticky top-0 z-20 flex min-h-14 items-center gap-3 border-b px-4 shadow-[0_1px_0_rgb(36_48_70/0.45)] backdrop-blur-xl sm:px-5",
        className,
      )}
    >
      {leading ? <div className="shrink-0 lg:hidden">{leading}</div> : null}

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 py-2">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumb items={breadcrumbs} />
        ) : null}
        {title ? (
          <p className="truncate text-sm font-semibold tracking-tight sm:text-base">
            {title}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
