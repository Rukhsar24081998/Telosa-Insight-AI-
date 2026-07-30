"use client";

import { ArrowLeft, Gauge } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { analyzeConversationAction } from "@/app/conversation/actions";
import { AppLayout } from "@/components/layout";
import { BusinessPreviewPanel } from "@/components/conversation/business-preview-panel";
import { ConversationAIPanel } from "@/components/conversation/conversation-ai-panel";
import { ConversationSourcePanel } from "@/components/conversation/conversation-source-panel";
import { PageContainer, PageHeader } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types";

type ConversationDetailClientProps = {
  initialConversation: Conversation;
};

export function ConversationDetailClient({
  initialConversation,
}: ConversationDetailClientProps) {
  const [conversation, setConversation] = React.useState(initialConversation);
  const [error, setError] = React.useState<string | null>(null);
  const [analysisLatencyMs, setAnalysisLatencyMs] = React.useState<
    number | null
  >(null);
  const [isPending, startTransition] = React.useTransition();
  const analysisRegionRef = React.useRef<HTMLDivElement>(null);

  const analyze = () => {
    setError(null);
    const startedAt = performance.now();
    startTransition(async () => {
      const result = await analyzeConversationAction(conversation.id);
      if (!result.ok) {
        setError(result.error);
        setAnalysisLatencyMs(null);
        return;
      }

      setAnalysisLatencyMs(Math.round(performance.now() - startedAt));
      setConversation(result.conversation);
      window.requestAnimationFrame(() => analysisRegionRef.current?.focus());
    });
  };

  return (
    <AppLayout
      title="Conversation Intelligence"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Conversations", href: "/conversation" },
        { label: conversation.id },
      ]}
      insightPanel={
        <BusinessPreviewPanel impact={conversation.businessImpact} />
      }
    >
      <PageContainer>
        <PageHeader
          title={conversation.patient.name}
          description={`${conversation.conversationType} · ${conversation.clinic.name}, ${conversation.clinic.city}`}
          actions={
            <>
              <Link
                href="/conversation"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                <ArrowLeft className="size-3.5" aria-hidden />
                All conversations
              </Link>
              <Link
                href={`/business-impact/${conversation.id}`}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                )}
              >
                <Gauge className="size-3.5" aria-hidden />
                Business Impact
              </Link>
            </>
          }
        />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.3fr)]">
          <ConversationSourcePanel conversation={conversation} />
          <div
            ref={analysisRegionRef}
            tabIndex={-1}
            className="focus-visible:ring-telosa-blue/40 min-w-0 rounded-xl focus-visible:ring-2"
          >
            <ConversationAIPanel
              analysis={conversation.aiAnalysis}
              isAnalyzing={isPending}
              latencyMs={analysisLatencyMs}
              error={error}
              onAnalyze={analyze}
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {isPending
            ? "AI analysis is in progress."
            : error
              ? error
              : `Analysis ready. Intent is ${conversation.aiAnalysis.intent}. Business impact score is ${conversation.businessImpact.score}.`}
        </p>
      </PageContainer>
    </AppLayout>
  );
}
