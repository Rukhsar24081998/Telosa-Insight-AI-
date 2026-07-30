import type {
  AnalyzeConversationInput,
  AnalyzeConversationResult,
  Intent,
  Sentiment,
} from "@/types/domain";

function normalizeInput(
  input: AnalyzeConversationInput | string,
): AnalyzeConversationInput {
  if (typeof input === "string") {
    return { text: input };
  }
  return input;
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function detectSpam(text: string): boolean {
  return includesAny(text, [
    "congratulations!!!",
    "click http",
    "free prize",
    "claim your prize",
    "totally-not-spam",
  ]);
}

function detectIntent(text: string): Intent {
  if (detectSpam(text)) return "Spam";
  if (includesAny(text, ["emergency", "swelling", "severe pain", "fever", "infection"])) {
    return "Emergency Concern";
  }
  if (includesAny(text, ["refund"])) return "Refund Request";
  if (includesAny(text, ["duplicate charge", "charged extra", "invoice shows"])) {
    return "Billing Dispute";
  }
  if (includesAny(text, ["invoice", "insurance", "billing", "consultation fee"])) {
    return "Billing Question";
  }
  if (includesAny(text, ["reschedule"])) return "Appointment Reschedule";
  if (includesAny(text, ["book", "appointment", "consultation", "same-week"])) {
    return "Appointment Booking";
  }
  if (
    includesAny(text, [
      "do you offer",
      "difference between",
      "sedation",
      "cost",
      "timeline",
    ])
  ) {
    return "Treatment Enquiry";
  }
  if (
    includesAny(text, [
      "excellent",
      "highly recommend",
      "five stars",
      "painless",
      "very professional",
    ])
  ) {
    return "Positive Feedback";
  }
  if (
    includesAny(text, [
      "still hurts",
      "after my",
      "follow-up",
      "is this normal",
      "should i be concerned",
    ])
  ) {
    return "Follow-up Issue";
  }
  if (
    includesAny(text, [
      "disappointed",
      "terrible",
      "rude",
      "refused",
      "will not recommend",
      "poor aftercare",
      "waited",
    ])
  ) {
    return "Complaint";
  }
  return "Other";
}

function detectSentiment(text: string, intent: Intent): Sentiment {
  if (intent === "Positive Feedback") return "Positive";
  if (intent === "Spam") return "Neutral";
  if (
    includesAny(text, [
      "extremely",
      "terrible",
      "severe",
      "will not recommend",
      "escalate",
      "ignored",
    ])
  ) {
    return "Strongly Negative";
  }
  if (
    includesAny(text, [
      "disappointed",
      "pain",
      "refund",
      "rude",
      "misled",
      "poor",
      "worse",
    ])
  ) {
    return "Negative";
  }
  if (
    includesAny(text, [
      "concerned",
      "should i",
      "is this normal",
      "clarify",
      "hurts",
      "fever",
    ])
  ) {
    return "Concerned";
  }
  return "Neutral";
}

function extractEntities(
  text: string,
  clinicName?: string,
): AnalyzeConversationResult["entities"] {
  const entities: AnalyzeConversationResult["entities"] = [];
  const patterns: Array<{ type: string; regex: RegExp }> = [
    { type: "treatment", regex: /implant|root canal|aligners?|invisalign|braces|filling|extraction|whitening|crown|scaling|bridge|sedation/gi },
    { type: "amount", regex: /₹\s?[\d,]+|\brs\.?\s?[\d,]+/gi },
    { type: "timeframe", regex: /\b\d+\s+days?\b|last friday|next week|today|weekend/gi },
    { type: "symptom", regex: /pain|swelling|fever|sensitivity|bleeding|bad taste/gi },
  ];

  for (const pattern of patterns) {
    const matches = text.match(pattern.regex) ?? [];
    for (const value of matches) {
      const normalized = value.trim();
      if (
        !entities.some(
          (entity) =>
            entity.type === pattern.type &&
            entity.value.toLowerCase() === normalized.toLowerCase(),
        )
      ) {
        entities.push({ type: pattern.type, value: normalized });
      }
    }
  }

  if (clinicName) {
    entities.push({ type: "clinic", value: clinicName });
  }

  return entities.slice(0, 8);
}

function buildSummary(
  intent: Intent,
  sentiment: Sentiment,
  text: string,
): string {
  const snippet = text.replace(/\s+/g, " ").trim().slice(0, 140);
  return `${intent} with ${sentiment.toLowerCase()} tone. Key message: ${snippet}${text.length > 140 ? "…" : ""}`;
}

function buildSuggestedReply(intent: Intent): string {
  switch (intent) {
    case "Emergency Concern":
      return "We understand this needs urgent attention. A clinician will contact you shortly and we can arrange same-day evaluation if required.";
    case "Refund Request":
      return "We apologize for the inconvenience. Your refund request has been logged and our finance team will confirm next steps within one business day.";
    case "Billing Dispute":
    case "Billing Question":
      return "Thank you for flagging this. Billing will review the invoice details and share a clear update shortly.";
    case "Appointment Booking":
    case "Appointment Reschedule":
      return "Happy to help with scheduling. Please share your preferred date and time window and we will confirm availability.";
    case "Treatment Enquiry":
      return "Thank you for your interest. We can arrange a consultation to review options, timeline, and estimated cost in detail.";
    case "Positive Feedback":
      return "Thank you for your kind feedback. We are delighted to hear about your experience and appreciate your recommendation.";
    case "Spam":
      return "No patient response required. Message classified as spam.";
    case "Follow-up Issue":
      return "Thank you for sharing this update. We recommend a short clinical review and can reserve a slot at your convenience.";
    case "Complaint":
      return "We are sorry for this experience. Our CX team is reviewing the details and will follow up to make this right.";
    default:
      return "Thank you for contacting Apollo Dental. A team member will review your message and respond shortly.";
  }
}

function confidenceFor(intent: Intent, text: string): number {
  if (intent === "Spam") return 99;
  if (text.length < 40) return 78;
  if (intent === "Other") return 72;
  return 88 + Math.min(10, Math.floor(text.length / 80));
}

/**
 * Deterministic mock analyzer used when USE_REAL_AI=false
 * or when Gemini is unavailable.
 */
export function mockAnalyzeConversation(
  input: AnalyzeConversationInput | string,
): AnalyzeConversationResult {
  const normalized = normalizeInput(input);
  const text = normalized.text.toLowerCase();
  const intent = detectIntent(text);
  const sentiment = detectSentiment(text, intent);
  const isSpam = intent === "Spam" || detectSpam(text);
  const isDuplicate =
    Boolean(normalized.conversationId === "CONV-022") ||
    (text.includes("implant") &&
      text.includes("three days") &&
      text.includes("pain"));

  return {
    intent,
    sentiment,
    entities: extractEntities(normalized.text, normalized.clinicName),
    summary: buildSummary(intent, sentiment, normalized.text),
    suggestedReply: buildSuggestedReply(intent),
    confidence: Math.min(99, confidenceFor(intent, normalized.text)),
    isDuplicate,
    isSpam,
    duplicateOfId: isDuplicate ? "CONV-001" : undefined,
  };
}
