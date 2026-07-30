import { AIService, createAIService } from "@/services/ai/AIService";
import type { IAIService } from "@/services/ai/types";
import {
  BusinessImpactService,
  createBusinessImpactService,
  type IBusinessImpactService,
} from "@/services/business/BusinessImpactService";
import { ConversationService } from "@/services/conversation/ConversationService";
import { DashboardService } from "@/services/dashboard/DashboardService";

export type ServiceContainer = {
  aiService: IAIService;
  businessImpactService: IBusinessImpactService;
  conversationService: ConversationService;
  dashboardService: DashboardService;
};

let container: ServiceContainer | null = null;

/**
 * Simple composition root / DI container.
 * UI and route handlers should depend on these services, never on mock modules.
 */
export function createServiceContainer(
  overrides: Partial<ServiceContainer> = {},
): ServiceContainer {
  const aiService = overrides.aiService ?? createAIService();
  const businessImpactService =
    overrides.businessImpactService ?? createBusinessImpactService();
  const conversationService =
    overrides.conversationService ??
    new ConversationService(aiService, businessImpactService);
  const dashboardService =
    overrides.dashboardService ?? new DashboardService(conversationService);

  return {
    aiService,
    businessImpactService,
    conversationService,
    dashboardService,
  };
}

export function getServices(): ServiceContainer {
  if (!container) {
    container = createServiceContainer();
  }
  return container;
}

export function resetServices(): void {
  container = null;
}

export {
  AIService,
  BusinessImpactService,
  ConversationService,
  DashboardService,
};
