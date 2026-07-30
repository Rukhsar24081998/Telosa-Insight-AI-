"use server";

import { getServices } from "@/services";
import type {
  ConversationListFilters,
  ConversationSortOption,
} from "@/services/conversation/ConversationService";
import type {
  Conversation,
  ConversationChannel,
  ConversationStatus,
  Priority,
} from "@/types";
import {
  conversationChannels,
  conversationStatuses,
  priorities,
} from "@/types";

export type ConversationListQuery = {
  search?: string;
  channel?: ConversationChannel | "All";
  priority?: Priority | "All";
  status?: ConversationStatus | "All";
  clinicId?: string | "All";
  sort?: ConversationSortOption;
};

export type ConversationActionResult =
  | { ok: true; conversation: Conversation }
  | { ok: false; error: string };

function isOneOf<T extends string>(
  value: string | undefined,
  values: readonly T[],
): value is T {
  return value !== undefined && values.includes(value as T);
}

function sanitizeQuery(query: ConversationListQuery): ConversationListFilters {
  const validSorts: ConversationSortOption[] = [
    "newest",
    "highest-priority",
    "highest-impact",
  ];

  return {
    search: query.search?.trim().slice(0, 120),
    channel:
      query.channel === "All" ||
      isOneOf(query.channel, conversationChannels)
        ? query.channel
        : "All",
    priority:
      query.priority === "All" || isOneOf(query.priority, priorities)
        ? query.priority
        : "All",
    status:
      query.status === "All" ||
      isOneOf(query.status, conversationStatuses)
        ? query.status
        : "All",
    clinicId: query.clinicId?.slice(0, 80) || "All",
    sort: validSorts.includes(query.sort ?? "highest-impact")
      ? query.sort
      : "highest-impact",
    includeSpam: true,
  };
}

export async function listConversationsAction(
  query: ConversationListQuery,
): Promise<Conversation[]> {
  return getServices().conversationService.listConversations(
    sanitizeQuery(query),
  );
}

export async function analyzeConversationAction(
  id: string,
): Promise<ConversationActionResult> {
  try {
    const conversation =
      await getServices().conversationService.analyzeConversation(id);

    if (!conversation) {
      return { ok: false, error: "Conversation not found." };
    }

    return { ok: true, conversation };
  } catch (error) {
    console.error("[ConversationAction] AI analysis failed", error);
    return {
      ok: false,
      error:
        "AI analysis is temporarily unavailable. Your existing analysis remains visible.",
    };
  }
}
