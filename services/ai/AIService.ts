import "server-only";

import { GeminiAIService } from "@/services/ai/GeminiAIService";
import { MockAIService } from "@/services/ai/MockAIService";
import type { IAIService } from "@/services/ai/types";
import { getEnvConfig } from "@/services/config/env";
import type {
  AnalyzeConversationInput,
  AnalyzeConversationResult,
} from "@/types/domain";

class MissingGeminiConfigurationService implements IAIService {
  async analyzeConversation(): Promise<AnalyzeConversationResult> {
    throw new Error(
      "USE_REAL_AI is enabled but GEMINI_API_KEY is not configured",
    );
  }
}

/**
 * Facade AI service.
 * UI depends only on this interface — never on mock vs Gemini details.
 */
export class AIService implements IAIService {
  private readonly primary: IAIService;
  private readonly fallback: IAIService;

  constructor(
    primary?: IAIService,
    fallback: IAIService = new MockAIService(),
  ) {
    this.fallback = fallback;
    this.primary = primary ?? this.createDefaultPrimary();
  }

  private createDefaultPrimary(): IAIService {
    const env = getEnvConfig();
    if (env.useRealAI) {
      return env.geminiApiKey
        ? new GeminiAIService(env.geminiApiKey, env.geminiModel)
        : new MissingGeminiConfigurationService();
    }
    return this.fallback;
  }

  async analyzeConversation(
    input: AnalyzeConversationInput | string,
  ): Promise<AnalyzeConversationResult> {
    const startedAt = performance.now();
    try {
      const result = await this.primary.analyzeConversation(input);
      const normalizedResult = {
        ...result,
        source: result.source ?? "mock",
      };
      console.info("[AIService] Analysis completed", {
        provider: normalizedResult.source,
        latencyMs: Math.round(performance.now() - startedAt),
      });
      return normalizedResult;
    } catch (error) {
      console.error("[AIService] Falling back to mock provider", {
        provider: "fallback",
        latencyMs: Math.round(performance.now() - startedAt),
        errorName: error instanceof Error ? error.name : "UnknownError",
        errorMessage:
          error instanceof Error ? error.message : "Unknown provider failure",
      });

      const fallbackStartedAt = performance.now();
      const fallback = await this.fallback.analyzeConversation(input);
      const result = {
        ...fallback,
        source: "fallback" as const,
      };
      console.info("[AIService] Analysis completed", {
        provider: "fallback",
        latencyMs: Math.round(performance.now() - fallbackStartedAt),
        totalLatencyMs: Math.round(performance.now() - startedAt),
      });
      return result;
    }
  }
}

export function createAIService(): AIService {
  return new AIService();
}
