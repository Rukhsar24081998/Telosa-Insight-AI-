import type { IAIService } from "@/services/ai/types";
import type { IBusinessImpactService } from "@/services/business/BusinessImpactService";
import {
  getAllConversationSeeds,
  getConversationSeedById,
  hydrateConversationSeed,
  type ConversationSeed,
} from "@/mock/conversations";
import type {
  AIAnalysis,
  Conversation,
  ConversationChannel,
  ConversationStatus,
  ConversationTimeline,
  Priority,
  Sentiment,
} from "@/types/domain";

export type ConversationSortOption =
  | "newest"
  | "highest-priority"
  | "highest-impact";

export type ConversationListFilters = {
  channel?: ConversationChannel | "All";
  priority?: Priority | "All";
  status?: ConversationStatus | "All";
  sentiment?: Sentiment | "All";
  clinicId?: string | "All";
  conversationType?: string | "All";
  search?: string;
  includeSpam?: boolean;
  sort?: ConversationSortOption;
};

export interface IConversationService {
  listConversations(filters?: ConversationListFilters): Promise<Conversation[]>;
  getConversationById(id: string): Promise<Conversation | null>;
  getTimeline(id: string): Promise<ConversationTimeline | null>;
  analyzeConversation(id: string): Promise<Conversation | null>;
  analyzeAndScore(id: string, refreshAI?: boolean): Promise<Conversation | null>;
}

export class ConversationService implements IConversationService {
  constructor(
    private readonly aiService: IAIService,
    private readonly businessImpactService: IBusinessImpactService,
  ) {}

  private toAIAnalysis(
    seed: ConversationSeed,
    override?: Awaited<ReturnType<IAIService["analyzeConversation"]>>,
    source: AIAnalysis["source"] = seed.aiAnalysis.source,
  ): AIAnalysis {
    if (!override) {
      return seed.aiAnalysis;
    }

    return {
      intent: override.intent,
      sentiment: override.sentiment,
      entities: override.entities,
      summary: override.summary,
      suggestedReply: override.suggestedReply,
      confidence: override.confidence,
      isDuplicate: override.isDuplicate ?? seed.aiAnalysis.isDuplicate,
      isSpam: override.isSpam ?? seed.aiAnalysis.isSpam,
      duplicateOfId: override.duplicateOfId ?? seed.aiAnalysis.duplicateOfId,
      source,
    };
  }

  private buildConversation(
    seed: ConversationSeed,
    aiAnalysis: AIAnalysis,
  ): Conversation {
    const base = hydrateConversationSeed(seed);
    const businessImpact = this.businessImpactService.calculateImpact({
      text: seed.text,
      channel: seed.channel,
      aiAnalysis,
      patient: base.patient,
      status: seed.status,
    });

    return {
      ...base,
      aiAnalysis,
      assignedTeam: businessImpact.assignedTeam,
      businessImpact,
    };
  }

  private matchesFilters(
    conversation: Conversation,
    filters: ConversationListFilters = {},
  ): boolean {
    if (!filters.includeSpam && conversation.aiAnalysis.isSpam) {
      return false;
    }
    if (
      filters.channel &&
      filters.channel !== "All" &&
      conversation.channel !== filters.channel
    ) {
      return false;
    }
    if (
      filters.priority &&
      filters.priority !== "All" &&
      conversation.businessImpact.priority !== filters.priority
    ) {
      return false;
    }
    if (
      filters.status &&
      filters.status !== "All" &&
      conversation.status !== filters.status
    ) {
      return false;
    }
    if (
      filters.sentiment &&
      filters.sentiment !== "All" &&
      conversation.aiAnalysis.sentiment !== filters.sentiment
    ) {
      return false;
    }
    if (
      filters.clinicId &&
      filters.clinicId !== "All" &&
      conversation.clinic.id !== filters.clinicId
    ) {
      return false;
    }
    if (
      filters.conversationType &&
      filters.conversationType !== "All" &&
      conversation.conversationType !== filters.conversationType
    ) {
      return false;
    }
    if (filters.search?.trim()) {
      const query = filters.search.trim().toLowerCase();
      const haystack = [
        conversation.id,
        conversation.patient.name,
        conversation.clinic.name,
        conversation.channel,
        conversation.text,
        conversation.aiAnalysis.summary,
        conversation.aiAnalysis.intent,
        ...conversation.aiAnalysis.entities.map((entity) => entity.value),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  }

  async listConversations(
    filters: ConversationListFilters = {},
  ): Promise<Conversation[]> {
    const conversations = getAllConversationSeeds().map((seed) =>
      this.buildConversation(seed, seed.aiAnalysis),
    );
    const priorityRank: Record<Priority, number> = {
      Critical: 4,
      High: 3,
      Medium: 2,
      Low: 1,
    };

    return conversations
      .filter((conversation) => this.matchesFilters(conversation, filters))
      .sort((a, b) => {
        switch (filters.sort ?? "highest-impact") {
          case "newest":
            return b.createdAt.localeCompare(a.createdAt);
          case "highest-priority":
            return (
              priorityRank[b.businessImpact.priority] -
                priorityRank[a.businessImpact.priority] ||
              b.createdAt.localeCompare(a.createdAt)
            );
          case "highest-impact":
            return (
              b.businessImpact.score - a.businessImpact.score ||
              b.createdAt.localeCompare(a.createdAt)
            );
        }
      });
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    const seed = getConversationSeedById(id);
    if (!seed) {
      return null;
    }
    return this.buildConversation(seed, seed.aiAnalysis);
  }

  async getTimeline(id: string): Promise<ConversationTimeline | null> {
    const conversation = await this.getConversationById(id);
    if (!conversation) {
      return null;
    }
    return {
      conversationId: conversation.id,
      events: conversation.timeline,
    };
  }

  /**
   * Returns a conversation with optional live AI refresh.
   * Business impact is always recomputed by the deterministic engine.
   */
  async analyzeConversation(id: string): Promise<Conversation | null> {
    return this.analyzeAndScore(id, true);
  }

  async analyzeAndScore(
    id: string,
    refreshAI = false,
  ): Promise<Conversation | null> {
    const seed = getConversationSeedById(id);
    if (!seed) {
      return null;
    }

    if (!refreshAI) {
      return this.buildConversation(seed, seed.aiAnalysis);
    }

    const clinicName = hydrateConversationSeed(seed).clinic.name;
    const analysis = await this.aiService.analyzeConversation({
      text: seed.text,
      channel: seed.channel,
      clinicName,
      conversationId: seed.id,
    });

    return this.buildConversation(
      seed,
      this.toAIAnalysis(seed, analysis, analysis.source ?? "mock"),
    );
  }
}
