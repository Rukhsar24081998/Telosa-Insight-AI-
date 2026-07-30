import { mockAnalyzeConversation } from "@/services/ai/mock-analyzer";
import type { IAIService } from "@/services/ai/types";
import type {
  AnalyzeConversationInput,
  AnalyzeConversationResult,
} from "@/types/domain";

export class MockAIService implements IAIService {
  async analyzeConversation(
    input: AnalyzeConversationInput | string,
  ): Promise<AnalyzeConversationResult> {
    return {
      ...mockAnalyzeConversation(input),
      source: "mock",
    };
  }
}
