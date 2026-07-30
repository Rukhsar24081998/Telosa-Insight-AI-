import type { PriorityLevel, StatusTone } from "@/lib/design-tokens";

export const priorityStyles: Record<
  PriorityLevel,
  {
    badge: string;
    text: string;
    tint: string;
    border: string;
  }
> = {
  Critical: {
    badge: "bg-telosa-red-muted text-telosa-red border-telosa-red/20",
    text: "text-telosa-red",
    tint: "bg-telosa-red-muted",
    border: "border-telosa-red/30",
  },
  High: {
    badge:
      "bg-telosa-orange-muted text-telosa-orange-foreground border-telosa-orange/25",
    text: "text-telosa-orange-foreground",
    tint: "bg-telosa-orange-muted",
    border: "border-telosa-orange/30",
  },
  Medium: {
    badge: "bg-telosa-blue-muted text-telosa-blue border-telosa-blue/20",
    text: "text-telosa-blue",
    tint: "bg-telosa-blue-muted",
    border: "border-telosa-blue/25",
  },
  Low: {
    badge: "bg-telosa-gray-muted text-telosa-gray border-telosa-gray/20",
    text: "text-telosa-gray",
    tint: "bg-telosa-gray-muted",
    border: "border-telosa-gray/20",
  },
};

export const statusStyles: Record<
  StatusTone,
  {
    badge: string;
    text: string;
    tint: string;
  }
> = {
  neutral: {
    badge: "bg-telosa-gray-muted text-telosa-gray border-telosa-gray/20",
    text: "text-telosa-gray",
    tint: "bg-telosa-gray-muted",
  },
  info: {
    badge: "bg-telosa-blue-muted text-telosa-blue border-telosa-blue/20",
    text: "text-telosa-blue",
    tint: "bg-telosa-blue-muted",
  },
  success: {
    badge: "bg-telosa-green-muted text-telosa-green border-telosa-green/20",
    text: "text-telosa-green",
    tint: "bg-telosa-green-muted",
  },
  warning: {
    badge:
      "bg-telosa-orange-muted text-telosa-orange-foreground border-telosa-orange/25",
    text: "text-telosa-orange-foreground",
    tint: "bg-telosa-orange-muted",
  },
  danger: {
    badge: "bg-telosa-red-muted text-telosa-red border-telosa-red/20",
    text: "text-telosa-red",
    tint: "bg-telosa-red-muted",
  },
  ai: {
    badge: "bg-telosa-purple-muted text-telosa-purple border-telosa-purple/20",
    text: "text-telosa-purple",
    tint: "bg-telosa-purple-muted",
  },
};
