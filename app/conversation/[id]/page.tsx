import { notFound } from "next/navigation";

import { ConversationDetailClient } from "@/components/conversation/conversation-detail-client";
import { getServices } from "@/services";

type ConversationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const { id } = await params;
  const conversation =
    await getServices().conversationService.getConversationById(id);

  if (!conversation) {
    notFound();
  }

  return <ConversationDetailClient initialConversation={conversation} />;
}
