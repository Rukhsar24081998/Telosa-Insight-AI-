import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Globe2,
  MessageCircle,
  MessageSquare,
  Star,
} from "lucide-react";

import { CardWrapper, CardContent } from "@/components/shared/card-wrapper";
import { AIBadge } from "@/components/shared/ai-badge";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import type { PriorityLevel } from "@/lib/design-tokens";
import type { ConversationStatus } from "@/types";
import { cn } from "@/lib/utils";

type ConversationCardProps = {
  customerName: string;
  preview: string;
  channel: string;
  clinic?: string;
  timestamp?: string;
  priority?: PriorityLevel;
  status?: ConversationStatus;
  impactScore?: number;
  assignedTeam?: string;
  sla?: string;
  showAI?: boolean;
  channelIcon?: LucideIcon;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export function ConversationCard({
  customerName,
  preview,
  channel,
  clinic,
  timestamp,
  priority,
  status,
  impactScore,
  assignedTeam,
  sla,
  showAI = false,
  channelIcon: ChannelIcon,
  selected = false,
  onClick,
  className,
}: ConversationCardProps) {
  const PlatformIcon =
    ChannelIcon ??
    (channel.includes("Google")
      ? Star
      : channel.includes("Instagram")
        ? Camera
        : channel.includes("WhatsApp")
          ? MessageCircle
          : channel.includes("Website")
            ? Globe2
            : MessageSquare);
  const platformTone = channel.includes("Google")
    ? "bg-blue-500/15 text-blue-400"
    : channel.includes("Instagram")
      ? "bg-pink-500/15 text-pink-400"
      : channel.includes("WhatsApp")
        ? "bg-emerald-500/15 text-emerald-400"
        : "bg-sky-500/15 text-sky-400";

  return (
    <CardWrapper
      interactive={Boolean(onClick)}
      selected={selected}
      onClick={onClick}
      className={cn(
        "group/conversation border-border/50 bg-secondary/25 hover:bg-secondary/45 gap-0 rounded-lg py-0 shadow-none",
        selected &&
          "border-telosa-blue/45 bg-telosa-blue/5 shadow-[inset_2px_0_0_var(--telosa-blue)]",
        className,
      )}
    >
      <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            platformTone,
          )}
        >
          <PlatformIcon className="size-4" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <p className="truncate text-sm font-semibold tracking-[-0.01em]">
              {customerName}
            </p>
            {showAI ? <AIBadge label="AI" /> : null}
          </div>
          <p className="text-muted-foreground mt-0.5 truncate text-xs">
            {preview}
          </p>
          <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-1.5">
            <span className="bg-background/60 text-muted-foreground rounded px-1.5 py-0.5 text-[9px]">
              {channel}
            </span>
            {clinic ? (
              <span className="bg-background/60 text-muted-foreground max-w-48 truncate rounded px-1.5 py-0.5 text-[9px]">
                {clinic}
              </span>
            ) : null}
            {status ? (
              <StatusBadge
                label={status}
                tone={
                  status === "Escalated"
                    ? "danger"
                    : status === "Resolved" || status === "Closed"
                      ? "success"
                      : status === "Awaiting Response"
                        ? "warning"
                        : "info"
                }
              />
            ) : null}
            {assignedTeam ? (
              <span className="text-muted-foreground truncate text-[9px]">
                {assignedTeam}
                {sla ? ` · ${sla} SLA` : ""}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex min-w-20 items-center justify-end gap-3">
          <div className="text-right">
            {priority ? <PriorityBadge priority={priority} /> : null}
            {typeof impactScore === "number" ? (
              <>
                <p className="mt-0.5 text-sm font-bold tabular-nums">
                  {impactScore}
                </p>
                <p className="text-muted-foreground text-[8px]">Impact Score</p>
              </>
            ) : null}
          </div>
          {timestamp ? (
            <p className="text-muted-foreground text-right text-[9px] whitespace-nowrap">
              {timestamp}
            </p>
          ) : null}
        </div>
      </CardContent>
    </CardWrapper>
  );
}
