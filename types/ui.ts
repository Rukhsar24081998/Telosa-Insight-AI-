import type { ComponentType } from "react";

import type { PriorityLevel, StatusTone } from "@/lib/design-tokens";

export type { PriorityLevel, StatusTone };

export type NavItem = {
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  disabled?: boolean;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type FilterOption = {
  label: string;
  value: string;
};
