import {
  CalendarClock,
  Mail,
  MapPin,
  Paperclip,
  Phone,
  UserRound,
} from "lucide-react";

import {
  CardContent,
  CardHeader,
  CardTitle,
  CardWrapper,
  EmptyState,
  PageSection,
  StatusBadge,
} from "@/components/shared";
import { formatConversationDate, formatTimelineDate } from "@/lib/formatters";
import type { Conversation } from "@/types";

type ConversationSourcePanelProps = {
  conversation: Conversation;
};

export function ConversationSourcePanel({
  conversation,
}: ConversationSourcePanelProps) {
  return (
    <div className="space-y-8">
      <PageSection title="Original conversation">
        <CardWrapper className="overflow-hidden">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-sm font-medium">
                {conversation.channel}
              </CardTitle>
              <StatusBadge
                label={conversation.status}
                tone={
                  conversation.status === "Escalated"
                    ? "danger"
                    : conversation.status === "Resolved" ||
                        conversation.status === "Closed"
                      ? "success"
                      : conversation.status === "Awaiting Response"
                        ? "warning"
                        : "info"
                }
              />
            </div>
            <p className="text-muted-foreground text-xs">
              {formatConversationDate(conversation.createdAt)}
            </p>
          </CardHeader>
          <CardContent className="bg-muted/15 border-border/50 border-t pt-5">
            <blockquote className="border-telosa-blue/40 text-foreground/90 border-l-2 pl-4 text-[0.9375rem] leading-7">
              {conversation.text}
            </blockquote>
          </CardContent>
        </CardWrapper>
      </PageSection>

      <PageSection title="Patient details">
        <CardWrapper>
          <CardContent className="grid gap-4 pt-5 text-sm">
            <DetailRow
              icon={UserRound}
              label="Patient"
              value={conversation.patient.name}
            />
            <DetailRow
              icon={MapPin}
              label="Clinic"
              value={`${conversation.clinic.name}, ${conversation.clinic.city}`}
            />
            {conversation.patient.phone ? (
              <DetailRow
                icon={Phone}
                label="Phone"
                value={conversation.patient.phone}
              />
            ) : null}
            {conversation.patient.email ? (
              <DetailRow
                icon={Mail}
                label="Email"
                value={conversation.patient.email}
              />
            ) : null}
            <DetailRow
              icon={CalendarClock}
              label="Conversation ID"
              value={conversation.id}
            />
          </CardContent>
        </CardWrapper>
      </PageSection>

      <PageSection title="Timeline">
        <CardWrapper>
          <CardContent className="pt-5">
            <ol className="border-border relative space-y-5 border-l pl-5">
              {conversation.timeline.map((event) => (
                <li key={event.id} className="relative">
                  <span
                    className="bg-telosa-blue ring-card absolute top-1.5 -left-[1.45rem] size-2 rounded-full ring-4"
                    aria-hidden
                  />
                  <p className="text-sm font-medium">{event.label}</p>
                  {event.description ? (
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {event.description}
                    </p>
                  ) : null}
                  <time
                    dateTime={event.occurredAt}
                    className="text-muted-foreground mt-1 block text-xs"
                  >
                    {formatTimelineDate(event.occurredAt)}
                  </time>
                </li>
              ))}
            </ol>
          </CardContent>
        </CardWrapper>
      </PageSection>

      <PageSection title="Attachments">
        <EmptyState
          icon={<Paperclip className="size-5" aria-hidden />}
          title="No attachments"
          description="Files shared with this conversation will appear here."
          className="py-8"
        />
      </PageSection>
    </div>
  );
}

type DetailRowProps = {
  icon: typeof UserRound;
  label: string;
  value: string;
};

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        className="text-muted-foreground mt-0.5 size-4 shrink-0"
        aria-hidden
      />
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="font-medium break-words">{value}</p>
      </div>
    </div>
  );
}
