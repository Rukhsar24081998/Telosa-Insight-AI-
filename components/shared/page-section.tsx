import * as React from "react";

import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

type PageSectionProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PageSection({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: PageSectionProps) {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      {title ? (
        <SectionHeader
          title={title}
          description={description}
          action={action}
        />
      ) : null}
      <div className={cn("min-w-0", contentClassName)}>{children}</div>
    </section>
  );
}
