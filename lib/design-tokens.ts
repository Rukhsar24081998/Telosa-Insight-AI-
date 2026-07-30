/**
 * Centralized design tokens for Telosa Insight.
 * Maps to CSS variables defined in app/globals.css and Tailwind utilities.
 */

export const colors = {
  primary: "var(--telosa-blue)",
  ai: "var(--telosa-purple)",
  success: "var(--telosa-green)",
  warning: "var(--telosa-orange)",
  danger: "var(--telosa-red)",
  neutral: "var(--telosa-gray)",
  surface: "var(--telosa-white)",
  canvas: "var(--telosa-canvas)",
} as const;

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  "3xl": "2.5rem",
  "4xl": "3rem",
} as const;

export const radii = {
  sm: "calc(var(--radius) * 0.6)",
  md: "calc(var(--radius) * 0.8)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) * 1.4)",
  full: "9999px",
} as const;

export const shadows = {
  card: "var(--shadow-card)",
  elevated: "var(--shadow-elevated)",
  focus: "var(--shadow-focus)",
} as const;

export const typography = {
  appTitle: "text-base font-semibold tracking-tight",
  pageTitle:
    "text-2xl font-semibold tracking-[-0.025em] sm:text-3xl lg:text-[2rem]",
  sectionHeading: "text-lg font-semibold tracking-[-0.015em]",
  cardTitle: "text-sm font-semibold tracking-[-0.01em]",
  body: "text-sm font-normal leading-relaxed",
  caption: "text-xs font-normal text-muted-foreground",
  metric: "text-3xl font-semibold tracking-[-0.035em] tabular-nums",
} as const;

export const priorityLevels = ["Critical", "High", "Medium", "Low"] as const;
export type PriorityLevel = (typeof priorityLevels)[number];

export const statusTones = [
  "neutral",
  "info",
  "success",
  "warning",
  "danger",
  "ai",
] as const;
export type StatusTone = (typeof statusTones)[number];
