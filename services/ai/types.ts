import type {
  AnalyzeConversationInput,
  AnalyzeConversationResult,
} from "@/types/domain";

export interface IAIService {
  analyzeConversation(
    input: AnalyzeConversationInput | string,
  ): Promise<AnalyzeConversationResult>;
}
