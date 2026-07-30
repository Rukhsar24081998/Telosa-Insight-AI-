"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle, MessagesSquare, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import {
  listConversationsAction,
  type ConversationListQuery,
} from "@/app/conversation/actions";
import {
  ConversationCard,
  EmptyState,
  FilterDropdown,
  LoadingSkeleton,
  PageContainer,
  PageHeader,
  SearchInput,
} from "@/components/shared";
import { formatConversationDate } from "@/lib/formatters";
import type { Conversation, ConversationChannel } from "@/types";
import {
  conversationChannels,
  conversationStatuses,
  priorities,
} from "@/types";

type ConversationListClientProps = {
  initialConversations: Conversation[];
};

const channelIcons = {
  "Google Reviews": Star,
  WhatsApp: MessageCircle,
  Email: Mail,
  "Website Chat": MessagesSquare,
} satisfies Record<ConversationChannel, typeof Mail>;

export function ConversationListClient({
  initialConversations,
}: ConversationListClientProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [conversations, setConversations] =
    React.useState(initialConversations);
  const [query, setQuery] = React.useState<ConversationListQuery>({
    search: "",
    channel: "All",
    priority: "All",
    status: "All",
    clinicId: "All",
    sort: "highest-impact",
  });
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);
  const requestId = React.useRef(0);
  const firstRender = React.useRef(true);

  const clinicOptions = React.useMemo(() => {
    const clinics = new Map<string, string>();
    for (const conversation of initialConversations) {
      clinics.set(
        conversation.clinic.id,
        `${conversation.clinic.name}, ${conversation.clinic.city}`,
      );
    }
    return [
      { label: "All Clinics", value: "All" },
      ...Array.from(clinics.entries())
        .sort(([, a], [, b]) => a.localeCompare(b))
        .map(([value, label]) => ({ value, label })),
    ];
  }, [initialConversations]);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const currentRequest = ++requestId.current;
    const timer = window.setTimeout(
      () => {
        startTransition(async () => {
          try {
            const result = await listConversationsAction(query);
            if (requestId.current === currentRequest) {
              setConversations(result);
              setError(null);
            }
          } catch {
            if (requestId.current === currentRequest) {
              setError(
                "Conversations could not be loaded. Please adjust the filters or retry.",
              );
            }
          }
        });
      },
      query.search ? 250 : 0,
    );

    return () => window.clearTimeout(timer);
  }, [query]);

  const updateQuery = <Key extends keyof ConversationListQuery>(
    key: Key,
    value: ConversationListQuery[Key],
  ) => {
    setQuery((current) => ({ ...current, [key]: value }));
  };

  return (
    <PageContainer className="max-w-none gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Conversations"
        description="Investigate customer conversations, AI analysis, and business impact across every supported channel."
        className="pb-4"
      />

      <section aria-labelledby="conversation-workspace-title">
        <h2 id="conversation-workspace-title" className="sr-only">
          Conversation workspace
        </h2>
        <div className="border-border bg-card mb-3 flex flex-col gap-2 rounded-xl border p-2.5 shadow-[var(--shadow-card)] lg:flex-row lg:items-center">
          <SearchInput
            value={query.search}
            onValueChange={(value) => updateQuery("search", value)}
            placeholder="Search conversations..."
            className="lg:flex-[1.7]"
            aria-label="Search conversations"
          />
          <FilterDropdown
            label="Channel"
            options={[
              { label: "All Channels", value: "All" },
              ...conversationChannels.map((value) => ({
                label: value,
                value,
              })),
            ]}
            value={query.channel}
            onValueChange={(value) =>
              updateQuery("channel", value as ConversationListQuery["channel"])
            }
            className="lg:flex-1"
          />
          <FilterDropdown
            label="Priority"
            options={[
              { label: "All Priorities", value: "All" },
              ...priorities.map((value) => ({ label: value, value })),
            ]}
            value={query.priority}
            onValueChange={(value) =>
              updateQuery(
                "priority",
                value as ConversationListQuery["priority"],
              )
            }
            className="lg:flex-1"
          />
          <FilterDropdown
            label="Status"
            options={[
              { label: "All Status", value: "All" },
              ...conversationStatuses.map((value) => ({
                label: value,
                value,
              })),
            ]}
            value={query.status}
            onValueChange={(value) =>
              updateQuery("status", value as ConversationListQuery["status"])
            }
            className="lg:flex-1"
          />
          <FilterDropdown
            label="Clinic"
            options={clinicOptions}
            value={query.clinicId}
            onValueChange={(value) => updateQuery("clinicId", value)}
            className="lg:flex-[1.2]"
          />
          <FilterDropdown
            label="Sort"
            options={[
              { label: "Newest", value: "newest" },
              { label: "Highest Priority", value: "highest-priority" },
              { label: "Highest Business Impact", value: "highest-impact" },
            ]}
            value={query.sort}
            onValueChange={(value) =>
              updateQuery("sort", value as ConversationListQuery["sort"])
            }
            className="lg:flex-[1.15]"
          />
        </div>

        <div
          className="mb-2 flex min-h-5 items-center justify-between gap-3 px-1"
          aria-live="polite"
        >
          <p className="text-muted-foreground text-xs">
            {isPending
              ? "Updating conversations…"
              : `${conversations.length} conversation${
                  conversations.length === 1 ? "" : "s"
                }`}
          </p>
        </div>

        {error ? (
          <EmptyState
            variant="warning"
            title="Unable to load conversations"
            description={error}
            actionLabel="Retry"
            onAction={() => setQuery((current) => ({ ...current }))}
          />
        ) : isPending ? (
          <LoadingSkeleton variant="list" count={6} />
        ) : conversations.length === 0 ? (
          <EmptyState
            title="No conversations found"
            description="Try clearing search terms or selecting broader filters."
            actionLabel="Clear filters"
            onAction={() =>
              setQuery({
                search: "",
                channel: "All",
                priority: "All",
                status: "All",
                clinicId: "All",
                sort: "highest-impact",
              })
            }
          />
        ) : (
          <div className="grid gap-2.5 xl:grid-cols-2">
            {conversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.015 }}
              >
                <ConversationCard
                  customerName={conversation.patient.name}
                  preview={conversation.text}
                  channel={conversation.channel}
                  clinic={`${conversation.clinic.name}, ${conversation.clinic.city}`}
                  timestamp={formatConversationDate(conversation.createdAt)}
                  priority={conversation.businessImpact.priority}
                  status={conversation.status}
                  impactScore={conversation.businessImpact.score}
                  assignedTeam={conversation.assignedTeam}
                  showAI
                  channelIcon={channelIcons[conversation.channel]}
                  onClick={() =>
                    router.push(`/conversation/${conversation.id}`)
                  }
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
